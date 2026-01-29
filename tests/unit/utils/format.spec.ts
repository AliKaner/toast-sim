
import { formatDuration, formatPosition } from '@/utils/format';

describe('utils/format', () => {
  describe('formatDuration', () => {
    it('returns "Persistent" when duration is 0', () => {
      expect(formatDuration(0)).toBe('Persistent');
    });

    it('formats milliseconds to seconds string', () => {
      expect(formatDuration(3000)).toBe('3s');
      expect(formatDuration(500)).toBe('0.5s');
    });
  });

  describe('formatPosition', () => {
    it('formats position string correctly', () => {
      expect(formatPosition('top-right')).toBe('Top Right');
      expect(formatPosition('bottom-left')).toBe('Bottom Left');
      expect(formatPosition('top-center')).toBe('Top Center');
    });
  });
});
