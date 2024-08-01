import { Outlet } from 'react-router-dom';
import Nav from './Nav.js';

function App() {
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

export default App;
