export function storage<T = unknown>(key: string) {
  const get = (): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage [${key}]:`, error);
      return null;
    }
  };

  const set = (value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage [${key}]:`, error);
    }
  };

  const remove = (): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from localStorage [${key}]:`, error);
    }
  };

  const clear = (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  const exists = (): boolean => {
    return localStorage.getItem(key) !== null;
  };

  const update = (updater: (currentValue: T | null) => T): void => {
    const currentValue = get();
    set(updater(currentValue));
  };

  return {
    get,
    set,
    remove,
    clear,
    exists,
    update,
  };
}
