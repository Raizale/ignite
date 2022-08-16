import styles from "./Header.module.css";

import Logo from '../assets/to-do-list-logo.svg';

export function Header() {
  return (
    <div>
      <header className={styles.header}>
        <img src={Logo} alt="Logo do To do List" />
      </header>
    </div>
  );
}