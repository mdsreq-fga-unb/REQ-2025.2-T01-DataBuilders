import styles from './RepositorySearchBar.module.css';

interface RepositorySearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

function RepositorySearchBar({ 
  placeholder = 'Buscar repositórios por nome, descrição ou README...', 
  value, 
  onChange 
}: RepositorySearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <svg 
        className={styles.searchIcon}
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <svg 
        className={styles.filterIcon}
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    </div>
  );
}

export default RepositorySearchBar;

