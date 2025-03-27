import { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space, Typography, Notification } from '@douyinfe/semi-ui';
import { IconSearch, IconRefresh } from '@douyinfe/semi-icons';
import { useRequest } from 'ahooks';
import { atom, useAtom, useAtomValue } from 'jotai';
import { getMerchantList, Merchant } from '../api/merchant';
import StatusTag from '@components/StatusTag';
import JotaiCounter from '../components/JotaiCounter';

const { Title } = Typography;

const statusOptions = [
  { label: '全部', value: '' },
  { label: '活跃', value: 'active' },
  { label: '非活跃', value: 'inactive' },
  { label: '待审核', value: 'pending' },
];

const statusMap = {
  active: { status: 'success', text: '活跃' },
  inactive: { status: 'default', text: '非活跃' },
  pending: { status: 'warning', text: '待审核' },
} as const;

// 定义全局状态原子（atoms）
const keywordAtom = atom<string>('');
const statusAtom = atom<string>('');
const paginationAtom = atom({
  currentPage: 1,
  pageSize: 10,
});

// 定义派生atom，用于组合查询条件
const queryParamsAtom = atom((get) => ({
  page: get(paginationAtom).currentPage,
  pageSize: get(paginationAtom).pageSize,
  status: get(statusAtom),
  keyword: get(keywordAtom),
}));

// 定义统计数据原子
const merchantCountAtom = atom<number>(0);

const MerchantList = () => {
  // 使用jotai管理状态
  const [keyword, setKeyword] = useAtom(keywordAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const queryParams = useAtomValue(queryParamsAtom);
  const [merchantCount, setMerchantCount] = useAtom(merchantCountAtom);
  
  const { data, loading, run: fetchData, error } = useRequest(
    () => getMerchantList(queryParams),
    {
      manual: true,
      onSuccess: (result) => {
        // 更新统计数据
        setMerchantCount(result.total);
      },
      onError: (err) => {
        Notification.error({
          title: '获取数据失败',
          content: err.message || '请稍后重试',
          duration: 3,
        });
      },
    }
  );
  
  useEffect(() => {
    fetchData();
  }, [pagination.currentPage, pagination.pageSize, fetchData]);
  
  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchData();
  };
  
  const handleReset = () => {
    setKeyword('');
    setStatus('');
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchData();
  };
  
  const columns = [
    {
      title: '商户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: keyof typeof statusMap) => (
        <StatusTag 
          status={statusMap[text].status} 
          text={statusMap[text].text} 
        />
      ),
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Merchant) => (
        <Space>
          <Button theme="borderless" type="primary" size="small">
            详情
          </Button>
          <Button theme="borderless" type="tertiary" size="small">
            编辑
          </Button>
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <Title heading={3} style={{ marginBottom: '24px' }}>商户管理</Title>
      
      {/* Jotai计数器示例 - 与Dashboard页面共享状态 */}
      <JotaiCounter />
      
      {/* 显示jotai状态统计信息 */}
      <div style={{ marginBottom: '16px', backgroundColor: 'var(--semi-color-primary-light-default)', padding: '12px', borderRadius: '4px' }}>
        <Typography.Text strong>Jotai状态示例：</Typography.Text>
        <div>当前商户总数: {merchantCount}</div>
        <div>当前搜索关键词: {keyword || '无'}</div>
        <div>当前状态筛选: {statusMap[status as keyof typeof statusMap]?.text || '全部'}</div>
        <div>当前页码: {pagination.currentPage}</div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Input
            prefix={<IconSearch />}
            placeholder="搜索商户名称"
            value={keyword}
            onChange={(value: string) => setKeyword(value)}
            onEnterPress={handleSearch}
            style={{ width: 200 }}
          />
          <Select
            placeholder="商户状态"
            value={status}
            onChange={(value) => {
              if (typeof value === 'string') {
                setStatus(value);
              }
            }}
            style={{ width: 150 }}
            optionList={statusOptions}
          />
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
          <Button icon={<IconRefresh />} onClick={handleReset}>
            重置
          </Button>
        </Space>
      </div>
      
      <Table
        columns={columns}
        dataSource={data?.list || []}
        pagination={{
          currentPage: pagination.currentPage,
          pageSize: pagination.pageSize,
          total: data?.total || 0,
          onPageChange: (page) => {
            setPagination((prev) => ({ ...prev, currentPage: page }));
          },
          onPageSizeChange: (size) => {
            setPagination((prev) => ({ ...prev, currentPage: 1, pageSize: size }));
          },
        }}
        loading={loading}
        empty="暂无数据"
      />
    </div>
  );
};

export default MerchantList; 