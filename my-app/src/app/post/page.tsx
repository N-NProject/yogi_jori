"use client";

import { useState } from 'react';
import Image from "next/image";
import BackgroundImage from "@/assets/post/background.png";
import MegaphoneImage from "@/assets/post/megaphone.png";

const dummyData = {
  "user_id" : 1,
  "title": "하재민 생일 파티",
  "description": "내 최애 하재민의 2차 팬미팅에 초대합니다 ! 저번 티켓팅 실패 하시분을 위해 친히 한번 더 열어주신답니다! 역시 하느님..!",
  "date" : "04/22(월) 15:00",
  "currentPerson": 1,
  "maxPerson": 100,
  "status": "OPEN",
  "updatedAt" : "날짜형식",
}

const Post = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative w-full h-48">
        <Image 
          src={BackgroundImage}
          alt="Background Image"
          fill
          priority
        />
      </div>
      <div className=" rounded-t-[4rem] bg-white relative bottom-14 ">
        <div className="w-1/4 h-20 bg-lightpink flex items-center rounded-3xl px-6 ml-20 drop-shadow-md relative bottom-10 ">
          <Image
            src={MegaphoneImage}
            alt="Background Image"
            width={45}
            height={45}
            priority
          />
          <div className="w-full flex justify-center font-semibold text-xl mr-8 ">{dummyData.title}</div>
        </div>
        {/* 주석 */}
        <div className="flex flex-row justify-between h-[30rem] mx-20 mb-5 overflow-auto">
          <div className="mr-10 w-[35rem]">
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">모집</p>
              <p className="inline-block ml-3 text-lg">곽소정</p>
            </div>
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">날짜</p>
              <p className="inline-block ml-3 text-lg">{dummyData.date}</p>
            </div>
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">인원</p>
              <p className="inline-block ml-3 text-lg">{dummyData.currentPerson} / {dummyData.maxPerson}</p>
            </div>
            <div className="mb-5">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">장소</p>
              <p className="inline-block ml-3 text-lg">홍대입구역</p>
            </div>
            <hr  className="mb-5 border-lightgray" />
            <div className="mb-2">
              <p className="w-fit px-3 py-1 mb-2 rounded-2xl font-semibold border-solid border-2 border-pink">상세내용</p>
              <p className="ml-3 text-lg">{dummyData.description}</p>
            </div>
          </div>
          <div className="w-[35rem]">
            <p className="w-fit px-3 py-1 mb-2 rounded-2xl font-semibold border-solid border-2 border-pink">위치</p>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-24">
          <button className="h-fit bg-darkpink text-lg font-semibold text-white rounded-lg py-2 px-20 cursor-pointer">지금 당장 참여하기 ({dummyData.currentPerson}/{dummyData.maxPerson})</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
