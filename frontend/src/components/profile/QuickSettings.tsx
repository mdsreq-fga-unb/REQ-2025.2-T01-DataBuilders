import { useState } from 'react';
import styles from './QuickSettings.module.css';

interface Setting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface QuickSettingsProps {
  settings: Setting[];
}

function QuickSettings({ settings: initialSettings }: QuickSettingsProps) {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Configurações Rápidas</h2>
      <div className={styles.settingsList}>
        {settings.map((setting) => (
          <div key={setting.id} className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <h3 className={styles.settingLabel}>{setting.label}</h3>
              <p className={styles.settingDescription}>{setting.description}</p>
            </div>
            <div
              className={`${styles.toggle} ${setting.enabled ? styles.toggleOn : styles.toggleOff}`}
              onClick={() => handleToggle(setting.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggle(setting.id);
                }
              }}
              aria-label={`${setting.enabled ? 'Desativar' : 'Ativar'} ${setting.label}`}
            >
              <div className={styles.toggleThumb}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickSettings;

