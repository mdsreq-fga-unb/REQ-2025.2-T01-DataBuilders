import styles from './FilterGroup.module.css';

interface FilterGroupProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

function FilterGroup({ options, selected, onChange }: FilterGroupProps) {
  return (
    <div className={styles.container}>
      {options.map((option) => (
        <button
          key={option}
          className={`${styles.filterButton} ${selected === option ? styles.active : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterGroup;


