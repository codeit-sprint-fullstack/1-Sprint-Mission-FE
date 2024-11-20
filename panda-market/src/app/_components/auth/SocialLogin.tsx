import Image from "next/image";

export default function SocialLogin() {
  return (
    <div className="flex w-full max-w-[640px] flex-row items-center justify-between rounded-[8px] bg-[#E6F2FF] px-[23px] py-[16px]">
      <span className="text-[16px] font-medium text-secondary-800">
        간편 로그인하기
      </span>

      <div className="flex flex-row gap-4">
        <a href="https://kakao.com" target="_blank" rel="noopener noreferrer">
          <Image
            width={42}
            height={42}
            alt="카카오"
            src="/icons/icon-social-kakao.svg"
          />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <Image
            width={42}
            height={42}
            alt="구글"
            src="/icons/icon-social-google.svg"
          />
        </a>
      </div>
    </div>
  );
}
