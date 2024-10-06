import classNames from "classnames";

import BestBoard from "./BestBoard";
import Board from "./Board";

export function BulletinBoard() {
  const mainClass = classNames("content", "main");
  return (
    <div className={mainClass}>
      {/* <BestBoard /> */}
      {/* <Board /> */}
    </div>
  );
}

export default BulletinBoard;
