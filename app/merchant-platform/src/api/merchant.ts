import request from '@local/request';
import { mockGetMerchantList } from './mock';

// 商户类型接口
export interface Merchant {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  contactPerson: string;
  contactPhone: string;
  address: string;
}

// 判断是否为开发环境
const isDev = import.meta.env.DEV;

// 获取商户列表
export const getMerchantList = (params?: { 
  page?: number; 
  pageSize?: number; 
  status?: string;
  keyword?: string;
}) => {
  // 开发环境使用模拟数据
  if (isDev) {
    return Promise.resolve(mockGetMerchantList(params || {}));
  }
  
  // 生产环境使用真实API
  return request.get<{
    list: Merchant[];
    total: number;
  }>('/merchant/list', params);
};

// 获取商户详情
export const getMerchantDetail = (id: string) => {
  // 开发环境使用模拟数据
  if (isDev) {
    return Promise.resolve(
      mockGetMerchantList({}).list.find(item => item.id === id) || null
    );
  }

  return request.get<Merchant>(`/merchant/detail/${id}`);
};

// 创建商户
export const createMerchant = (data: Omit<Merchant, 'id' | 'createdAt'>) => {
  // 开发环境简单返回成功
  if (isDev) {
    return Promise.resolve({
      id: `M${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...data
    });
  }

  return request.post<Merchant>('/merchant/create', data);
};

// 更新商户
export const updateMerchant = (id: string, data: Partial<Omit<Merchant, 'id' | 'createdAt'>>) => {
  // 开发环境简单返回成功
  if (isDev) {
    return Promise.resolve({
      id,
      createdAt: new Date().toISOString().split('T')[0],
      ...data
    } as Merchant);
  }
  
  return request.put<Merchant>(`/merchant/update/${id}`, data);
};

// 删除商户
export const deleteMerchant = (id: string) => {
  // 开发环境简单返回成功
  if (isDev) {
    return Promise.resolve({ success: true });
  }
  
  return request.delete<{ success: boolean }>(`/merchant/delete/${id}`);
}; 