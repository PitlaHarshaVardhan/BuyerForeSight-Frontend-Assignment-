import { Users } from 'lucide-react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.iconWrapper}>
            <Users size={24} className={styles.icon} />
          </div>
          <h1>UserDir</h1>
        </Link>
        <div className={styles.actions}>
          {/* We can add profile or settings here if needed */}
          <div className={styles.avatar}>Admin</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
