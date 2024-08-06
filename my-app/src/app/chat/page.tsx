"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import io from "socket.io-client";
import icons_chat from "@/assets/chat/icons_chat.svg";
import back from "@/assets/chat/icons_back.svg";
import PostPreview from "@/components/PostPreview";

const fetchChatRooms = async ({ queryKey }) => {
  const [_key, { afterCursor, beforeCursor }] = queryKey;
  const response = await axios.get(
    "http://localhost:8000/api/v1/users/chatrooms",
    {
      params: {
        afterCursor,
        beforeCursor,
      },
      withCredentials: true,
    },
  );

  return response.data;
};

const fetchChatRoomDetails = async (chatRoomId: number) => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/chatrooms/${chatRoomId}`,
    {
      withCredentials: true,
    },
  );
  console.log("Fetched chat room details:", response.data); // 콘솔 로그 추가
  return response.data;
};

const sendMessage = async ({ chatRoomId, content }) => {
  const response = await axios.post(
    `http://localhost:8000/api/v1/chatrooms/${chatRoomId}/messages`,
    { content },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

const leaveChatRoom = async (chatRoomId: number) => {
  const response = await axios.delete(
    `http://localhost:8000/api/v1/chatrooms/${chatRoomId}/leave`,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

const Chat = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState<number | null>(null);
  const [pastMessages, setPastMessages] = useState<{ [key: number]: any[] }>(
    {},
  );
  const [newMessages, setNewMessages] = useState<{ [key: number]: any[] }>({});
  const [newMessage, setNewMessage] = useState<string>("");
  const [currentUserNickname, setCurrentUserNickname] =
    useState<string>("지윤");
  const socketRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const {
    data: chatRoomsData = { chatRooms: [], cursor: {} },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chatRooms", { afterCursor: null, beforeCursor: null }],
    queryFn: fetchChatRooms,
  });

  const { data: chatRoomDetailsData } = useQuery({
    queryKey: ["chatRoomDetails", selectedChatRoom],
    queryFn: () => fetchChatRoomDetails(selectedChatRoom!),
    enabled: !!selectedChatRoom,
  });

  const mutation = useMutation({
    mutationFn: sendMessage,
  });

  const leaveMutation = useMutation({
    mutationFn: leaveChatRoom,
    onSuccess: () => {
      console.log(`Left chat room ${selectedChatRoom}`);
      setSelectedChatRoom(null);
      queryClient.invalidateQueries("chatRooms");
    },
  });

  useEffect(() => {
    if (chatRoomDetailsData) {
      console.log("Fetched chat room details:", chatRoomDetailsData);
      setPastMessages(prev => ({
        ...prev,
        [selectedChatRoom!]: chatRoomDetailsData.messages || [],
      }));
    }
  }, [chatRoomDetailsData, selectedChatRoom]);

  useEffect(() => {
    console.log("Updated pastMessages:", pastMessages);
  }, [pastMessages]);

  useEffect(() => {
    socketRef.current = io("http://localhost:8000");

    socketRef.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socketRef.current.on("broadcastMessage", message => {
      console.log("Received broadcastMessage:", message);
      setNewMessages(prevMessages => ({
        ...prevMessages,
        [message.chatRoomId]: [
          ...(prevMessages[message.chatRoomId] || []),
          message,
        ],
      }));
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (selectedChatRoom && newMessage.trim() !== "") {
      mutation.mutate({ chatRoomId: selectedChatRoom, content: newMessage });
      setNewMessage("");
    } else {
      console.error("Message is empty or chat room is not selected");
    }
  };

  const handleLeaveChatRoom = () => {
    if (selectedChatRoom) {
      leaveMutation.mutate(selectedChatRoom);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching chat rooms</p>;

  const selectedChatRoomTitle = chatRoomsData.chatRooms.find(
    room => room.board.boardId === selectedChatRoom,
  )?.board.title;

  return (
    <div className="flex">
      <main className="chat flex w-[100%] min-h-screen">
        <div className="chat_list flex flex-col my-[1rem] bg-white xl:border-r xl:w-[50rem] lg:w-[40rem] lg:border-r md:w-[30rem] md:border-r w-0">
          <div className="flex justify-between h-[4rem] mx-[1rem] mb-[1rem]">
            <div className="flex items-center">
              <Image src={icons_chat} alt="채팅 아이콘" />
              <h1 className="text-[1.5rem] font-semibold ml-[0.5rem]">CHAT</h1>
            </div>
          </div>

          <ul className="px-[1rem] mx-[1em]">
            {chatRoomsData.chatRooms.map((chatRoom: any) => (
              <li key={chatRoom.board.boardId} className="mb-4">
                <PostPreview
                  key={chatRoom.board.boardId}
                  board_id={chatRoom.board.boardId}
                  title={chatRoom.board.title}
                  tag={[chatRoom.board.category]}
                  date={chatRoom.board.date}
                  time={chatRoom.board.start_time}
                  currentPerson={chatRoom.board.member_count}
                  maxCapacity={chatRoom.board.max_capacity}
                  location="채팅방 위치 없음"
                  onClick={() => {
                    console.log(
                      "Selected chat room ID:",
                      chatRoom.board.boardId,
                    );
                    setSelectedChatRoom(chatRoom.board.boardId);
                    queryClient.invalidateQueries([
                      "chatRoomDetails",
                      chatRoom.board.boardId,
                    ]);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="chat_room w-full min-h-screen flex flex-col">
          {selectedChatRoom ? (
            <>
              <div className="flex justify-between h-[4rem] m-[1rem] px-[1rem]">
                <div className="flex items-center">
                  <Image src={icons_chat} alt="채팅 아이콘" />
                  <h1 className="text-[1.5rem] font-semibold ml-[0.5rem]">
                    {selectedChatRoomTitle || "채팅방을 선택하세요"}
                  </h1>
                </div>
                <button onClick={handleLeaveChatRoom}>
                  <Image src={back} alt="뒤로" />
                </button>
              </div>
              <div className="flex-grow p-4 overflow-auto">
                {selectedChatRoom &&
                  (pastMessages[selectedChatRoom] || []).map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 flex ${
                        msg.nickname === currentUserNickname
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          msg.nickname === currentUserNickname
                            ? "bg-blue-500 text-white"
                            : "bg-lightgray text-black"
                        }`}
                      >
                        <strong>{msg.nickname || "익명"} : </strong>
                        <span>{msg.content}</span>
                      </div>
                    </div>
                  ))}
                {selectedChatRoom &&
                  (newMessages[selectedChatRoom] || []).map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 flex ${
                        msg.nickname === currentUserNickname
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          msg.nickname === currentUserNickname
                            ? "bg-blue-500 text-white"
                            : "bg-lightgray text-black"
                        }`}
                      >
                        <strong>{msg.nickname} : </strong>
                        <span>{msg.message}</span>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="input_container flex items-center justify-center px-[2rem] py-[1rem]">
                <input
                  type="text"
                  className="h-[3rem] mr-[1rem] border border-gray-300 rounded-lg px-4 w-full"
                  placeholder="메시지를 입력하세요..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  className="w-[3.5rem] h-[3rem] bg-zinc-200 border border-gray-300 rounded-lg"
                  onClick={handleSendMessage}
                >
                  전송
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <h1 className="text-[1.5rem] font-semibold">
                채팅방을 선택하세요
              </h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;
