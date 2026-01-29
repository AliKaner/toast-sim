
import { mount } from '@vue/test-utils';
import PresetCard from '@/components/ui/PresetCard.vue';

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe('PresetCard.vue', () => {
  const mockPreset = {
    id: '1',
    createdAt: new Date().toISOString(), // Added missing property
    name: 'Test Preset',
    config: {
      type: 'success' as const,
      title: 'Success',
      message: 'Hello',
      duration: 3000,
      position: 'top-right' as const,
      backgroundColor: '#5bca4d',
      textColor: '#fff',
      showIcon: true,
      showCloseButton: true,
      animation: 'slide' as const,
    },
  };

  it('renders preset information correctly', () => {
    const wrapper = mount(PresetCard, {
      props: {
        preset: mockPreset,
      },
    });

    expect(wrapper.text()).toContain('Test Preset');
    expect(wrapper.text()).toContain('3s'); // formatDuration(3000) -> 3s (assuming implementation)
    // Check type indicator color
    const indicator = wrapper.find('.type-indicator');
    // We might need to check style or just existence
    expect(indicator.exists()).toBe(true);
  });

  it('emits load event when load button is clicked', async () => {
    const wrapper = mount(PresetCard, {
      props: {
        preset: mockPreset,
      },
    });

    // Find button with text 'preset_actions.load' (mocked t returns key)
    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const loadButton = buttons.find(b => b.props('text') === 'preset_actions.load');
    
    await loadButton?.trigger('click');
    expect(wrapper.emitted('load')).toBeTruthy();
    expect(wrapper.emitted('load')![0]).toEqual([mockPreset]);
  });

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(PresetCard, {
      props: {
        preset: mockPreset,
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const deleteButton = buttons.find(b => b.props('text') === 'preset_actions.delete');
    
    await deleteButton?.trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')![0]).toEqual([mockPreset]);
  });
});
