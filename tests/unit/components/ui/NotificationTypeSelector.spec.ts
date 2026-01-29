
import { mount } from '@vue/test-utils';
import NotificationTypeSelector from '@/components/ui/NotificationTypeSelector.vue';
import { TYPE_OPTIONS } from '@/constants/notification';

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('NotificationTypeSelector.vue', () => {
  it('renders all type options', () => {
    const wrapper = mount(NotificationTypeSelector, {
      props: { modelValue: 'success' }
    });
    const buttons = wrapper.findAll('.type-btn');
    expect(buttons.length).toBe(TYPE_OPTIONS.length);
  });

  it('applies active class to selected type', () => {
    const wrapper = mount(NotificationTypeSelector, {
      props: { modelValue: 'error' }
    });
    const errorBtn = wrapper.find('.type-btn.error');
    expect(errorBtn.classes()).toContain('active');
  });

  it('emits update:modelValue when clicked', async () => {
    const wrapper = mount(NotificationTypeSelector, {
      props: { modelValue: 'success' }
    });
    const warningBtn = wrapper.find('.type-btn.warning');
    await warningBtn.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['warning']);
  });
});
