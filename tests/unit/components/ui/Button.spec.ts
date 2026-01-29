
import { mount } from '@vue/test-utils';
import Button from '@/components/ui/Button.vue';

describe('Button.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click Me' }
    });
    expect(wrapper.text()).toBe('Click Me');
  });

  it('emits click event', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('renders loading spinner when loading prop is true', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    });
    expect(wrapper.findComponent({ name: 'Spinner' }).exists()).toBe(true);
  });

  it('applies variant classes', () => {
    const wrapper = mount(Button, {
      props: { variant: 'outline' }
    });
    expect(wrapper.classes()).toContain('button--outline');
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    });
    expect(wrapper.element.disabled).toBe(true);
  });
});
