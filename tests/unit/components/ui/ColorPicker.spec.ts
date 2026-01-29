
import { mount } from '@vue/test-utils';
import ColorPicker from '@/components/ui/ColorPicker.vue';

describe('ColorPicker.vue', () => {
  it('renders valid hex color correctly', () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: '#ff0000' }
    });
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).value).toBe('ff0000');
  });

  it('handles input and updates modelValue with hash', async () => {
    const wrapper = mount(ColorPicker, {
      props: { modelValue: '#ffffff' }
    });
    const input = wrapper.find('input');
    await input.setValue('00ff00');
    
    // Check if event is emitted with hash
    // The component emits update:modelValue (via defineModel in Vue 3.4+)
    // but test-utils might handle defineModel diffrently depending on version.
    // If it uses standard 'update:modelValue' emission:
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['#00ff00']);
  });
});
