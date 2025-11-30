import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ placeholder = 'Pesquisar materiais...', value, onChange }: SearchBarProps) {
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
    </div>
  );
}

export default SearchBar;

