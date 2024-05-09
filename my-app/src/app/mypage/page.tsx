import React from "react";

import Link from "next/link";
import Image from "next/image";

import Nav from "../components/navweb";
import thumnail from "../assets/mypage/thumnail.svg";
import location from "../assets/mypage/ion_location.svg";
import pencil from "../assets/mypage/pencil.svg";

const myPage = () => {
  return (
    <div className="flex">
      <Nav />
      <div className="container  bg-white  justify-center items-center">
        <div className="name flex">
          <Image src={thumnail} alt="썸네일" />
          <div className="m-[2rem]">
            <div className="flex mb-[1rem] ">
              <h1 className="nickname ">하재민</h1>
              <button>
                <Image src={pencil} alt="편집" />{" "}
              </button>
            </div>

            <Link className="flex" href="/location">
              <Image src={location} alt="위치 아이콘" />
              <ins>위치 정보를 입력하세요</ins>
            </Link>
          </div>
        </div>

        <hr />
        <div className="write_post">
          작성한 게시글
          <div>scroll</div>
        </div>

        <div className="enter_post">
          참여한 게시글
          <div>scroll</div>
        </div>
      </div>
    </div>
  );
};

export default myPage;
