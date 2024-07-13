import Image from "next/image";
import NotiIcon from "@/assets/NotiIcon.svg";
import NotificationItem from "@/components/NotificationItem";

const Alarm = () => {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex justify-start items-center px-[1rem] md:px-[6rem] lg:px-[8rem] pt-[2rem] md:pb-[2rem]">
        <Image src={NotiIcon} alt="Notification Icon" width={36} height={36} />
        <p className="text-lg lg:text-2xl font-semibold ml-2 lg:ml-1">알림</p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center pt-[1rem] pb-[3rem] px-12">
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </main>
  );
};

export default Alarm;
