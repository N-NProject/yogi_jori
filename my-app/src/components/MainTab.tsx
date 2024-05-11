"use client";

import { useState } from 'react';

const categories = ["전체", "카공", "보드게임", "커피챗", "기타"];

const MainTab = () => {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <div className="flex justify-center w-[64rem] h-[5rem] space-x-[6.75rem]">
      {categories.map(category => (
        <button
          key={category}
          className={`px-4 py-2 w-[8.25rem] text-2xl font-semibold ${
            activeTab === category ? 'text-black' : 'text-darkgray'
          }`}
          onClick={() => setActiveTab(category)}
        >
          {category}
          {activeTab === category && (
            <div className="w-[5.5rem] h-0.5 my-1 bg-darkpink"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default MainTab;