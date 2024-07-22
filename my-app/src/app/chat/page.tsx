"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import icons_chat from "@/assets/chat/icons_chat.svg";
import close from "@/assets/chat/close.svg";
import back from "@/assets/chat/icons_back.svg";
import sample from "@/assets/chat/sample.svg";

import PostPreview from "@/components/PostPreview";

const dummyData = {
  board_id: 1,
  user_id: 1,
  title: "커피챗",
  tag: ["커피챗"],
  date: "2023-08-17",
  time: "18:00",
  currentPerson: 22,
  maxPerson: 100,
  location: "경기도 시흥시",
};

const Chat = () => {
  return (
    <div className="flex ">
      <main className="chat flex w-[100%] min-h-screen  ">
        <div className="chat_list flex flex-col  my-[1rem] bg-white xl:border-r  xl:w-[50rem] lg:w-[40rem] lg:border-r md:w-[30rem] md:border-r w-0">
          <div className="flex justify-between h-[4rem] mx-[1rem] mb-[1rem] ">

            
            <div className="flex items-center">
              <Image src={icons_chat} alt="채팅 아이콘"></Image>
              <h1 className="text-[1.5rem] font-semibold ml-[0.5rem]">CHAT</h1>
            </div>

            <button>
              <Image src={close} alt="접기"></Image>
            </button>
          </div>

          <ul className="px-[1rem] mx-[1em] ">
            <PostPreview
              key={dummyData.board_id}
              board_id={dummyData.board_id}
              title={dummyData.title}
              tag={dummyData.tag}
              date={dummyData.date}
              time={dummyData.time}
              currentPerson={dummyData.currentPerson}
              maxPerson={dummyData.maxPerson}
              location={dummyData.location}
            />
   
          </ul>
        </div>

        <div className="chat_room w-full min-h-screen flex flex-col">
          <div className="flex justify-between h-[4rem] m-[1rem] px-[1rem] ">
            <div className="flex items-center">
              <Image src={icons_chat} alt="채팅 아이콘"></Image>
              <h1 className="text-[1.5rem] font-semibold ml-[0.5rem]">
                {dummyData.title}
              </h1>
            </div>
            <button>
              <Image src={back} alt="뒤로"></Image>
            </button>
          </div>
          <div className="flex-grow p-4"></div>
          <div className="input_container flex items-center justify-center  px-[2rem] py-[1rem]">
            <input
              type="text"
              className="  h-[3rem] mr-[1rem] border border-gray-300 rounded-lg px-4 w-full"
              placeholder="메시지를 입력하세요..."
            />
            <button className="w-[3.5rem] h-[3rem] bg-zinc-200 border border-gray-300  rounded-lg"></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
