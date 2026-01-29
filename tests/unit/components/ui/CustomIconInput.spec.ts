
import { mount } from '@vue/test-utils';
import CustomIconInput from '@/components/ui/CustomIconInput.vue';

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('CustomIconInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(CustomIconInput, {
      props: { modelValue: '' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  // Since CustomIconInput uses CustomIconActions which emits events, 
  // we can test if events from child are re-emitted or handled.
  // But defineModel updates might be tricky to test without mounting the parent.
  // We can test if it emits update:modelValue when child emits events.

  it('emits update:modelValue on clear', async () => {
    const wrapper = mount(CustomIconInput, {
      props: { modelValue: 'some content' }
    });
    const actions = wrapper.findComponent({ name: 'CustomIconActions' });
    await actions.vm.$emit('clear');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);
  });

  it('emits error event', async () => {
    const wrapper = mount(CustomIconInput);
    const actions = wrapper.findComponent({ name: 'CustomIconActions' });
    await actions.vm.$emit('error', 'Error message');
    expect(wrapper.emitted('error')).toBeTruthy();
    expect(wrapper.emitted('error')![0]).toEqual(['Error message']);
  });
});
