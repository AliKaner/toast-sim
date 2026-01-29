
import { mount } from '@vue/test-utils';
import DurationSlider from '@/components/ui/DurationSlider.vue';

describe('DurationSlider.vue', () => {
  it('renders slider', () => {
    const wrapper = mount(DurationSlider, {
      props: { modelValue: 5 }
    });
    expect(wrapper.findComponent({ name: 'Slider' }).exists()).toBe(true);
  });

  it('renders persistent checkbox if checkboxLabel is provided', () => {
    const wrapper = mount(DurationSlider, {
      props: { 
        modelValue: 5,
        checkboxLabel: 'Persistent'
      }
    });
    expect(wrapper.findComponent({ name: 'Checkbox' }).exists()).toBe(true);
  });

  it('does not render checkbox if checkboxLabel is missing', () => {
      const wrapper = mount(DurationSlider, {
      props: { modelValue: 5 }
    });
    expect(wrapper.findComponent({ name: 'Checkbox' }).exists()).toBe(false);
  });

  it('emits update:modelValue', async () => {
    const wrapper = mount(DurationSlider, {
      props: { modelValue: 5 }
    });
    const slider = wrapper.findComponent({ name: 'Slider' });
    await slider.vm.$emit('update:modelValue', 10);
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([10]);
  });

  it('emits update:checkboxValue', async () => {
    const wrapper = mount(DurationSlider, {
      props: { 
        modelValue: 5,
        checkboxLabel: 'Persistent',
        checkboxValue: false
      }
    });
    const checkbox = wrapper.findComponent({ name: 'Checkbox' });
    await checkbox.vm.$emit('update:modelValue', true);
    expect(wrapper.emitted('update:checkboxValue')).toBeTruthy();
    expect(wrapper.emitted('update:checkboxValue')![0]).toEqual([true]);
  });
});
