import React from 'react';
import Image from "next/image";
import StudyInCafeImage from "@/assets/previewImages/StudyInCafe.png";
import LocationIcon from "@/assets/previewImages/LocationIcon.png";
import TimeIcon from "@/assets/previewImages/TimeIcon.png";
import PersonnelIcon from "@/assets/previewImages/PersonnelIcon.png";

interface PostPreviewProps {
  board_id: number;
  title: string;
  tag: string[];
  date: string;
  time: string;
  currentPerson: number;
  maxPerson: number;
  location: string;
}

const tagColors: { [key: string]: string } = {
  "카공": "bg-blue-100",
  "보드게임": "bg-yellow-100",
  "커피챗": "bg-red-100",
  "기타": "bg-lightgray",
};

const PostPreview: React.FC<PostPreviewProps> = ({
  board_id,
  title,
  tag,
  date,
  time,
  currentPerson,
  maxPerson,
  location,
}) => {
  const tagColor = tag && tag.length > 0 ? (tagColors[tag[0]] || "bg-lightgray") : "bg-lightgray";
  return (
    <div className="flex flex-row w-[32rem] h-32 bg-white rounded-3xl p-3 border border-1 border-lightgray">
      <Image
        src={StudyInCafeImage}
        alt="Study In Cafe Preview Image"
        width={96}
        height={96}
        priority
      />
      <div className="ml-3">
        <p className={`w-fit ${tagColor} px-2.5 py-0.5 rounded-xl text-xs mb-1.5`}>
          {tag && tag.length > 0 ? tag[0] : "알 수 없음"}
        </p>
        <p className="text-base font-semibold mb-8">{title}</p>
        <div className="flex flex-row">
          <div className="flex flex-row mr-3 items-center">
            <Image
              src={LocationIcon}
              alt="Location Icon Image"
              width={18}
              height={18}
              priority
            />
            <span className="text-xs ml-1 text-gray-500">{location}</span>
          </div>
          <div className="flex flex-row mr-3 items-center">
            <Image
              src={TimeIcon}
              alt="Time Icon Image"
              width={16}
              height={16}
              priority
            />
            <span className="text-xs ml-2 text-gray-500">{`${date} ${time}`}</span>
          </div>
          <div className="flex flex-row items-center">
            <Image
              src={PersonnelIcon}
              alt="Personnel Icon Image"
              width={22}
              height={22}
              priority
            />
            <span className="text-xs ml-1 text-gray-500">{`${currentPerson}/${maxPerson}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;