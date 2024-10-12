import styles from "./HomeSection.module.scss";
import { ImageContainer } from "./ImgContainers";

export default function HomeSection() {
  return (
    <section class="card hot-items">
      <ImageContainer />
      <div class="card-texts">
        <span>Hot item</span>
        <h2>인기 상품을 확인해 보세요</h2>
        <p>가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요</p>
      </div>
    </section>
  );
}
