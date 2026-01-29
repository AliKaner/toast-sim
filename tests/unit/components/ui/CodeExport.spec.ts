
import { mount } from '@vue/test-utils';
import CodeExport from '@/components/ui/CodeExport.vue';

describe('CodeExport.vue', () => {
  it('renders highlighted code', () => {
    const code = '<span class="test">code</span>';
    const wrapper = mount(CodeExport, {
      props: { highlightedCode: code }
    });
    const codeBlock = wrapper.find('code');
    expect(codeBlock.element.innerHTML).toBe(code);
  });

  it('emits copy event', async () => {
    const wrapper = mount(CodeExport, {
      props: { highlightedCode: '' }
    });
    const button = wrapper.find('.copy-btn');
    await button.trigger('click');
    expect(wrapper.emitted('copy')).toBeTruthy();
  });
});
