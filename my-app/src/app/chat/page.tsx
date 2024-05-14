import React from "react";
import Image from "next/image";
import Link from "next/link";

import icons_chat from "@/assets/chat/icons_chat.svg";
import close from "@/assets/chat/close.svg";
import back from "@/assets/chat/icons_back.svg";
import sample from "@/assets/chat/sample.svg";


const dummyData = {
  user_id: 1,
  name: "하재민",
  title: "하재민 생일 파티",
  description:
    "내 최애 하재민의 2차 팬미팅에 초대합니다 ! 저번 티켓팅 실패 하시분을 위해 친히 한번 더 열어주신답니다! 역시 하느님..!",
  date: "04/22(월) 15:00",
  currentPerson: 1,
  maxPerson: 100,
  status: "OPEN",
  updatedAt: "날짜형식",
};

const Chat = () => {
  return (
    <div className="flex ">
      <main className="chat flex w-[90rem] min-h-screen ">
        <div className="chat_list flex flex-col w-[50rem] my-[1rem] bg-white border-r">
          <div className="flex justify-between h-[4rem] mx-[1rem] mb-[1rem] ">
            <div className="flex items-center">
              <Image src={icons_chat} alt="채팅 아이콘"></Image>
              <h1 className="text-[1.5rem] font-semibold ml-[0.5rem]">CHAT</h1>
            </div>

            <button>
              <Image src={close} alt="접기"></Image>
            </button>
          </div>

          <ul className="px-[1rem]">
            <li>
              <Image className="mb-[1rem]" src={sample} alt="1" />
            </li>
            <li>
              <Image className="]" src={sample} alt="1" />
            </li>
          </ul>
        </div>

        <div className="chat_room w-full min-h-screen flex flex-col bg-white  ">
          <div className="flex justify-between h-[4rem] m-[1rem] px-[1rem] ">
            <div className="flex items-center">
              <Image src={icons_chat} alt="채팅 아이콘"></Image>
              <h1 className="text-[1.5rem] font-semibold ml-[0.5rem]">
                {dummyData.title}
              </h1>
            </div>
            <button>
              <Image src={back} alt="접기"></Image>
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
