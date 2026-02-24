interface StorageItem<T> {
  value: T
  expiresAt?: number
}

export function cleanupExpiredItems(): void {
  try {
    const now = Date.now()
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (!key) continue

      const rawItem = window.localStorage.getItem(key)
      if (!rawItem) continue

      try {
        const item = JSON.parse(rawItem) as StorageItem<unknown>
        if (item && item.expiresAt && now > item.expiresAt) {
          window.localStorage.removeItem(key)
        }
      } catch {
      }
    }
  } catch (error) {
    console.error('Error during localStorage cleanup:', error)
  }
}

export function localStorage<T = unknown>(key: string) {
  const get = (): T | null => {
    try {
      const rawItem = window.localStorage.getItem(key)
      if (!rawItem) return null

      const item = JSON.parse(rawItem) as StorageItem<T>

      if (item.expiresAt && Date.now() > item.expiresAt) {
        remove()
        return null
      }

      return item && typeof item === 'object' && 'value' in item
        ? item.value
        : (item as unknown as T)
    } catch (error) {
      console.error(`Error getting item from localStorage [${key}]:`, error)
      return null
    }
  }

  const set = (value: T, days?: number): void => {
    try {
      const storageItem: StorageItem<T> = { value }
      if (days !== undefined) {
        storageItem.expiresAt = Date.now() + days * 86400000
      }
      window.localStorage.setItem(key, JSON.stringify(storageItem))
    } catch (error) {
      console.error(`Error setting item in localStorage [${key}]:`, error)
    }
  }

  const remove = (): void => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item from localStorage [${key}]:`, error)
    }
  }

  const clear = (): void => {
    try {
      window.localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  }

  const exists = (): boolean => {
    return get() !== null
  }

  const update = (updater: (currentValue: T | null) => T, days?: number): void => {
    const currentValue = get()
    set(updater(currentValue), days)
  }

  return {
    get,
    set,
    remove,
    clear,
    exists,
    update
  }
}
