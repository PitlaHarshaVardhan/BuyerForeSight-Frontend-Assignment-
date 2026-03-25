import { useState, useMemo } from 'react';
import { useUsers } from '../hooks/useUsers';
import UserCard from '../components/UserCard';
import FilterBar from '../components/FilterBar';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc'); // default sort

  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];
    
    // Filter
    let result = users.filter((user) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
      );
    });

    // Sort
    result.sort((a, b) => {
      const [field, direction] = sortBy.split('-');
      let valA, valB;
      
      if (field === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (field === 'company') {
        valA = a.company.name.toLowerCase();
        valB = b.company.name.toLowerCase();
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>User Directory</h2>
          <p>Manage your contacts and directories</p>
        </div>
        <div className={styles.loaderArea}>
          <div className={styles.spinner}></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Oops! Something went wrong.</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryBtn}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>User Directory</h2>
        <p>Manage your contacts and directories</p>
      </div>

      <FilterBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filteredAndSortedUsers.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No users found matching your search criteria.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredAndSortedUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
