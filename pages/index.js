import React from "react";

import InputBar from "../components/common/InputBar";
import InputArea from "components/common/InputArea";
import BtnRoundFunction from "components/common/BtnRoundFunction";
import BtnSquareFunction from "components/common/BtnSquareFunction";
import SearchBar from "components/common/SearchBar";
import DropdownModal from "components/modal/DropdownModal";
import SortBtn from "components/common/SortBtn";

import ic_arrow_round_left from "images/icon/ic_arrow_round_left.svg";


export default function Test() {
  return (
  <div style={{width: '500px'}}>
    <InputBar headerText={"안녕"} />
    <InputArea headerText={"인풋아리아"} customGap={'30px'} customHeight={'100px'}/>
    <BtnSquareFunction innerText={"로그인"} linkTo={'asd'} activeState={true}/>
    <BtnRoundFunction innerText={"목록으로 돌아가기"} imgSrc={ic_arrow_round_left} linkTo={'asd'} activeState={true}/>
    <SearchBar />
    <SortBtn CurrentOption={"최신순"}/>
    <DropdownModal options={["test1", "test2", "test3"]}/>
  </div>
  );
} 