import { Outlet } from 'react-router-dom';
import './index.css';
import Nav from './component/Nav.js';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
