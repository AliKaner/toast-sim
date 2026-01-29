
import { mount } from '@vue/test-utils';
import ToastFormCard from '@/components/ui/ToastFormCard.vue';
// import { createTestingPinia } from '@pinia/testing'; // Check if we have this or need to mock manually
import { DEFAULT_CONFIG } from '@/constants/notification';

// Logic to handle missing @pinia/testing or just manual mock
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

// Mock crypto.randomUUID
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
            // Stub complex children to avoid rendering them fully if not needed for this test
            // Or keep them if we want integration-like unit test.
            // Let's stub them for now to isolate ToastFormCard logic
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
            // Card is simple wrapper?
        }
      }
    });

    expect(wrapper.exists()).toBe(true);
    // Check if sections are rendered (stubs present)
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
              Card: false // We need Card to render the header slot
          }
      }
    });

    // We need to make sure Card renders the slot 'header'
    // Looking at Card.vue usage in ToastFormCard: <template #header>...
    // The clear button is inside the header slot.
    // If Card renders the slot, we can find the button.
    
    // Let's assume Card renders slots correctly.
    const clearBtn = wrapper.find('.clear-btn');
    expect(clearBtn.exists()).toBe(true);
    
    await clearBtn.trigger('click');
    
    // clearForm modifies the prop 'form' in place using Object.assign
    // In Vue, mutating props object (if it's an object) updates the parent's object too (reference).
    // Test if form is reset.
    expect(dirtyForm.title).toBe(DEFAULT_CONFIG.title);
  });
});
