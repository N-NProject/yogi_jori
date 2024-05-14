import React from "react";

import Link from "next/link";
import Image from "next/image";

import thumbnail from "@/assets/mypage/thumbnail.svg";
import location from "@/assets/mypage/ion_location.svg";
import pencil from "@/assets/mypage/pencil.svg";
import PostPreview from "@/components/PostPreview";

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
        <div className="namecontainer flex mt-[2rem] ml-[-15rem] w-[50rem]  box-border">
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

        <div className="line w-[70rem] border-[0.01rem] border-lightgray mt-[1.5rem] mb-[1rem] "></div>

        <div className=" mx-[9rem] flex  flex-col w-[67.75rem]">
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

          <div className="enter_post text-[20px] w-[67.75rem]">
            <h1 className="mt-[2rem] mb-[2rem] text-[20px]  ">참여한 게시글</h1>
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
      </div>
    </main>
  );
};

export default MyPage;
