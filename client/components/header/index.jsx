import styles from "./styles.module.scss";
import Logo from "./assets/owl-svgrepo-com.svg?react"
import { useLocation, useNavigate } from "react-router-dom";
import { FcHome } from "react-icons/fc";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const navigateToHome = () => {
    if (location.includes("update")) return navigate("/");

    return window.open("https://github.com/WendersonBarros/", "_blank", "noreferrer");
  }

  if (location.includes("update")) {
    return <header>
      <FcHome className={styles.__logo} onClick={navigateToHome} />
      <h1 className={styles.__title}>Update Restaurant</h1>
    </header>
  }

  return (
    <header>
      <Logo className={styles.__logo} onClick={navigateToHome} />
      <h1 className={styles.__title}>Restaurant Review List</h1>
    </header >
  )
}
