import Image from "next/image";
import style from './UserInfo.module.css'

export default function UserInfo() {
  return (
    <div className={style.contaner}>
      <div className={style.userBox}>
        <Image className={style.userIcon} src={"/images/ic_user.svg"} width={40} height={40} alt="유저" />
        <div>
          <div className={`${style.infoText} ${style.userName}`}>{"유저 이름"}</div>
          <div className={`${style.infoText} ${style.date}`}>{"날짜"}</div>
        </div>
      </div>
      <div className={style.favoriteContaner}>
        <div className={style.line}/>
        <div className={style.favoriteBox}>
          <Image
            src={"/images/ic_heart.svg"}
            width={32}
            height={32}
            alt="하트"
          />
          <div>{"좋아요 갯수"}</div>
        </div>
      </div>
    </div>
  );
}
