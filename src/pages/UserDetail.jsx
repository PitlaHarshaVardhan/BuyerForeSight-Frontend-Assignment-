import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building2, Briefcase } from 'lucide-react';
import { fetchUserById } from '../services/api';
import styles from './UserDetail.module.css';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserById(id);
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading details...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <h2>User Not Found</h2>
          <p>{error || "The user you're looking for doesn't exist."}</p>
          <Link to="/" className={styles.backBtn}>
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft size={18} />
        <span>Back to Directory</span>
      </Link>

      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}>
          {user.name.charAt(0)}
        </div>
        <div className={styles.headerInfo}>
          <h1>{user.name}</h1>
          <p className={styles.username}>@{user.username}</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Contact Info */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Contact Information</h3>
          <ul className={styles.list}>
            <li>
              <div className={styles.iconBox}><Mail size={18} /></div>
              <div>
                <span className={styles.label}>Email</span>
                <a href={`mailto:${user.email}`} className={styles.valueLink}>{user.email}</a>
              </div>
            </li>
            <li>
              <div className={styles.iconBox}><Phone size={18} /></div>
              <div>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{user.phone}</span>
              </div>
            </li>
            <li>
              <div className={styles.iconBox}><Globe size={18} /></div>
              <div>
                <span className={styles.label}>Website</span>
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className={styles.valueLink}>
                  {user.website}
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Address</h3>
          <ul className={styles.list}>
            <li>
              <div className={styles.iconBox}><MapPin size={18} /></div>
              <div>
                <span className={styles.label}>Location</span>
                <span className={styles.value}>
                  {user.address.street}, {user.address.suite}<br />
                  {user.address.city}, {user.address.zipcode}
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Company</h3>
          <ul className={styles.list}>
            <li>
              <div className={styles.iconBox}><Building2 size={18} /></div>
              <div>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>{user.company.name}</span>
              </div>
            </li>
            <li>
              <div className={styles.iconBox}><Briefcase size={18} /></div>
              <div>
                <span className={styles.label}>Catch Phrase</span>
                <span className={`${styles.value} ${styles.italic}`}>"{user.company.catchPhrase}"</span>
              </div>
            </li>
            <li>
              <div className={styles.iconBox} style={{opacity: 0}}></div>
              <div>
                <span className={styles.label}>Business</span>
                <span className={styles.value}>{user.company.bs}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
