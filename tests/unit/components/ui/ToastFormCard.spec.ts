
import { mount } from '@vue/test-utils';
import ToastFormCard from '@/components/ui/ToastFormCard.vue';
import { DEFAULT_CONFIG } from '@/constants/notification';

jest.mock('@/composables/useToastStore', () => ({
  useToastStore: () => ({
    addNotification: jest.fn(),
  }),
}));

jest.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

global.crypto.randomUUID = jest.fn(() => '79685606-d760-466d-888e-647d77b21843' as any);

describe('ToastFormCard.vue', () => {
  const mockForm = { 
    ...DEFAULT_CONFIG,
    isPersistent: false,
    presetName: '',
  };

  it('renders correctly', () => {
    const wrapper = mount(ToastFormCard, {
      props: {
        form: mockForm
      },
      global: {
        stubs: {
        
            ColorPicker: true,
            DurationSlider: true,
            NotificationTypeSelector: true,
            CustomIconInput: true,
            OptionsGroup: true,
            FormSection: true,
            Segment: true,
            PositionSelector: true,
            TextArea: true,
            Input: true,
        }
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'NotificationTypeSelector' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TextArea' }).exists()).toBe(true);
  });

  it('shows clear button when form is dirty', async () => {
    const dirtyForm = { 
      ...DEFAULT_CONFIG, 
      title: 'Changed Title',
      isPersistent: false,
      presetName: '',
    };
    const wrapper = mount(ToastFormCard, {
      props: {
        form: dirtyForm
      },
      global: {
          stubs: {
              Card: false
          }
      }
    });
    const clearBtn = wrapper.find('.clear-btn');
    expect(clearBtn.exists()).toBe(true);
    
    await clearBtn.trigger('click');
    expect(dirtyForm.title).toBe(DEFAULT_CONFIG.title);
  });
});
