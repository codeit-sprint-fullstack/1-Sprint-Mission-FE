import { Outlet } from 'react-router-dom';
import Nav from './Nav.js';

function Layout() {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
