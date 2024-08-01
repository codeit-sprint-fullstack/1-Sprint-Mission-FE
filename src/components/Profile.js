import "../assets/styles/Profile.css";
import tempProfileImg from "../assets/images/ic_profile40.svg";

export function Profile({ onClick }) {
  const clickProfile = () => onClick();

  return (
    <a>
      <span>
        <img
          className="header__btn-profile"
          src={tempProfileImg}
          onClick={clickProfile}
          alt="프로필 그림"
        />
      </span>
    </a>
  );
}

export default Profile;
