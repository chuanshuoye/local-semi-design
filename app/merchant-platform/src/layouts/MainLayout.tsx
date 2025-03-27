import { Layout, Nav } from '@douyinfe/semi-ui';
import { IconHome, IconSetting, IconShoppingBag } from '@douyinfe/semi-icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Header, Sider, Content } = Layout;

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
    <Layout>
      <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>商户管理平台</div>
        </div>
      </Header>
      <Layout>
        <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
          <Nav
            selectedKeys={selectedKeys}
            style={{ height: '100%' }}
            items={[
              { itemKey: 'dashboard', text: '首页', icon: <IconHome />, onClick: () => navigate('/') },
              { itemKey: 'merchants', text: '商户管理', icon: <IconShoppingBag />, onClick: () => navigate('/merchants') },
              { itemKey: 'settings', text: '设置', icon: <IconSetting />, onClick: () => navigate('/settings') }
            ]}
          />
        </Sider>
        <Content style={{ padding: '24px', backgroundColor: 'var(--semi-color-bg-0)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 