import React from "react";
import Image from "next/image";
import Link from "next/link";

import Nav from "../components/NavWeb";

const chat = () => {
  return (
    <div className="flex ">
      <Nav />
      <main className="chat w-[90rem] h-[60.25rem]">
        <div className="chat_list flex flex-row bg-white border-solid border-2 border-black ">
          <ul>
            <li>
              <Link href="/chat">채팅방1</Link>
            </li>
            <li>
              <Link href="/chat">채팅방2</Link>
            </li>
            <li>
              <Link href="/chat">채팅방3</Link>
            </li>
          </ul>
        </div>
        <div className="chat_room"></div>
      </main>
    </div>
  );
};

export default chat;
