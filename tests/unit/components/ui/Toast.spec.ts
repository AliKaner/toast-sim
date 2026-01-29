
import { mount } from '@vue/test-utils';
import Toast from '@/components/ui/Toast.vue';

describe('Toast.vue', () => {
  const mockNotification = {
    id: '1',
    type: 'success' as const,
    title: 'Success Title',
    message: 'Success Message',
    duration: 3000,
    position: 'top-right' as const,
    backgroundColor: '#5bca4d',
    textColor: '#fff',
    showIcon: true,
    showCloseButton: true,
    animation: 'slide' as const,
    createdAt: 12345
  };

  it('renders notification content', () => {
    const wrapper = mount(Toast, {
      props: { notification: mockNotification }
    });
    expect(wrapper.text()).toContain('Success Title');
    expect(wrapper.text()).toContain('Success Message');
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(Toast, {
      props: { notification: mockNotification }
    });
    const closeBtn = wrapper.find('.toast-close');
    await closeBtn.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(wrapper.emitted('close')![0]).toEqual(['1']);
  });

  it('does not render close button if showCloseButton is false', () => {
    const wrapper = mount(Toast, {
      props: { 
        notification: { ...mockNotification, showCloseButton: false } 
      }
    });
    expect(wrapper.find('.toast-close').exists()).toBe(false);
  });
  

  it('renders progress bar for non-persistent toast', () => {
      const wrapper = mount(Toast, {
      props: { notification: mockNotification }
    });
    expect(wrapper.find('.toast-progress').exists()).toBe(true);
  });

  it('does not render progress bar for persistent toast', () => {
     const wrapper = mount(Toast, {
      props: { 
          notification: { ...mockNotification, duration: 0 } 
      }
    });
    expect(wrapper.find('.toast-progress').exists()).toBe(false);
  });
});
