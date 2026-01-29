
import { mount } from '@vue/test-utils';
import Input from '@/components/ui/Input.vue';

describe('Input.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Input, { props: { modelValue: '' } });
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
  });

  it('renders label when provided', () => {
    const label = 'Test Label';
    const wrapper = mount(Input, {
      props: { label, modelValue: '' }
    });
    expect(wrapper.text()).toContain(label);
  });

  it('updates modelValue on input', async () => {
    const wrapper = mount(Input);
    const input = wrapper.find('input');
    await input.setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value']);
  });

  it('applies disabled state', () => {
    const wrapper = mount(Input, {
      props: { disabled: true, modelValue: '' }
    });
    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(true);
  });

  it('applies error styling', () => {
    const wrapper = mount(Input, {
      props: { error: 'Error', modelValue: '' }
    });
    const input = wrapper.find('input');
    expect(input.classes()).toContain('base-input--error');
  });
});
