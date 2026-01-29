
import { mount } from '@vue/test-utils';
import Checkbox from '@/components/ui/Checkbox.vue';

describe('Checkbox.vue', () => {
  it('renders label when provided', () => {
    const label = 'Test Checkbox';
    const wrapper = mount(Checkbox, {
      props: { 
        modelValue: false,
        label 
      }
    });
    expect(wrapper.text()).toContain(label);
  });

  it('updates modelValue when clicked', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false }
    });
    const input = wrapper.find('input[type="checkbox"]');
    await input.setValue(true);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
  });
});
