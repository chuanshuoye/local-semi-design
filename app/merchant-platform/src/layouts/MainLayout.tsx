import { Nav } from '@douyinfe/semi-ui';
import { IconIntro, IconCheckbox, IconToast, IconCalendar } from '@douyinfe/semi-icons-lab';
import { IconHome, IconSetting, IconShoppingBag, IconSemiLogo } from '@douyinfe/semi-icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setSelectedKeys(['dashboard']);
    } else if (path === '/merchants') {
      setSelectedKeys(['merchants']);
    } else if (path === '/settings') {
      setSelectedKeys(['settings']);
    }
  }, [location]);

  return (
    <div className={styles.frame}>
      <Nav
        isCollapsed={true}
        bodyStyle={{ height: '100%' }}
        mode="vertical"
        header={{
          logo: (
            <div className={styles.navigationHeaderLogo}>
              <IconSemiLogo className={styles.semiIconsSemiLogo} />
            </div>
          ),
        }}
        className={styles.navVerticalCollapse}
      >
        <Nav.Item
          itemKey="一级导航选项"
          text="一级导航选项"
          icon={<IconIntro className={styles.iconIntro} />}
          className={styles.navItem}
        />
        <Nav.Item
          itemKey="1-1"
          text="一级导航选项"
          icon={<IconCheckbox className={styles.iconIntro} />}
          className={styles.navItem}
        />
        <Nav.Item
          itemKey="1-2"
          text="一级导航选项"
          icon={<IconToast className={styles.iconIntro} />}
          className={styles.navItem}
        />
        <Nav.Item
          itemKey="1-3"
          text="一级导航选项"
          icon={<IconCalendar className={styles.iconIntro} />}
          className={styles.navItem}
        />
      </Nav>
      <div className={styles.main}>
        <Nav
          selectedKeys={selectedKeys}
          style={{ height: '100%' }}
          footer={{ collapseButton: true }}
          items={[
            { itemKey: 'dashboard', text: '首页', icon: <IconHome />, onClick: () => navigate('/') },
            { itemKey: 'merchants', text: '商户管理', icon: <IconShoppingBag />, onClick: () => navigate('/merchants') },
            { itemKey: 'settings', text: '设置', icon: <IconSetting />, onClick: () => navigate('/settings') }
          ]}
        />
        <div className={styles.content}>
          <div className={styles.yourContentHere}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;


