import { DefaultLayout } from '../layouts';
import { Breadcrumb, ProfileHeader, StatCard, UserInfoForm, ContentManagementCard, ChangePasswordCard } from '../components';
import styles from './ProfilePage.module.css';

interface Statistic {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accentColor: string;
  iconBackground: string;
}

function ProfilePage() {
  // Dados mockados do usuário
  const userData = {
    avatar: 'MS',
    name: 'Prof. Maurício Serrano',
    role: 'Professor de Estruturas de Dados 2',
    email: 'mauricio.serrano@unb.br',
    tags: ['Professor', 'Departamento de Ciência da Computação']
  };

  // Estatísticas
  const stats: Statistic[] = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      value: '24',
      label: 'Materiais Criados',
      accentColor: '#1d4ed8',
      iconBackground: '#eff6ff'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      value: '156',
      label: 'Alunos Ativos',
      accentColor: '#16a34a',
      iconBackground: '#dcfce7'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      value: '8',
      label: 'Avisos Publicados',
      accentColor: '#f59e0b',
      iconBackground: '#fef3c7'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      value: '3',
      label: 'Repositórios',
      accentColor: '#1f2937',
      iconBackground: '#e5e7eb'
    }
  ];

  return (
    <DefaultLayout>
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Perfil' }]} />
      
      <div className={styles.profilePage}>
        {/* Profile Header */}
        <ProfileHeader
          avatar={userData.avatar}
          name={userData.name}
          role={userData.role}
          email={userData.email}
          tags={userData.tags}
        />

        {/* Statistics Section */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className="row g-3 g-lg-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  accentColor={stat.accentColor}
                  iconBackground={stat.iconBackground}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.mainContent}>
          <div className="container">
            <div className="row g-4">
              {/* Left Column */}
              <div className="col-12 col-lg-4 col-xl-3">
                <UserInfoForm
                  fullName={userData.name}
                  email={userData.email}
                  userType="Professor"
                  department="Ciência da Computação"
                />
                <ChangePasswordCard />
              </div>

              {/* Right Column */}
              <div className="col-12 col-lg-8 col-xl-9">
                <div className={styles.contentManagementWrapper}>
                  <h2 className={styles.contentManagementTitle}>Gestão de Conteúdo</h2>
                  <div className={styles.contentManagementGrid}>
                    <div className="row g-4">
                      <div className="col-12 col-lg-6">
                        <ContentManagementCard
                          icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="16" y1="13" x2="8" y2="13" />
                              <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                          }
                          title="Materiais de Aula"
                          description="Gerencie slides, PDFs e recursos"
                          iconColor="#2563eb"
                          iconBackground="#eff6ff"
                          statistics={[
                            { label: 'Materiais publicados', value: 24 },
                            { label: 'Visualizações totais', value: '1,246' },
                            { label: 'Último upload', value: 'Hoje' }
                          ]}
                          primaryButton={{
                            text: 'Gerenciar Materiais',
                            link: '/materiais',
                            variant: 'blue'
                          }}
                          secondaryButton={{
                            text: 'Adicionar Novo Material',
                            link: '/materiais',
                            variant: 'blue'
                          }}
                        />
                      </div>

                      <div className="col-12 col-lg-6">
                        <ContentManagementCard
                          icon={
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          }
                          title="Repositórios GitHub"
                          description="Gerencie códigos e projetos da disciplina"
                          iconColor="#1f2937"
                          iconBackground="#e2e8f0"
                          statistics={[
                            { label: 'Repositórios ativos', value: 3 },
                            { label: 'Total de estrelas', value: 45 },
                            { label: 'Último commit', value: 'Ontem' }
                          ]}
                          primaryButton={{
                            text: 'Gerenciar Repositórios',
                            link: '/repositorios',
                            variant: 'grey'
                          }}
                          secondaryButton={{
                            text: 'Conectar Repositório',
                            link: '/repositorios',
                            variant: 'grey'
                          }}
                        />
                      </div>

                      <div className="col-12 col-lg-6 mx-lg-auto">
                        <ContentManagementCard
                          icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                              <line x1="12" y1="9" x2="12" y2="13"></line>
                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                          }
                          title="Avisos"
                          description="Crie e gerencie comunicados importantes"
                          iconColor="#f59e0b"
                          iconBackground="#fef3c7"
                          statistics={[
                            { label: 'Avisos publicados', value: 8 },
                            { label: 'Visualizações totais', value: '2,156' },
                            { label: 'Último aviso', value: '2 dias' }
                          ]}
                          primaryButton={{
                            text: 'Gerenciar Avisos',
                            link: '/avisos',
                            variant: 'orange'
                          }}
                          secondaryButton={{
                            text: 'Criar Novo Aviso',
                            link: '/avisos',
                            variant: 'orange'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

export default ProfilePage;

