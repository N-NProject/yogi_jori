"use client";

import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import BackgroundImage from "@/assets/post/background.png";
import MegaphoneImage from "@/assets/post/megaphone.png";
import token from "@/constants/loginToken";

declare global {
  interface Window {
    kakao: any;
  }
};

const Post = ({ params }: { params: { slug: number } }) => {
  const [locationAddress, setLocationAddress] = useState<String>("");
  const [postData, setPostData] = useState<Object>({});
  
  const router = useRouter();

  const getPostData = async (id) => {
    const res = await axios.get(`http://localhost:8000/api/v1/boards/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  };

  const deletePostData = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/v1/boards/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  }

  const getMutation = useMutation({
    mutationFn: getPostData, 
    onSuccess: (data) => {
      setPostData(data);
      loadKakaoMap(data.location.latitude, data.location.longitude);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePostData, 
    onSuccess: (data) => {
      console.log(data);
      router.push(`/`);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  // const clickEditButton = () => {
  //   const container = document.getElementById("container");

  //   container?.innerHTML = `
  //     <div className="flex flex-col h-96 items-center justify-center">
  //       <h1 className="text-darkpink font-semibold text-2xl">모집하기</h1>
  //       <div className="flex flex-col items-center md:w-[30rem] w-[22rem] space-y-4 my-10">
  //         <input type="text" id="title" placeholder="제목을 입력해주세요." className="placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm" />
  //         <div className="flex md:flex-row flex-col justify-between w-full relative">
  //           <DatePicker
  //             showTimeInput
  //             dateFormat='yyyy / MM / dd'
  //             shouldCloseOnSelect
  //             minDate={new Date()}
  //             selected={selectedDate}
  //             onChange={(date) => setSelectedDate(date)}
  //             placeholderText="날짜를 선택해주세요."
  //             className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm"
  //             calendarClassName="bg-pink"
  //           />
  //           <div className='flex md:flex-row justify-between md:mt-0 mt-4'>
  //             <input type='time' id='startTime' className='placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 md:w-36 w-2/3 md:absolute right-[7rem] px-4 py-2.5 font-semibold text-sm text-zinc-500 cursor-pointer'/>
  //             <div className='relative'>
  //               <div 
  //                 className={`bg-white absolute border-solid rounded-[3px] h-50 right-0 z-10 max-w-[10rem] cursor-pointer w-24 px-4 py-2.5 font-semibold text-sm text-zinc-500
  //                 ${view ? 'border-darkpink border-[2px]' : 'border-pink border-[1.5px]'}`}
  //                 onClick={
  //                   () => {
  //                     setView(prev => !prev);
  //                   }
  //                 }
  //               >
  //                 {person === undefined ? '인원 선택' : `${person}명`}
  //               </div>
  //               <div id='personList' className="hidden absolute top-full z-[1000] overflow-auto h-56 bg-white border border-[1.5px] border-pink border-solid rounded-[3px] right-0 max-w-[10rem] w-24">
  //                 <>
  //                   {personItems.map((item, index) => (
  //                     <div
  //                       key={index} 
  //                       onClick={
  //                         () => {
  //                           setView(prev => !prev);
  //                           setPerson(item);                                   
  //                         }
  //                       } 
  //                       className='person-item hidden hover:text-darkpink cursor-pointer w-full flex bg-white h-9 items-center justify-center py-2.5 font-semibold text-sm text-zinc-500'
  //                     >
  //                       {item}
  //                     </div>
  //                   ))}
  //                 </>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex justify-between w-full">
  //           <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "보드게임" ? ' bg-pink ' : ' bg-white')} onClick={() => setCategory("보드게임")}>보드게임</div>
  //           <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "카공" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("카공")}>카공</div>
  //           <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "커피챗" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("커피챗")}>커피챗</div>
  //           <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "기타" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("기타")}>기타</div>
  //         </div>
  //         <div className="relative md:w-[30rem] w-[22rem]">
  //           <input type="text" name="location" id="location" placeholder="만날 장소를 입력해주세요." className="placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm"/>
  //           <div id="result-list" className="hidden h-[18rem] bg-white border border-[1px] rounded-[3px] border-zinc-300 absolute top-full z-[100] w-full px-4 overflow-auto"></div>
  //         </div>
  //         <textarea id="description" placeholder="상세 내용을 입력해주세요." rows={12} className="placeholder:text-zinc-500 text-slate-800 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-70 w-full px-4 py-2.5 font-semibold text-sm"></textarea>
  //       </div>
        
  //       <button className="md:w-[30rem] w-[22rem] h-fit bg-darkpink text-md font-semibold text-white rounded-lg py-2 px-20 cursor-pointer" onClick={createPost}>완료</button>  
  //     </div>
  //   `
  // };

  const clickDeleteButton = () => {
    deleteMutation.mutate(params.slug);
  };

  const loadKakaoMap = (latitude, longitude) => {
    // 카카오맵 api를 사용하기 위해 Head 부분에 script 태그 추가하기
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4b5f228cb3b8bf6903521cc0f6f67769&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);
  
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(latitude, longitude); // 지도에 표시할 위치

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
        console.log(postData.location?.longitude)
        console.log(postData.location?.latitude)
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(longitude, latitude, function(result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            setLocationAddress(result[0].address.address_name);
          }
      });
      });
    };
  
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  };

  useEffect(() => {
    getMutation.mutate(params.slug);
  }, []);

  return (
    <div id="container" className="flex h-full max-w-full flex-col">
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
              {postData.title}
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between md:h-[30rem] h-[32rem] md:mx-20 mx-10 mb-5 overflow-auto">
          <div className="md:mr-10 md:w-[35rem]">
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">
                모집
              </p>
              <p className="inline-block ml-3 text-lg">{postData.user?.username}</p>
            </div>
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">
                날짜
              </p>
              <p className="inline-block ml-3 text-lg">{postData.date} {postData.startTime}</p>
            </div>
            <div className="mb-2">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">
                인원
              </p>
              <p className="inline-block ml-3 text-lg">
                {postData.currentPerson} / {postData.maxCapacity}
              </p>
            </div>
            <div className="mb-5">
              <p className="w-fit px-3 py-1 inline-block rounded-2xl font-semibold border-solid border-2 border-pink">장소</p>
              <p className="inline-block ml-3 text-lg">{postData.location?.locationName}</p>
            </div>
            <hr  className="mb-5 border-lightgray" />
            <div className="md:mb-2 mb-10">
              <p className="w-fit px-3 py-1 mb-2 rounded-2xl font-semibold border-solid border-2 border-pink">상세내용</p>
              <p className="ml-3 text-lg">{postData.description}</p>
            </div>
          </div>
          <div className="md:w-[35rem]">
            <p className="w-fit px-3 py-1 inline-block mb-2 rounded-2xl font-semibold border-solid border-2 border-pink">위치</p>
            <p className="inline-block ml-3 text-lg">{locationAddress}</p>
            <div id="staticMap" className="2xl:h-[25rem] xl:h-[23rem] l:h-[21rem] md:h-[19rem] sm:h-[17rem] h-[15rem]"></div>
        
          </div>
        </div>
        <div className="flex items-center justify-center md:min-h-24 min-h-12">
          <button className="h-fit bg-darkpink text-lg font-semibold text-white rounded-lg py-2 px-20 cursor-pointer">지금 당장 참여하기 ({postData.currentPerson}/{postData.maxCapacity})</button>
          <div>
            <button className="h-fit bg-darkpink text-lg font-semibold text-white rounded-lg py-2 px-20 cursor-pointer" >수정</button>
            <button className="h-fit bg-darkpink text-lg font-semibold text-white rounded-lg py-2 px-20 cursor-pointer" onClick={clickDeleteButton}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
