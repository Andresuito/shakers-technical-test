import Image from "next/image";
import styles from "../style/Navbar.module.css";
import { Container } from "@mantine/core";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.title}>Buscar proyecto</span>

      <div className={styles.icons}>
        <Image src="/icons/chat.svg" width={18} height={18} alt="Chat icon" />
        <Image
          src="/icons/bell.svg"
          width={18}
          height={18}
          alt="Notification icon"
        />
        <Image src="/images/avatar.png" width={24} height={24} alt="Avatar" />
      </div>
    </nav>
  );
}
