import { Outlet } from 'react-router-dom';
import Nav from './Nav.js';
// import Footer from '../components/Footer';
// import styles from './App.module.css';
// import './App.font.css';

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
