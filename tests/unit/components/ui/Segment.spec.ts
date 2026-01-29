
import { mount } from '@vue/test-utils';
import Segment from '@/components/ui/Segment.vue';

describe('Segment.vue', () => {
  const options = [
    { text: 'Option 1', value: 'opt1' },
    { text: 'Option 2', value: 'opt2' }
  ];

  it('renders all options', () => {
    const wrapper = mount(Segment, {
      props: { 
        options,
        modelValue: 'opt1'
      }
    });
    const buttons = wrapper.findAll('.segment-option');
    expect(buttons.length).toBe(options.length);
    expect(buttons[0].text()).toBe(options[0].text);
  });

  it('applies active class to selected option', () => {
    const wrapper = mount(Segment, {
      props: { 
        options,
        modelValue: 'opt1'
      }
    });
    const buttons = wrapper.findAll('.segment-option');
    expect(buttons[0].classes()).toContain('segment-option--active');
    expect(buttons[1].classes()).not.toContain('segment-option--active');
  });

  it('emits update event when option is clicked', async () => {
    const wrapper = mount(Segment, {
      props: { 
        options,
        modelValue: 'opt1'
      }
    });
    const buttons = wrapper.findAll('.segment-option');
    await buttons[1].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['opt2']);
  });
});
