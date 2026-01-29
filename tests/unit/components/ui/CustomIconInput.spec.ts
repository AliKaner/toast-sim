
import { mount } from '@vue/test-utils';
import CustomIconInput from '@/components/ui/CustomIconInput.vue';

vi.mock('vue-i18n', () => ({
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
