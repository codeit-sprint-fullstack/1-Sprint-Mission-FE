import { Link } from 'react-router-dom';

import './Nav.css';

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/forums'}>자유게시판</Link>
        </li>
        <li>
          <Link to={'/'}>중고마켓</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
