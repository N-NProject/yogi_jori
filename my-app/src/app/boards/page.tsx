"use client";

import PostPreview from "@/components/PostPreview";
import MainTab from "@/components/MainTab";
import { useState } from "react";

const dummyData = [
  {
    board_id: 1,
    user_id: 1,
    title: "커피챗",
    tag: ["커피챗"],
    date: "2023-08-17",
    time: "18:00",
    currentPerson: 22,
    maxPerson: 100,
    status: "OPEN",
    location: "경기도 시흥시",
  },
  {
    board_id: 2,
    user_id: 1,
    title: "친선 야구 경기",
    tag: ["카공"],
    date: "2023-04-17",
    time: "18:00",
    currentPerson: 22,
    maxPerson: 30,
    status: "CLOSE",
    location: "서울특별시",
  },
  {
    board_id: 3,
    user_id: 1,
    title: "하재민 생일파티",
    tag: ["기타"],
    date: "2023-08-17",
    time: "18:00",
    currentPerson: 599,
    maxPerson: 600,
    status: "OPEN",
    location: "경기도 시흥시",
  },
  {
    board_id: 4,
    user_id: 1,
    title: "next.js 스터디",
    tag: ["카공"],
    date: "2023-08-17",
    time: "18:00",
    currentPerson: 6,
    maxPerson: 10,
    status: "OPEN",
    location: "경기도 시흥시",
  },
];

const Boards = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState<{
    OPEN: boolean;
    CLOSE: boolean;
  }>({
    OPEN: false,
    CLOSE: false,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleStatusChange = (status: "OPEN" | "CLOSE") => {
    setSelectedStatus(prevStatus => ({
      ...prevStatus,
      [status]: !prevStatus[status],
    }));
  };

  const filteredData = dummyData.filter(data => {
    const categoryMatch =
      selectedCategory === "전체" || data.tag[0] === selectedCategory;
    const statusMatch =
      (selectedStatus.OPEN && data.status === "OPEN") ||
      (selectedStatus.CLOSE && data.status === "CLOSE") ||
      (!selectedStatus.OPEN && !selectedStatus.CLOSE);
    return categoryMatch && statusMatch;
  });

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex justify-center lg:justify-start lg:pl-[4rem] xl:pl-[6rem] py-4 md:py-7">
        <MainTab onCategoryChange={handleCategoryChange} />
      </div>
      <div className="flex justify-center lg:justify-start gap-[0.75rem] lg:gap-[1.25rem] px-[2rem] lg:px-[6rem] xl:px-[8rem]">
        <button
          onClick={() => handleStatusChange("OPEN")}
          className={`w-[5rem] lg:w-[6.25rem] h-[2rem] lg:h-[2.25rem] border border-1 rounded-[1.25rem] ${
            selectedStatus.OPEN ? "border-darkpink bg-pink" : "border-gray"
          }`}
        >
          <span className="text-xs">모집 중</span>
        </button>
        <button
          onClick={() => handleStatusChange("CLOSE")}
          className={`w-[5rem] lg:w-[6.25rem] h-[2rem] lg:h-[2.25rem] border border-1 rounded-[1.25rem] ${
            selectedStatus.CLOSE ? "border-darkpink bg-pink" : "border-gray"
          }`}
        >
          <span className="text-xs">모집 종료</span>
        </button>
      </div>
      <div className="flex justify-center ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8 py-[1.5rem]">
          {filteredData.map(data => (
            <PostPreview
              key={data.board_id}
              board_id={data.board_id}
              title={data.title}
              tag={data.tag}
              date={data.date}
              time={data.time}
              currentPerson={data.currentPerson}
              maxPerson={data.maxPerson}
              location={data.location}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Boards;
