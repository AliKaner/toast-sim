
import { mount } from '@vue/test-utils';
import PositionSelector from '@/components/ui/PositionSelector.vue';
import { POSITION_OPTIONS } from '@/constants/notification';

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('PositionSelector.vue', () => {
  const modelValue = 'top-right';

  it('renders all position options', () => {
    const wrapper = mount(PositionSelector, {
      props: { modelValue }
    });
    
    const buttons = wrapper.findAllComponents({ name: 'Button' });

    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons.length).toBe(POSITION_OPTIONS.length);
  });

  it('emits update:modelValue when an option is selected', async () => {
    const wrapper = mount(PositionSelector, {
      props: { modelValue }
    });
    
    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const targetOption = POSITION_OPTIONS.find((opt: { value: string }) => opt.value !== modelValue);
    const targetButton = buttons.find(b => b.props('id')?.includes(targetOption!.value));
    
    if (targetButton) {
      await targetButton.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([targetOption!.value]);
    } else {
       await buttons[0].trigger('click');
       expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    }
  });
});
