import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className={styles.breadcrumb}>
      <div className={`container ${styles.breadcrumbContainer}`}>
        <div className={styles.breadcrumbContent}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M2 13.5V7.5C2 7.22386 2.22386 7 2.5 7H6V10.5C6 10.7761 6.22386 11 6.5 11H13.5C13.7761 11 14 11.2239 14 11.5V13.5C14 13.7761 13.7761 14 13.5 14H2.5C2.22386 14 2 13.7761 2 13.5Z" 
              fill="#1a1a1a"
            />
            <path 
              d="M6 2.5V6H2.5C2.22386 6 2 5.77614 2 5.5V2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5Z" 
              fill="#1a1a1a"
            />
          </svg>
          {items.map((item, index) => (
            <span key={index} className={styles.breadcrumbItem}>
              {index > 0 && <span className={styles.separator}>›</span>}
              {item.path && index < items.length - 1 ? (
                <Link to={item.path} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.breadcrumbText}>{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;

