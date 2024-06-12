"use client";
import { set } from 'date-fns';
import { useState, useEffect } from 'react';

import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';

declare global {
  interface Window {
    kakao: any;
  }
};

const Write = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [view, setView] = useState(false); 
  const [person, setPerson] = useState<number>();
  const [category, setCategory] = useState<String>();
  const personItems = Array.from({ length: 15 }, (_, index) => index + 1);
  const [value, onChange] = useState('10:00');  

  useEffect(() => {
    // 카카오맵 api를 사용하기 위해 Head 부분에 script 태그 추가하기
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.type = "text/javascript";
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4b5f228cb3b8bf6903521cc0f6f67769&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);
  
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        // 장소 검색 서비스를 초기화합니다.
        const ps = new window.kakao.maps.services.Places();
        const keywordInput = document.getElementById('location') as HTMLInputElement;
        const resultList = document.getElementById('result-list') as HTMLElement;

        // 키워드 입력 이벤트 리스너
        keywordInput.addEventListener('keyup', function() {
          const keyword = keywordInput.value;

          if (!keyword.trim()) {
            resultList.innerHTML = '';
            return;
          }

          ps.keywordSearch(keyword, function(data: any[], status: string) {
            if (status === window.kakao.maps.services.Status.OK) {
              displayPlaces(data);
            } else {
              resultList.innerHTML = '<div class="result-item">검색 결과가 없습니다.</div>';
            }
          });
        });

        // 장소 검색 결과를 리스트로 표시하는 함수
        function displayPlaces(places: any[]) {
          resultList.innerHTML = '';

          places.forEach(function(place) {
            const listItem = document.createElement('div');
            listItem.className = 'result-item h-16 flex flex-col justify-center';
            
            const placeName = document.createElement('p');
            placeName.innerText = place.place_name;
            placeName.className = 'font-semibold';

            const placeAddress = document.createElement('p');
            placeAddress.innerText = place.address_name;
            placeAddress.className = 'text-zinc-500 text-sm';

            listItem.appendChild(placeName);
            listItem.appendChild(placeAddress);

            listItem.onclick = function() {
                console.log(place)
                alert(`장소 이름: ${place.place_name}\n주소: ${place.address_name}`);
            };
            resultList.appendChild(listItem);
          });
          resultList.classList.add('bg-white', 'border', 'border-[1px]', 'rounded-[3px]', 'border-zinc-300');
        };
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h1 className="text-darkpink font-semibold text-2xl">모집하기</h1>
      <div className="flex flex-col items-center md:w-[30rem] w-[22rem] space-y-4 my-10">
        <input type="text" name="title" placeholder="제목을 입력해주세요." className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm"/>
        <div className="flex md:flex-row flex-col justify-between w-full relative">
          <DatePicker
            showTimeInput
            dateFormat='yyyy / MM / dd  HH:mm' // 날짜 형태
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="날짜를 선택해주세요."
            className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm"
            calendarClassName="bg-pink"
          />
          <div className='flex md:flex-row justify-between md:mt-0 mt-4'>
            <input type='time' className='placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 md:w-36 w-2/3 md:absolute right-[7rem] px-4 py-2.5 font-semibold text-sm text-zinc-500 cursor-pointer'/>
            <div className='bg-white absolute border-[1.5px] border-solid border-pink rounded-[3px] h-50 right-0 z-10 max-w-[10rem] cursor-pointer'>
              <ul onClick={() => {setView(!view)}} className='overflow-auto w-24 px-4 py-2.5 font-semibold text-sm text-zinc-500'>
                {person}{person === undefined ? '인원 선택' : "명"}
                {/* {view ? '⌃' : '⌄'} */}
                {view && 
                  <>
                    {personItems.map((item, index) => (
                      <li key={index} onClick={() => setPerson(item)} className='hover:text-darkpink w-100 flex bg-white h-8 items-center justify-center'>{item}</li>
                    ))}
                  </>
                  
                }
              </ul>
            </div>
          </div>
          

        </div>
        <div className="flex justify-between w-full">
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "보드게임" ? ' bg-pink ' : ' bg-white')} onClick={() => setCategory("보드게임")}>보드게임</div>
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "카공" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("카공")}>카공</div>
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "커피챗" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("커피챗")}>커피챗</div>
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center md:w-28 w-20 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "기타" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("기타")}>기타</div>
        </div>
        <div className="relative md:w-[30rem] w-[22rem]">
          <input type="text" name="location" id="location" placeholder="만날 장소를 입력해주세요." className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm"/>
          <div id="result-list" className="absolute top-full z-[1000] w-full h-[30rem] px-4 overflow-auto"></div>
        </div>
        <textarea name="description" placeholder="상세 내용을 입력해주세요." rows="12" className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-70 w-full px-4 py-2.5 font-semibold text-sm"></textarea>
      </div>
      <Link href="/post">
        <button className="md:w-[30rem] w-[22rem] h-fit bg-darkpink text-md font-semibold text-white rounded-lg py-2 px-20 cursor-pointer">완료</button>  
      </Link>
    </div>
  );
};

export default Write;
