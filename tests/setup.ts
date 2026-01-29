import { vi } from 'vitest'

// Global mocks
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => '79685606-d760-466d-888e-647d77b21843')
  }
})

