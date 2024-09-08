"use client";

import { DeviceProvider } from "../components/DeviceProvider";
import BestBoard from "./BestBoard";
import Board from "./Board";

import style from "./bulletin-board.module.css";

export function BulletinBoard() {
  return (
    <div className={style.main}>
      <DeviceProvider>
        <BestBoard />
        <Board />
      </DeviceProvider>
    </div>
  );
}

export default BulletinBoard;
