import { useAtom } from 'jotai';
import { Button, Card, Space, Typography } from '@douyinfe/semi-ui';
import { IconPlus, IconMinus } from '@douyinfe/semi-icons';
import { counterAtom, incrementAtom, decrementAtom } from '../store';

const JotaiCounter = () => {
  const [count] = useAtom(counterAtom);
  const [, increment] = useAtom(incrementAtom);
  const [, decrement] = useAtom(decrementAtom);

  return (
    <Card
      title="Jotai 计数器示例"
      headerStyle={{ backgroundColor: 'var(--semi-color-primary-light-default)' }}
      style={{ marginBottom: '16px' }}
    >
      <div style={{ padding: '12px', textAlign: 'center' }}>
        <Typography.Title heading={2} style={{ margin: '0 0 16px 0' }}>
          {count}
        </Typography.Title>
        <Space>
          <Button 
            icon={<IconMinus />} 
            onClick={decrement} 
            type="secondary"
            theme="solid"
          >
            减少
          </Button>
          <Button 
            icon={<IconPlus />} 
            onClick={increment}
            type="primary"
            theme="solid"
          >
            增加
          </Button>
        </Space>
        <Typography.Text style={{ display: 'block', marginTop: '16px' }}>
          这是一个全局状态示例，在任何页面操作计数器，状态都会保持同步。
        </Typography.Text>
      </div>
    </Card>
  );
};

export default JotaiCounter; 