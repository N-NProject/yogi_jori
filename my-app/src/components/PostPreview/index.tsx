import React from 'react';
import Image from "next/image";
import StudyInCafeImage from "@/assets/previewImages/StudyInCafe.png";
import LocationIcon from "@/assets/previewImages/LocationIcon.png";
import TimeIcon from "@/assets/previewImages/TimeIcon.png";
import PersonnelIcon from "@/assets/previewImages/PersonnelIcon.png";

const Comment = () => {
  return (
    <>
      <div className="flex flex-row w-fit bg-white rounded-2xl p-4">
        <Image
          src={StudyInCafeImage}
          alt="Study In Cafe Preview Image"
          width={96}
          height={96}
          priority
        />
        <div className="ml-3">
          <p className="w-fit bg-rose-100 px-2.5 py-0.5 rounded-xl text-xs mb-1.5">카공</p>
          <p className="text-lg font-semibold	mb-5">한국공학대 근처에서 카공할 사람!</p>
          <div className="flex flex-row">
            <div className="flex flex-row mr-3">
              <Image
                src={LocationIcon}
                alt="Location Icon Image"
                width={20}
                height={20}
                priority
              />
              <span className="text-sm ml-1 text-gray-500">경기도 시흥시</span>
            </div>
            <div className="flex flex-row mr-3">
              <Image
                src={TimeIcon}
                alt="Time Icon Image"
                width={16}
                height={16}
                priority
              />
              <span className="text-sm ml-2 text-gray-500">4/19(금) 14:00</span>
            </div>
            <div className="flex flex-row">
              <Image
                src={PersonnelIcon}
                alt="Personnel Icon Image"
                width={22}
                height={22}
                priority
              />
              <span className="text-sm ml-1 text-gray-500">1/4</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
