import ItemImg1 from "@/images/Home_Item1.png";
import ItemImg2 from "@/images/Home_Item2.png";
import ItemImg3 from "@/images/Home_Item3.png";
import styles from "./MiddleItem.module.css";
import Image from "next/image";

export default function MiddlerItem() {
  return (
    <div className={styles.MiddleContainer}>
      <div className={styles.MiddleItemContainer}>
        <div className={styles.Item}>
          <Image
            src={ItemImg1}
            width={588}
            height={444}
            alt="ItemImg1"
            className={styles.ItemImg}
          />
          <div className={styles.MiddleItemFont}>
            <p className={styles.ItemCategoryFont}>Hot Item</p>
            <p className={styles.ItemTitleFont}>
              인기 상품을
              <span className={styles.ItemTitleNewLine}>
                <br />
              </span>
              확인해 보세요
            </p>
            <p className={styles.ItemContentFont}>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className={styles.Item}>
          <Image
            src={ItemImg2}
            width={588}
            height={444}
            alt="ItemImg2"
            className={styles.ItemImg}
          />
          <div className={styles.MiddleItemFont}>
            <p className={styles.ItemCategoryFont}>Search</p>
            <p className={styles.ItemTitleFont}>
              구매를 원하는
              <span className={styles.ItemTitleNewLine}>
                <br />
              </span>
              상품을 검색하세요
            </p>
            <p className={styles.ItemContentFont}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>

        <div className={styles.Item}>
          <Image
            src={ItemImg3}
            width={588}
            height={444}
            alt="ItemImg3"
            className={styles.ItemImg}
          />
          <div className={styles.MiddleItemFont}>
            <p className={styles.ItemCategoryFont}>Register</p>
            <p className={styles.ItemTitleFont}>
              판매를 원하는
              <span className={styles.ItemTitleNewLine}>
                <br />
              </span>
              상품을 등록하세요
            </p>
            <p className={styles.ItemContentFont}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
