"use client";

import PostPreview from "@/components/PostPreview";
import MainTab from "@/components/MainTab";
import { useState, useEffect } from "react";
import { getBoards } from "@/utils/api";
import { Board } from "@/types/boards";
import { useQuery } from "@tanstack/react-query";

const Boards = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState<{
    OPEN: boolean;
    CLOSE: boolean;
  }>({
    OPEN: false,
    CLOSE: false,
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
    refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
    retry: 1, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
  });

  useEffect(() => {
    console.log("Loading:", isLoading);
    console.log("Data:", posts);
  }, [isLoading, posts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleStatusChange = (status: "OPEN" | "CLOSE") => {
    setSelectedStatus(prevStatus => ({
      ...prevStatus,
      [status]: !prevStatus[status],
    }));
  };

  // 필터링된 데이터
  const filteredData = posts.filter((data: Board) => {
    const categoryMatch =
      selectedCategory === "전체" || data.category === selectedCategory;
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
      <div className="flex justify-center">
        {isLoading ? (
          <p>Loading...</p> // 로딩 중 메시지
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-8 py-[1.5rem]">
            {filteredData.map((data: Board) => (
              <PostPreview
                key={data.id}
                boardId={data.id}
                title={data.title}
                tag={[data.category]}
                date={data.date}
                time={data.startTime}
                maxCapacity={data.maxCapacity}
                locationName={data.location.locationName}
                status={data.status}
                currentPerson={data.currentPerson} // currentPerson 추가
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Boards;