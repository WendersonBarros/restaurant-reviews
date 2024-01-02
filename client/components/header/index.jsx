import styles from "./styles.module.scss";
import Logo from "./assets/owl-svgrepo-com.svg?react"
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  }

  return (
    <header>
      <Logo className={styles.__logo} onClick={navigateToHome}/>
      <h1 className={styles.__title}>Restaurant Review List</h1>
    </header>
  )
}
