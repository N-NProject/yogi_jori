import React from "react";

import Link from "next/link";
import Image from "next/image";

import thumbnail from "@/assets/mypage/thumbnail.svg";
import location from "@/assets/mypage/ion_location.svg";
import pencil from "@/assets/mypage/pencil.svg";
import PostPreview from "@/components/PostPreview";
import WebNavBar from "@/components/navweb";

const dummyData = {
  name: "곽소정",
  board_id: 1,
  user_id: 1,
  title: "커피챗",
  tag: ["커피챗"],
  date: "2023-08-17",
  time: "18:00",
  currentPerson: 22,
  maxPerson: 100,
  status: "OPEN",
  location_name: "홍대입구역",
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
              <PostPreview
                key={dummyData.board_id}
                board_id={dummyData.board_id}
                title={dummyData.title}
                tag={dummyData.tag}
                date={dummyData.date}
                time={dummyData.time}
                currentPerson={dummyData.currentPerson}
                maxPerson={dummyData.maxPerson}
                location={dummyData.location_name}
              />
            </div>
            <div className="flex ">
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
            </div>
          </div>

          <h1 className=" mt-[2rem] mb-[2rem] text-[20px]  ">참여한 게시글</h1>
          <div className="write_post  flex flex-col justify-center   overflow-y-hidden">
            <div className="flex mb-3">
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
            </div>
            <div className="flex ">
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyPage;
