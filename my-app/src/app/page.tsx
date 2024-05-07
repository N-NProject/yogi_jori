import Image from "next/image";
import MainTab from "@/components/MainTab";
import Test from "../../public/icons/test.svg";
import NotificationItem from "@/components/NotificationItem";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-row min-h-screen justify-center p-24">
        <NotificationItem />
      </div>
    </main>
  );
}
