import Link from "next/link";
import Image from "next/image";
import LargeMediumBtn from "@/app/_components/common/LargeMediumBtn";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

import LandingSection from "@/app/_components/landing/LandingSection";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="w-full overflow-x-hidden">
        {/* 첫 번째 섹션*/}
        <section className="flex h-[540px] w-full items-end justify-center gap-8 bg-[#CFE5FF] tablet:h-[770px] pc:h-[540px]">
          <div className="flex flex-col items-center justify-center gap-4 mobile:gap-[132px] tablet:gap-[211px] pc:flex-row pc:gap-[0px]">
            <div className="flex max-w-[360px] flex-col items-end items-center justify-end gap-4 text-center pc:items-start">
              <div className="flex flex-col gap-[18px] tablet:gap-[24px] pc:items-start pc:gap-[32px]">
                <span className="whitespace-pre-line text-center text-[32px] font-bold text-secondary-700 tablet:whitespace-nowrap lg:text-[40px] pc:whitespace-pre-line pc:text-start pc:text-[40px] pc:leading-[56px]">
                  {`일상의 모든 물건을\n 거래해 보세요`}
                </span>
              </div>
              <Link href="/product">
                <LargeMediumBtn
                  mode="medium"
                  className="tablet:!h-[56px] tablet:!w-[357px] tablet:!px-[124px] tablet:!py-4 tablet:!text-[20px]"
                >
                  구경하러 가기
                </LargeMediumBtn>
              </Link>
            </div>
            <Image
              src="/images/Img_home_1.svg"
              width={746}
              height={340}
              alt="img_home_1"
              className="w-full max-w-[500px] pc:max-w-[746px]"
            />
          </div>
        </section>

        {/* 두번째 섹션 - Hot item*/}
        <LandingSection
          imageUrl="/images/Img_home_2.svg"
          imageAlt="img_home_2"
          badge="Hot item"
          title={`인기 상품을\n확인해 보세요`}
          description={`가장 HOT한 중고거래 물품을\n판다 마켓에서 확인해 보세요`}
          alignment="start"
        />

        {/* 세번째 섹션 - Search*/}
        <LandingSection
          imageUrl="/images/Img_home_3.svg"
          imageAlt="img_home_3"
          badge="Hot item"
          title={`인기 상품을\n확인해 보세요`}
          description={`가장 HOT한 중고거래 물품을\n판다 마켓에서 확인해 보세요`}
          alignment="end"
          reversed={true}
        />

        {/* 네번째 섹션 - Register*/}
        <LandingSection
          imageUrl="/images/Img_home_4.svg"
          imageAlt="img_home_4"
          badge="Hot item"
          title={`판매를 원하는\n상품을 등록하세요`}
          description={`어떤 물건이든 판매하고 싶은 상품을\n쉽게 등록하세요`}
          alignment="start"
        />

        {/* 마지막 섹션 */}
        <section className="mt-[80px] flex h-[540px] w-full items-end justify-center gap-8 bg-[#CFE5FF] tablet:mt-[4px] tablet:h-[770px] pc:mt-[138px] pc:h-[540px]">
          <div className="flex flex-col items-center justify-center gap-4 mobile:gap-[132px] tablet:gap-[211px] pc:flex-row pc:gap-[0px]">
            <div className="flex max-w-[360px] flex-col items-end items-center justify-end gap-4 text-center pc:items-start">
              <div className="flex flex-col gap-[18px] tablet:gap-[24px] pc:items-start pc:gap-[32px]">
                <span className="whitespace-pre-line text-center text-[32px] font-bold text-secondary-700 tablet:whitespace-nowrap lg:text-[40px] pc:whitespace-pre-line pc:text-start pc:text-[40px] pc:leading-[56px]">
                  {`믿을 수 있는\n 판다마켓 중고거래`}
                </span>
              </div>
            </div>
            <Image
              src="/images/Img_home_5.svg"
              width={746}
              height={340}
              alt="img_home_1"
              className="w-full max-w-[500px] pc:max-w-[746px]"
            />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
