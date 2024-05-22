"use client";
import { set } from 'date-fns';
import { useState } from 'react';

import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';

const Write = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [view, setView] = useState(false); 
  const [person, setPerson] = useState<number>();
  const [category, setCategory] = useState<String>();
  const personItems = Array.from({ length: 15 }, (_, index) => index + 1);
  const [value, onChange] = useState('10:00');  

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
            <input type='time' className='placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-36 md:absolute right-[7rem] px-4 py-2.5 font-semibold text-sm text-zinc-500 cursor-pointer'/>
            <div className='bg-white md:absolute border-[1.5px] border-solid border-pink rounded-[3px] h-50 right-0 z-10 max-w-[10rem] cursor-pointer'>
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
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center w-28 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "보드게임" ? ' bg-pink ' : ' bg-white')} onClick={() => setCategory("보드게임")}>보드게임</div>
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center w-28 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "카공" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("카공")}>카공</div>
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center w-28 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "커피챗" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("커피챗")}>커피챗</div>
          <div className={"border-[1.5px] border-solid border-pink rounded-2xl text-center w-28 py-1.5 text-sm text-zinc-500 font-semibold cursor-pointer" + (category === "기타" ? ' bg-pink' : ' bg-white')} onClick={() => setCategory("기타")}>기타</div>
        </div>
        <input type="text" name="location" placeholder="만날 장소를 입력해주세요." className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-11 w-full px-4 py-2.5 font-semibold text-sm"/>
        <textarea name="description" placeholder="상세 내용을 입력해주세요." rows="12" className="placeholder:text-zinc-500 border-[1.5px] border-solid border-pink outline-darkpink rounded-[3px] h-70 w-full px-4 py-2.5 font-semibold text-sm"/>
      </div>
      <Link href="/post">
        <button className="md:w-[30rem] w-[22rem] h-fit bg-darkpink text-md font-semibold text-white rounded-lg py-2 px-20 cursor-pointer">완료</button>  
      </Link>
    </div>
  );
};

export default Write;
