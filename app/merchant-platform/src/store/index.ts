import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 用户信息，使用localStorage持久化存储
export const userAtom = atomWithStorage('user', {
  id: '',
  name: '',
  avatar: '',
  token: '',
  isLogin: false,
});

// 应用配置
export const themeAtom = atomWithStorage('theme', 'light');
export const sidebarCollapsedAtom = atomWithStorage('sidebarCollapsed', false);

// 全局通知状态
export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  content: string;
  timestamp: number;
}

export const notificationsAtom = atom<Notification[]>([]);

// 添加通知
export const addNotificationAtom = atom(
  null,
  (get, set, notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now();
    const notifications = [...get(notificationsAtom)];
    
    // 添加新通知并保持最新的10条
    set(notificationsAtom, [
      { id, timestamp, ...notification },
      ...notifications,
    ].slice(0, 10));
    
    // 5秒后自动移除
    setTimeout(() => {
      set(notificationsAtom, get(notificationsAtom).filter(item => item.id !== id));
    }, 5000);
  }
);

// 删除通知
export const removeNotificationAtom = atom(
  null,
  (get, set, id: string) => {
    set(
      notificationsAtom,
      get(notificationsAtom).filter(item => item.id !== id)
    );
  }
);

// 全局加载状态
export const globalLoadingAtom = atom(false);

// 全局计数器示例 - 可在任何组件中使用
export const counterAtom = atom(0);
export const incrementAtom = atom(
  null,
  (get, set) => set(counterAtom, get(counterAtom) + 1)
);
export const decrementAtom = atom(
  null,
  (get, set) => set(counterAtom, get(counterAtom) - 1)
); 