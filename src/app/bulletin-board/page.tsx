import classNames from "classnames";

import BestBoard from "./BestBoard";
import PostList from "./PostList";

export function BulletinBoard() {
  const mainClass = classNames("content", "main");
  return (
    <div className={mainClass}>
      {/* <BestBoard /> */}
      <PostList />
    </div>
  );
}

export default BulletinBoard;
