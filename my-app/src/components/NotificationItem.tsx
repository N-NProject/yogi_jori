import React from 'react';

const NotificationItem: React.FC = () => {
  const notification = {
    title: "새로운 게시글 등록 알림",
    content: "한국공학대 도서관에서 공부할 사람!",
    timestamp: "10분 전"
  };

  return (
    <div className="flex flex-col w-[37.5rem] h-[7.5rem] p-4 bg-white border border-darkgray rounded-[1.25rem] space-y-[0.25rem]">
      <h3 className="text-xl font-semibold">{notification.title}</h3>
      <p className="text-base font-semibold text-darkgray">{notification.content}</p>
      <p className="text-base font-semibold text-darkgray">{notification.timestamp}</p>
    </div>
  );
};

export default NotificationItem;