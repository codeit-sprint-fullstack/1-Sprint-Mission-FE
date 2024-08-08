import './index.css';
import Nav from './component/Nav.js';
import { ForSaleItems, BestItems } from './component/Items.js';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <BestItems />
        <ForSaleItems />
      </main>
    </>
  );
}
