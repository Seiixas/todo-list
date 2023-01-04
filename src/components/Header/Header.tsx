import styles from "./Header.module.css";

import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img
        src={logo}
        alt="Logomarca escrito ToDo em azul com um icone de foguete a esquerda"
      />
    </header>
  );
}
