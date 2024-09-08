import React from "react";
import styles from "./index.module.css";

//기능
import Link from "next/link";

// 콘테이너
import ContentBanner from "@components/container/ContentBanner";
import TopBottomBanner from "@components/container/TopBottomBanner";

// Common 컴포넌트
import CtaBox, { RenderOnlyCTA } from "@components/common/CtaBox";

// 기타 컴포넌트
import Footer from "@components/Footer";

export default function RandingPage() {
  return (
    <main className={styles.mainContainer}>
      <TopBottomBanner>
        <RenderOnlyCTA mainCTA={["일상의 모든 물건을 ", "거래해 보세요"]} />
      </TopBottomBanner>
      <ContentBanner>
        <article className={styles.contentBox}>
          <div className={styles.imgBox}>
            <img src="/images/landing/home_01.png" alt="home_01" />
          </div>
          <CtaBox
            keyword={"Hot item"}
            mainCTA={["인기 상품을 ", "확인해 보세요"]}
            description={[
              "가장 HOT한 중고거래 물품을",
              "판다 마켓에서 확인해 보세요",
            ]}
          />
        </article>
      </ContentBanner>
      <ContentBanner>
        <article className={styles.contentBox}>
          <CtaBox
            keyword={"Serch"}
            mainCTA={["구매를 원하는", "상품을 검색하세요"]}
            description={["구매하고 싶은 물품은 검색해서", "쉽게 찾아보세요"]}
            alignRight={true}
          />
          <div className={styles.imgBox}>
            <img src="/images/landing/home_02.png" alt="home_02" />
          </div>
        </article>
      </ContentBanner>
      <ContentBanner>
        <article className={styles.contentBox}>
          <div className={styles.imgBox}>
            <img src="/images/landing/home_03.png" alt="home_03" />
          </div>
          <CtaBox
            keyword={"Register"}
            mainCTA={["판매를 원하는 ", "상품을 등록하세요"]}
            description={[
              "어떤 물건이든 판매하고 싶은 상품을",
              "쉽게 등록하세요",
            ]}
          />
        </article>
      </ContentBanner>
      <TopBottomBanner>
        <CtaBox mainCTA={["믿을 수 있는", "판다마켓 중고 거래"]} />
      </TopBottomBanner>
      <Footer />
    </main>
  );
}
