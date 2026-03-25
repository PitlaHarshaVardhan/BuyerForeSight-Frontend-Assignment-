import { Link } from 'react-router-dom';
import { Mail, Phone, Building2, ChevronRight } from 'lucide-react';
import styles from './UserCard.module.css';

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`} className={styles.card}>
      <div className={styles.avatar}>
        {user.name.charAt(0)}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.username}>@{user.username}</p>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <Mail size={14} className={styles.icon} />
            <span>{user.email}</span>
          </div>
          <div className={styles.detailItem}>
            <Phone size={14} className={styles.icon} />
            <span>{user.phone.split(' ')[0]}</span>
          </div>
          <div className={styles.detailItem}>
            <Building2 size={14} className={styles.icon} />
            <span>{user.company.name}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.arrow}>
        <ChevronRight size={20} />
      </div>
    </Link>
  );
};

export default UserCard;
