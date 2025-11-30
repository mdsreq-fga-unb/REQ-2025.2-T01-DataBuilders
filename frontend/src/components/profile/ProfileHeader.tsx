import styles from './ProfileHeader.module.css';

interface ProfileHeaderProps {
  avatar: string;
  name: string;
  role: string;
  email: string;
  tags: string[];
}

function ProfileHeader({ avatar, name, role, email, tags }: ProfileHeaderProps) {
  return (
    <div className={styles.profileHeader}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <div className={`${styles.card} ${styles.content}`}>
              <div className={styles.avatar}>
                {avatar}
              </div>
              <div className={styles.info}>
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.role}>{role}</p>
                <p className={styles.email}>{email}</p>
                <div className={styles.tags}>
                  {tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;

