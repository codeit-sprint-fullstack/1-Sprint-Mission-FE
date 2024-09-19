import Image from "next/image";

export default function UserInfo() {
  return (
    <div>
      <div>
        <Image src={"/images/ic_user.svg"} width={40} height={40} alt="유저" />
        <div>
          <div>{"유저 이름"}</div>
          <div>{"날짜"}</div>
        </div>
      </div>
      <div>
        <div />
        <div>
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
