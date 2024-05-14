import Link from "next/link";
import Image from "next/image";

import title from "@/assets/nav/title.svg";
import main from "@/assets/nav/main.svg";
import main_hover from "@/assets/nav/main_hover.svg";
import chat from "@/assets/nav/chat.svg";
import alarm from "@/assets/nav/alarm.svg";
import write from "@/assets/nav/write.svg";
import mypage from "@/assets/nav/mypage.svg";

const navBarWeb = () => {
  return (
    <div className="bg-white w-20 h-screen flex flex-col items-center border-solid border-r border-lightgray">
      <Image className="bg-white w-20 h-30" src={title} alt="title" />

      <div className="h-[100rem] mt-[1rem] flex flex-col justify-around">
        <Link href="/">
          <Image src={main ? main_hover : main} alt="메인게시판" />
        </Link>
        <Link href="/chat">
          <Image className="" src={chat} alt="채팅" />
        </Link>
        <Link href="/alarm">
          <Image src={alarm} alt="알람" />
        </Link>
      </div>

      <div className="h-96 mt-80 flex flex-col justify-around items-center mb-[4rem]">
        <Link className="mb-[2rem]" href="/write">
          <Image src={write} alt="작성" />
        </Link>
        <Link href="/mypage">
          <Image src={mypage} alt="마이 페이지" />
        </Link>
      </div>
    </div>
  );
};

export default navBarWeb;
