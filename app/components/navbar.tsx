import Image from "next/image";
import styles from "./styles/Navbar.module.css";
import { Container } from "@mantine/core";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Container size={1360} className={styles.navContainer}>
        <span className={styles.title}>Search Project</span>

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
      </Container>
    </nav>
  );
}
