import TopBanner from "./components/TopBanner";
import BottomBanner from "./components/BottomBanner";
import MiddleBanner from "./components/MiddleBanner";

export function Home() {
  return (
    <>
      <main className="w-full bg-onahau mt-header">
        <div className="main-frame">
          <TopBanner />
        </div>
      </main>
      <main className="w-full bg-white">
        <div className="main-frame">
          <MiddleBanner
            isLeftImage={false}
            imagePath={"/images/Img_home_01_588_444.svg"}
            textSetWidth={"27.4rem"}
            topText={"Hot Item"}
            middleText={"인기 상품을 확인해 보세요"}
            bottomText={
              "가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
            }
          />
        </div>
      </main>
      <main className="w-full bg-white">
        <div className="main-frame">
          <MiddleBanner
            isLeftImage={true}
            imagePath={"/images/Img_home_02_588_444.svg"}
            textSetWidth={"31.7rem"}
            topText={"Search"}
            middleText={"구매를 원하는 상품을 검색하세요"}
            bottomText={"구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"}
          />
        </div>
      </main>
      <main className="w-full bg-white">
        <div className="main-frame">
          <MiddleBanner
            isLeftImage={false}
            imagePath={"/images/Img_home_03_588_444.svg"}
            textSetWidth={"33.5rem"}
            topText={"Register"}
            middleText={"판매를 원하는 상품을 등록하세요"}
            bottomText={"어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"}
          />
        </div>
      </main>
      <div className="h-[13.8rem]" />
      <main className="w-full bg-onahau">
        <div className="main-frame">
          <BottomBanner />
        </div>
      </main>
    </>
  );
}

export default Home;
