import { Search, ArrowUpDown } from 'lucide-react';
import styles from './FilterBar.module.css';

const FilterBar = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.sortContainer}>
        <ArrowUpDown size={16} className={styles.sortIcon} />
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="company-asc">Sort by Company (A-Z)</option>
          <option value="company-desc">Sort by Company (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
