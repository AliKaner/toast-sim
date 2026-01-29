
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from '@/stores/useToastStore';
import { DEFAULT_CONFIG } from '@/constants/notification';

describe('useToastStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const mockConfig = {
    ...DEFAULT_CONFIG,
    id: 'test-id',
    title: 'Test Notification',
    message: 'Test Message',
    type: 'success' as const,
    duration: 3000,
  };

  it('initializes with empty notifications', () => {
    const store = useToastStore();
    expect(store.notifications).toEqual([]);
  });

  it('adds a notification', () => {
    const store = useToastStore();
    store.addNotification(mockConfig);
    expect(store.notifications.length).toBe(1);
    expect(store.notifications[0].id).toBe('test-id');
  });

  it('removes a notification by id', () => {
    const store = useToastStore();
    store.addNotification(mockConfig);
    store.removeNotification('test-id');
    expect(store.notifications.length).toBe(0);
  });

  it('clears all notifications', () => {
    const store = useToastStore();
    store.addNotification({ ...mockConfig, id: '1' });
    store.addNotification({ ...mockConfig, id: '2' });
    store.clearAll();
    expect(store.notifications.length).toBe(0);
  });
  
  it('clears notifications by position', () => {
    const store = useToastStore();
    store.addNotification({ ...mockConfig, id: '1', position: 'top-right' });
    store.addNotification({ ...mockConfig, id: '2', position: 'bottom-left' });
    
    store.clearByPosition('top-right');
    expect(store.notifications.length).toBe(1);
    expect(store.notifications[0].id).toBe('2');
  });

  it('groups notifications by position', () => {
    const store = useToastStore();
    store.addNotification({ ...mockConfig, id: '1', position: 'top-right' });
    store.addNotification({ ...mockConfig, id: '2', position: 'top-right' });
    store.addNotification({ ...mockConfig, id: '3', position: 'bottom-left' });

    expect(store.notificationsByPosition['top-right'].length).toBe(2);
    expect(store.notificationsByPosition['bottom-left'].length).toBe(1);
    expect(store.notificationsByPosition['top-center'].length).toBe(0);
  });

  it('removes notification automatically after duration', () => {
    vi.useFakeTimers();
    const store = useToastStore();
    store.addNotification({ ...mockConfig, duration: 1000 });
    
    expect(store.notifications.length).toBe(1);
    
    vi.advanceTimersByTime(1000);
    
    expect(store.notifications.length).toBe(0);
    vi.useRealTimers();
  });
});
