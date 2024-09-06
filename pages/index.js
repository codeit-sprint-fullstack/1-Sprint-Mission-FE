import React from "react";

// 콘테이너
import ContentContain from "@components/container/ContentContain";

// Common 컴포넌트
import InputBar from "@components/common/InputBar";
import InputArea from "@components/common/InputArea";
import BtnRoundFunction from "@components/common/BtnRoundFunction";
import BtnSquareFunction from "@components/common/BtnSquareFunction";
import SearchBar from "@components/common/SearchBar";
import DropdownModal from "@components/modal/DropdownModal";
import SortBtn from "@components/common/SortBtn";

import Link from "next/link";

const ic_arrow_round_left = "/images/icon/ic_arrow_round_left.svg";

export default function Test() {
  return (
    <ContentContain>
      <div style={{ width: "500px" }}>
        <InputBar headerText={"안녕"} />
        <InputArea
          headerText={"인풋아리아"}
          customGap={"30px"}
          customHeight={"100px"}
        />
        <Link href="/freeboard">
          <BtnSquareFunction innerText={"로그인"} activeState={true} />
        </Link>
        <BtnRoundFunction
          innerText={"목록으로 돌아가기"}
          imgSrc={ic_arrow_round_left}
          activeState={true}
        />
        <SearchBar />
        <SortBtn CurrentOption={"최신순"} />
        <DropdownModal options={["test1", "test2", "test3"]} />
      </div>
    </ContentContain>
  );
}
