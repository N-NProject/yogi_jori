import React from "react";

import Link from "next/link";
import Image from "next/image";

import thumbnail from "@/assets/mypage/thumbnail.svg";
import location from "@/assets/mypage/ion_location.svg";
import pencil from "@/assets/mypage/pencil.svg";
import PostPreview from "@/components/PostPreview";
import WebNavBar from "@/components/navweb";

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

const MyPage = () => {
  return (
    <main className="flex">
      <div className="container flex flex-col max-w-full min-h-screen  items-center bg-white">
        <div className="namecontainer flex   box-border w-[30rem] mt-[2rem] xl:w-[50rem]  xl:ml-[-15rem]  lg:w-[45rem] lg:ml-0  md:w-[40rem] md:ml-0 ">
          <Image src={thumbnail} alt="썸네일" />
          <div className="m-[2rem]">
            <div className="flex mb-[1rem] ">
              <h1 className="nickname text-[1.5rem] font-bold mr-[0.5rem]">
                {dummyData.name}
              </h1>
              <button>
                <Image src={pencil} alt="편집" />{" "}
              </button>
            </div>

            <Link
              className="flex items-center text-gray text-[1rem] "
              href="/location"
            >
              <Image src={location} alt="위치 아이콘" />
              <ins>위치 정보를 입력하세요.</ins>
            </Link>
          </div>
        </div>

        <div className="line  border-lightgray border-[0.01rem] mt-[1.5rem] mb-[1rem] w-[30rem] xl:w-[70rem] lg:w-[50rem] md:w-[40rem]  "></div>

        <div className=" flex  flex-col mx-[9rem] w-[30rem] h-full xl:w-[67.75rem] lg:w-[50rem] md:w-[40rem]">
          <h1 className=" mb-[2rem] text-[20px]">작성한 게시글</h1>
          <div className="write_post overflow-y-hidden">
            <div className="flex mb-3">
              <PostPreview></PostPreview>
              <PostPreview></PostPreview>
            </div>
            <div className="flex ">
              <PostPreview></PostPreview>
              <PostPreview></PostPreview>
            </div>
          </div>

          <h1 className=" mt-[2rem] mb-[2rem] text-[20px]  ">참여한 게시글</h1>
          <div className="write_post  flex flex-col justify-center   overflow-y-hidden">
            <div className="flex mb-3">
              <PostPreview></PostPreview>
              <PostPreview></PostPreview>
            </div>
            <div className="flex ">
              <PostPreview></PostPreview>
              <PostPreview></PostPreview>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyPage;
