import './Nav.css';

function Nav() {
  return (
    <div className="navBar">
      <div className="navBox">
        <div className="navTextBox">
          <div className="logo"></div>
          <div>자유게시판</div>
          <div>중고마켓</div>
        </div>
        <div className="myLogo"></div>
      </div>
    </div>
  );
}

export default Nav;
