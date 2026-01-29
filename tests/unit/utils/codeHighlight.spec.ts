
import { generateNotificationCode, highlightCode } from '@/utils/codeHighlight';

describe('utils/codeHighlight', () => {
  describe('generateNotificationCode', () => {
    it('generates correct code string from config', () => {
      const config = {
        type: 'success',
        title: 'Title',
        message: 'Message',
        duration: 3000,
        position: 'top-right',
        backgroundColor: '#fff',
        textColor: '#000',
        showIcon: true,
        showCloseButton: true,
        animation: 'slide',
        customIcon: ''
      };

      const expected = "const notification = { type: 'success', title: 'Title', message: 'Message', duration: 3000, position: 'top-right', backgroundColor: '#fff', textColor: '#000', showIcon: true, showCloseButton: true, animation: 'slide', customIcon: '' };";
      expect(generateNotificationCode(config)).toBe(expected);
    });

     it('handes custom icon', () => {
      const config = {
        type: 'success',
        title: 'Title',
        message: 'Message',
        duration: 3000,
        position: 'top-right',
        backgroundColor: '#fff',
        textColor: '#000',
        showIcon: true,
        showCloseButton: true,
        animation: 'slide',
        customIcon: '<svg></svg>'
      };

      const expected = "const notification = { type: 'success', title: 'Title', message: 'Message', duration: 3000, position: 'top-right', backgroundColor: '#fff', textColor: '#000', showIcon: true, showCloseButton: true, animation: 'slide', customIcon: '<svg></svg>' };";
      expect(generateNotificationCode(config)).toBe(expected);
    });
  });

  describe('highlightCode', () => {
     it('returns highlighted html string', () => {
         const code = "const a = 1;";
         const result = highlightCode(code);
         expect(result).not.toBe(code);
         expect(result).toContain('<span class="hljs-');
     });
  });
});
