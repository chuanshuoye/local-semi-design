import { Routes, Route } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MerchantList from './pages/MerchantList';
import LoginAndRegisty from './pages/LoginAndRegisty';
import './App.css';

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/merchants" element={<MerchantList />} />
          {/* 其他路由可在此处添加 */}
        </Route>
        <Route path="/login" element={<LoginAndRegisty />} />
      </Routes>
    </Layout>
  );
}

export default App; 