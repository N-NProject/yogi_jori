import Image from "next/image";
import PostPreview from "@/components/PostPreview"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <div className="flex flex-row min-h-screen justify-center p-24">
        <PostPreview/>
        <PostPreview/>
      </div>
    </main>
  );
}
