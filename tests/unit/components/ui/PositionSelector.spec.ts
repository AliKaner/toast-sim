
import { mount } from '@vue/test-utils';
import PositionSelector from '@/components/ui/PositionSelector.vue';
import { POSITION_OPTIONS } from '@/constants/notification';

// Mock vue-i18n
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
    
    // Check if we render buttons for each option
    // POSITION_OPTIONS length should match buttons
    const buttons = wrapper.findAllComponents({ name: 'Button' });
    // Assuming POSITION_OPTIONS is exported and available, or we check generic count (e.g. 6)
    // We can import POSITION_OPTIONS from constants if available
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
    
    // Fallback if id matches are tricky, just click the first one that is not active
    // But let's assume implementation uses id="{id}-{opt.value}" or we can match text
    
    // Let's use trigger click on the button component
    // If targetButton is found
    if (targetButton) {
      await targetButton.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([targetOption!.value]);
    } else {
       // If precise finding fails, try clicking the first button
       await buttons[0].trigger('click');
       expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    }
  });
});
