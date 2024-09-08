import style from "./date.module.css";

export function Date({ date = "2024.09.06" }) {
  const dateClass = `flex flex-row items-center font-normal text-gray-400 ${style.date}`;

  const dateText = date; // 임시로 고정 값
  const formedDate = <div className={dateClass}>{dateText}</div>;

  return formedDate;
}

export default Date;
