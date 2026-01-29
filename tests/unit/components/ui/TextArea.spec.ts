
import { mount } from '@vue/test-utils';
import TextArea from '@/components/ui/TextArea.vue';

describe('TextArea.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(TextArea);
    expect(wrapper.find('textarea').exists()).toBe(true);
    // expecting wrapper to NOT have base-textarea as it is on the inner textarea 
    // Looking at TextArea.vue: <FormItemWrapper ...> <textarea :class="textareaClasses" ... />
    // The classes are on the textarea element.
    const textarea = wrapper.find('textarea');
    expect(textarea.classes()).toContain('base-textarea');
  });

  it('renders label when provided', () => {
    const label = 'Test Label';
    const wrapper = mount(TextArea, {
      props: { label }
    });
    // FormItemWrapper renders the label. We assume FormItemWrapper works or we check for text.
    expect(wrapper.text()).toContain(label);
  });

  it('renders placeholder when provided', () => {
    const placeholder = 'Enter text here';
    const wrapper = mount(TextArea, {
      props: { placeholder }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe(placeholder);
  });

  it('updates modelValue on input', async () => {
    const wrapper = mount(TextArea, {
      props: { modelValue: '' }
    });
    const textarea = wrapper.find('textarea');
    await textarea.setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value']);
  });

  it('applies error styling and aria attributes when error is provided', () => {
    const error = 'Error message';
    const wrapper = mount(TextArea, {
      props: { error }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.classes()).toContain('base-textarea--error');
    expect(textarea.attributes('aria-invalid')).toBe('true');
  }); // Note: FormItemWrapper renders the error text.

  it('applies disabled state', () => {
    const wrapper = mount(TextArea, {
      props: { disabled: true }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.element.disabled).toBe(true);
    expect(textarea.classes()).toContain('base-textarea--disabled');
  });

  it('applies readonly state', () => {
    const wrapper = mount(TextArea, {
      props: { readonly: true }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.element.readOnly).toBe(true);
  });
});
