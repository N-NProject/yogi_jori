"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import api from "@/utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CloseOnIcon from "@/assets/post/closeOn.svg";
import CloseOffIcon from "@/assets/post/closeOff.svg";
import Image from "next/image";
import EditModalBoxProps from "@/types/EditModalBoxProps";
import { requestPostData } from "@/types/write";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface Place {
  place_name: string;
  address_name: string;
  x: number; // 경도
  y: number; // 위도
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // 추가 속성 허용
}

const EditModalBox = ({ postData, clickModal }: EditModalBoxProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(postData.date),
  );
  const [view, setView] = useState(false);
  const [person, setPerson] = useState<number>(postData.maxCapacity);
  const [category, setCategory] = useState<string>(postData.category);
  const personItems = Array.from({ length: 14 }, (_, index) => index + 2);
  const [lat, setLat] = useState<number>(postData.location?.latitude);
  const [lng, setLng] = useState<number>(postData.location?.longitude);
  const [isHovered, setIsHovered] = useState(false);
  const [keyword, setKeyword] = useState<string>(
    postData.location?.locationName,
  );
  const [selectedFromDropdown, setSelectedFromDropdown] =
    useState<boolean>(true);
  const debouncedKeyword = useDebounce(keyword, 300);

  const mutation = useMutation({
    mutationFn: async (editedPost: requestPostData) => {
      const res = await api.patch(`/api/v1/boards/${postData.id}`, editedPost, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    },
    onSuccess: () => {
      clickModal();
      location.reload();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: error => {
      console.log(error.message);
    },
  });

  const editPost = () => {
    const title = document.getElementById("title") as HTMLInputElement | null;
    const description = document.getElementById(
      "description",
    ) as HTMLTextAreaElement | null;
    const locationName = document.getElementById(
      "location",
    ) as HTMLInputElement | null;
    const startTime = document.getElementById(
      "startTime",
    ) as HTMLInputElement | null;

    if (
      !title?.value ||
      !person ||
      !category ||
      !locationName?.value ||
      !selectedDate ||
      !startTime?.value ||
      !description?.value
    ) {
      alert("모든 항목을 입력 또는 선택해주셔야 합니다!");
    } else {
      const request = {
        title: title.value,
        category: category,
        description: description.value,
        location: {
          latitude: lat,
          longitude: lng,
        },
        locationName: locationName.value,
        maxCapacity: person,
        date: `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1 < 10 ? "0" : ""
        }${selectedDate.getMonth() + 1}-${
          selectedDate.getDate() < 10 ? "0" : ""
        }${selectedDate.getDate()}`,
        startTime: startTime.value,
      };

      mutation.mutate(request);
    }
  };

  function removeAllResultItems(parent: HTMLElement, child: string) {
    if (parent) {
      const resultItems = parent.getElementsByClassName(child);
      while (resultItems.length > 0) {
        resultItems[0].remove();
      }
    }
  }

  useEffect(() => {
    const personList = document.getElementById("personList");
    const personListItems = document.getElementsByClassName("person-item");

    if (view) {
      personList?.classList.remove("hidden");
      Array.from(personListItems).forEach((item: Element) => {
        item.classList.remove("hidden");
      });
    }
    if (!view) {
      personList?.classList.add("hidden");
      Array.from(personListItems).forEach((item: Element) => {
        item.classList.add("hidden");
      });
    }
  }, [view]);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.type = "text/javascript";
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4b5f228cb3b8bf6903521cc0f6f67769&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const ps = new window.kakao.maps.services.Places();
        const resultList = document.getElementById(
          "result-list",
        ) as HTMLElement;

        if (debouncedKeyword.trim() && !selectedFromDropdown) {
          ps.keywordSearch(
            debouncedKeyword,
            function (data: Place[], status: string) {
              resultList.classList.add(
                "h-[18rem]",
                "bg-white",
                "border",
                "border-[1px]",
                "rounded-[3px]",
                "border-zinc-300",
              );

              if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data);
              } else {
                resultList.innerHTML =
                  '<div class="result-item mt-2">검색 결과가 없습니다.</div>';
              }
            },
          );
        } else {
          resultList.innerHTML = "";
          resultList.classList.remove(
            "h-[18rem]",
            "bg-white",
            "border",
            "border-[1px]",
            "rounded-[3px]",
            "border-zinc-300",
          );
        }
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    function displayPlaces(places: Place[]) {
      const resultList = document.getElementById("result-list") as HTMLElement;

      resultList.innerHTML = "";

      places.forEach(function (place: Place) {
        const listItem = document.createElement("div");
        listItem.className =
          "result-item h-16 bg-white flex flex-col justify-center";

        const placeName = document.createElement("p");
        placeName.innerText = place.place_name;
        placeName.className = "font-semibold";

        const placeAddress = document.createElement("p");
        placeAddress.innerText = place.address_name;
        placeAddress.className = "text-zinc-500 text-sm";

        listItem.appendChild(placeName);
        listItem.appendChild(placeAddress);

        listItem.onclick = function () {
          resultList.classList.add("hidden");
          setSelectedFromDropdown(true);
          setKeyword(place.place_name);
          setLng(place.x);
          setLat(place.y);

          removeAllResultItems(resultList, "result-item");
        };

        resultList.appendChild(listItem);
      });

      resultList.classList.remove("hidden");
    }

    return () => kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
  }, [debouncedKeyword]);

  return (
    <div
      className="flex justify-center items-center w-full h-full bg-neutral-500/50 fixed top-0 left-0"
      onClick={clickModal}
    >
      <div
        className="flex flex-col relative md:w-[33rem] w-[23rem] h-[40rem] items-center justify-center bg-white rounded-[10px] px-8 py-6"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div
          className="flex absolute top-3 right-4 cursor-pointer"
          onClick={clickModal}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={isHovered ? CloseOnIcon : CloseOffIcon}
            alt="Close Off Icon"
            width={35}
            height={40}
            priority
          />
        </div>
        <h1 className="text-darkpink font-semibold text-2xl pt-5">수정하기</h1>
        <div className="flex flex-col items-center md:w-[30rem] w-[20rem] space-y-4 my-5">
          <input
            type="text"
            id="title"
            placeholder="제목을 입력해주세요."
            defaultValue={postData.title}
            className="placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm"
          />
          <div className="flex md:flex-row flex-col justify-between w-full relative">
            <DatePicker
              dateFormat="yyyy / MM / dd"
              shouldCloseOnSelect
              minDate={new Date()}
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              placeholderText="날짜를 선택해주세요."
              className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] z-30 h-11 w-full px-4 py-2.5 font-semibold text-sm"
              calendarClassName="bg-pink"
              withPortal
            />
            <div className="flex md:flex-row justify-between md:mt-0 mt-4">
              <input
                type="time"
                id="startTime"
                defaultValue={postData.startTime ?? ""}
                className="placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 md:w-36 w-2/3 md:absolute right-[7rem] px-4 py-2.5 font-semibold text-sm text-zinc-500 cursor-pointer"
              />
              <div className="relative">
                <div
                  className={`bg-white absolute border-solid rounded-[3px] h-50 right-0 max-w-[10rem] cursor-pointer w-24 px-4 py-2.5 font-semibold text-sm text-zinc-500
                  ${
                    view
                      ? "border-darkpink border-[2px]"
                      : "border-pink border-[1.5px]"
                  }`}
                  onClick={() => {
                    setView((prev: boolean) => !prev);
                  }}
                >
                  {person === undefined ? "인원 선택" : `${person}명`}
                </div>
                <div
                  id="personList"
                  className="hidden absolute top-full z-20 overflow-auto h-56 bg-white border border-[1.5px] border-pink border-solid rounded-[3px] right-0 max-w-[10rem] w-24"
                >
                  <>
                    {personItems.map((item: number, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          setView((prev: boolean) => !prev);
                          setPerson(item);
                        }}
                        className="person-item hidden hover:text-darkpink cursor-pointer w-full flex bg-white h-9 items-center justify-center py-2.5 font-semibold text-sm text-zinc-500"
                      >
                        {item}
                      </div>
                    ))}
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div
              className={
                "border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" +
                (category === "보드게임" ? " bg-pink " : " bg-white")
              }
              onClick={() => setCategory("보드게임")}
            >
              보드게임
            </div>
            <div
              className={
                "border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" +
                (category === "카공" ? " bg-pink" : " bg-white")
              }
              onClick={() => setCategory("카공")}
            >
              카공
            </div>
            <div
              className={
                "border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" +
                (category === "커피챗" ? " bg-pink" : " bg-white")
              }
              onClick={() => setCategory("커피챗")}
            >
              커피챗
            </div>
            <div
              className={
                "border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" +
                (category === "기타" ? " bg-pink" : " bg-white")
              }
              onClick={() => setCategory("기타")}
            >
              기타
            </div>
          </div>
          <div className="relative md:w-[30rem] w-[22rem]">
            <input
              type="text"
              name="location"
              id="location"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setKeyword(e.target.value);
                setSelectedFromDropdown(false);
              }}
              placeholder="만날 장소를 입력해주세요."
              defaultValue={postData.location.locationName ?? ""}
              className="placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] z-10 h-11 w-full px-4 py-2.5 font-semibold text-sm"
            />
            <div
              id="result-list"
              className="hidden h-[18rem] bg-white border border-[1px] rounded-[3px] border-zinc-300 absolute top-full z-[100] w-full px-4 overflow-auto"
            ></div>
          </div>
          <textarea
            id="description"
            placeholder="상세 내용을 입력해주세요."
            defaultValue={postData.description ?? ""}
            rows={12}
            className="placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-70 w-full px-4 py-2.5 font-semibold text-sm"
          ></textarea>
        </div>
        <button
          className="md:w-[30rem] w-[22rem] h-fit bg-darkpink text-md font-semibold text-white rounded-lg py-2 px-20 cursor-pointer"
          onClick={editPost}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default EditModalBox;
