import React from "react";
import styles from "./index.module.css";

//Next기능
import Link from "next/link";
import Head from "next/head";

// 콘테이너
import ContentBanner from "@components/container/ContentBanner";
import TopBottomBanner from "@components/container/TopBottomBanner";

// Common 컴포넌트
import CtaBox, {
  RenderTopCTA,
  RenderBottomCTA,
} from "@components/common/CtaBox";
import BtnRoundFunction from "@components/common/BtnRoundFunction";

// 중요 컴포넌트
import PageNav from "@components/PageNav";
import Footer from "@components/Footer";

export default function RandingPage() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <meta
          name="description"
          content="판다마켓에서 일상 속 모든 물건을 거래해보세요."
        />
      </Head>
      <PageNav />
      <TopBottomBanner>
        <article className={styles.topContainer}>
          <div className={styles.ctaBtnbox}>
            <RenderTopCTA mainCTA={["일상의 모든 물건을", "거래해 보세요"]} />
            <div className={styles.btnStyleControl}>
              <Link href={"/market"}>
                <BtnRoundFunction innerText={"구경하러 가기"} />
              </Link>
            </div>
          </div>
          <div className={styles.topImgControl}>
            <img src="/images/landing/home_top.png" alt="home_top" />
          </div>
        </article>
      </TopBottomBanner>

      <main className={styles.mainContainer}>
        <ContentBanner>
          <article className={styles.contentBox}>
            <div className={styles.imgBox}>
              <img src="/images/landing/home_01.png" alt="home_01" />
            </div>
            <CtaBox
              keyword={"Hot item"}
              mainCTA={["인기 상품을", "확인해 보세요"]}
              description={[
                "가장 HOT한 중고거래 물품을",
                "판다 마켓에서 확인해 보세요",
              ]}
            />
          </article>
        </ContentBanner>
        <ContentBanner>
          <article className={`${styles.contentBox} ${styles.reverseControl}`}>
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
              mainCTA={["판매를 원하는", "상품을 등록하세요"]}
              description={[
                "어떤 물건이든 판매하고 싶은 상품을",
                "쉽게 등록하세요",
              ]}
            />
          </article>
        </ContentBanner>
      </main>

      <TopBottomBanner>
        <article className={styles.bottomContainer}>
          <div className={styles.paddingControl}>
            <RenderBottomCTA mainCTA={["믿을 수 있는", "판다마켓 중고 거래"]} />
          </div>
          <div className={styles.bottomImgControl}>
            <img src="/images/landing/home_bottom.png" alt="home_bottom" />
          </div>
        </article>
      </TopBottomBanner>

      <Footer />
    </>
  );
}
