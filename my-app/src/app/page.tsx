"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/boards");
  return null; // 또는 빈 JSX 리턴
}
