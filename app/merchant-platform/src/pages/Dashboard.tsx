import { Card, Row, Col, Typography } from '@douyinfe/semi-ui';

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title heading={2} style={{ marginBottom: '24px' }}>欢迎使用商户管理平台</Title>
      
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            title="今日访问量"
            headerStyle={{ backgroundColor: 'rgba(var(--semi-blue-4), 0.1)' }}
          >
            <div style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold' }}>1024</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="商户总数"
            headerStyle={{ backgroundColor: 'rgba(var(--semi-green-4), 0.1)' }}
          >
            <div style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold' }}>256</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="待处理工单"
            headerStyle={{ backgroundColor: 'rgba(var(--semi-orange-4), 0.1)' }}
          >
            <div style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold' }}>8</div>
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: '24px' }}>
        <Card>
          <Title heading={4}>系统公告</Title>
          <Paragraph>
            欢迎使用商户管理平台，这是一个基于vite + React + semi-ui + jotai + ahooks + typescript的管理后台项目脚手架。
          </Paragraph>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 