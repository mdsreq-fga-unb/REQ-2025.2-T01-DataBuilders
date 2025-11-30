import styles from './FilterDropdown.module.css';

interface FilterDropdownProps {
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  hideLabel?: boolean;
}

function FilterDropdown({ label, value, options, onChange, hideLabel = false }: FilterDropdownProps) {
  return (
    <div className={styles.filterContainer}>
      {!hideLabel && label && (
        <label className={styles.filterLabel}>{label}</label>
      )}
      <select
        className={styles.filterSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterDropdown;

