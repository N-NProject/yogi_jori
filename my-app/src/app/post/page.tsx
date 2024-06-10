"use client";

import { useEffect, useState } from "react";
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
  "location": {
    "latitude": 37.557434302,
    "longitude": 126.926960224
  },
  "location_name": "홍대입구역"
};

declare global {
  interface Window {
    kakao: any;
  }
};

const Post = () => {
  const [locationAddress, setLocationAddress] = useState<String>("");

  useEffect(() => {
    // 카카오맵 api를 사용하기 위해 Head 부분에 script 태그 추가하기
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4b5f228cb3b8bf6903521cc0f6f67769&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);
  
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(dummyData.location.latitude, dummyData.location.longitude); // 지도에 표시할 위치

        // 이미지 지도에 표시할 마커입니다
        // 이미지 지도에 표시할 마커는 Object 형태입니다
        const marker = {
          position: position
        };

        // 이미지 지도를 표시할 div
        const staticMapContainer  = document.getElementById('staticMap'),  
          staticMapOption = { 
              center: position, // 이미지 지도의 중심좌표
              level: 3, // 이미지 지도의 확대 레벨
              marker: marker
          };

        // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
        const staticMap = new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
        
        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(dummyData.location.longitude, dummyData.location.latitude, function(result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            setLocationAddress(result[0].address.address_name);
          }
      });
      });
    };
  
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  return (
    <div className="flex h-full max-w-full flex-col">
      <div className="relative w-full h-48">
        <Image src={BackgroundImage} alt="Background Image" fill priority />
      </div>
      <div className="place-items-center rounded-t-[4rem] bg-white relative bottom-14 ">
        <div className="md:flex-none flex md:justify-normal justify-center md:items-start items-center">
          <div className="w-80 h-20 bg-lightpink flex items-center rounded-3xl px-6 md:ml-20 drop-shadow-md relative bottom-10 ">
            <Image
              src={MegaphoneImage}
              alt="Background Image"
              width={45}
              height={45}
              priority
            />
            <div className="w-full flex justify-center font-semibold text-xl mr-8 ">
              {dummyData.title}
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between md:h-[30rem] h-[25rem] md:mx-20 mx-10 mb-5 overflow-auto">
          <div className="md:mr-10 md:w-[35rem]">
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">
                모집
              </p>
              <p className="inline-block ml-3 text-lg">곽소정</p>
            </div>
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">
                날짜
              </p>
              <p className="inline-block ml-3 text-lg">{dummyData.date}</p>
            </div>
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">
                인원
              </p>
              <p className="inline-block ml-3 text-lg">
                {dummyData.currentPerson} / {dummyData.maxPerson}
              </p>
            </div>
            <div className="mb-5">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">장소</p>
              <p className="inline-block ml-3 text-lg">{dummyData.location_name}</p>
            </div>
            <hr  className="mb-5 border-lightgray" />
            <div className="md:mb-2 mb-10">
              <p className="w-fit px-3 py-1 mb-2 rounded-2xl font-semibold border-solid border-2 border-pink">상세내용</p>
              <p className="ml-3 text-lg">{dummyData.description}</p>
            </div>
          </div>
          <div className="md:w-[35rem]">
            <p className="w-fit px-3 py-1 inline-block mb-2 rounded-2xl font-semibold border-solid border-2 border-pink">위치</p>
            <p className="inline-block ml-3 text-lg">{locationAddress}</p>
            <div id="staticMap" className="2xl:h-[25rem] xl:h-[23rem] l:h-[21rem] md:h-[19rem] sm:h-[17rem] h-[15rem]"></div>
        
          </div>
        </div>
        <div className="flex items-center justify-center md:min-h-24 min-h-12">
          <button className="h-fit bg-darkpink text-lg font-semibold text-white rounded-lg py-2 px-20 cursor-pointer">지금 당장 참여하기 ({dummyData.currentPerson}/{dummyData.maxPerson})</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
