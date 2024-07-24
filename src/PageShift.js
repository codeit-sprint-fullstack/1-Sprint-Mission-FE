import leftBtn from "./image/btn_left.svg";
import rightBtn from "./image/btn_right.svg";
import page1 from "./image/Page-1.svg";
import page2 from "./image/Page-2.svg";
import page3 from "./image/Page-3.svg";
import page4 from "./image/Page-4.svg";
import page5 from "./image/Page-5.svg";
import "./PageShift.css";

export function Shift() {
  return (
    <div className="shiftBtn">
      <img className="shiftImg" src={rightBtn} alt="rightBtn" />
      <img className="shiftImg" src={page1} alt="page1" />
      <img className="shiftImg" src={page2} alt="page2" />
      <img className="shiftImg" src={page3} alt="lpage3" />
      <img className="shiftImg" src={page4} alt="page4" />
      <img className="shiftImg" src={page5} alt="page5" />
      <img className="shiftImg" src={leftBtn} alt="leftBtn" />
    </div>
  );
}
