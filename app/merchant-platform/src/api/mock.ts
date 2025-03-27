import { Merchant } from './merchant';

// 生成随机电话号码
const generatePhone = () => {
  return `1${Math.floor(Math.random() * 9) + 1}${Array(9).fill(0).map(() => Math.floor(Math.random() * 10)).join('')}`;
};

// 生成随机日期
const generateDate = () => {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().split('T')[0];
};

// 生成随机状态
const generateStatus = (): Merchant['status'] => {
  const statuses: Merchant['status'][] = ['active', 'inactive', 'pending'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// 生成随机商户数据
export const generateMerchants = (count: number = 50): Merchant[] => {
  return Array(count).fill(0).map((_, index) => ({
    id: `M${String(index + 1).padStart(5, '0')}`,
    name: `商户${index + 1}`,
    status: generateStatus(),
    createdAt: generateDate(),
    contactPerson: `联系人${index + 1}`,
    contactPhone: generatePhone(),
    address: `北京市朝阳区XX路${index + 1}号`,
  }));
};

// 模拟商户数据
export const mockMerchants = generateMerchants();

// 模拟获取商户列表
export const mockGetMerchantList = (params: {
  page?: number;
  pageSize?: number;
  status?: string;
  keyword?: string;
}) => {
  const { page = 1, pageSize = 10, status, keyword } = params;

  let filteredData = [...mockMerchants];

  // 状态筛选
  if (status) {
    filteredData = filteredData.filter(item => item.status === status);
  }

  // 关键词搜索
  if (keyword) {
    filteredData = filteredData.filter(item => 
      item.name.includes(keyword) || 
      item.contactPerson.includes(keyword) ||
      item.address.includes(keyword)
    );
  }

  // 计算总数
  const total = filteredData.length;

  // 分页
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filteredData.slice(start, end);

  return {
    list,
    total,
  };
}; 