import type { Meta, StoryObj } from '@storybook/vue3';
import CodeExport from './CodeExport.vue';

const meta = {
  title: 'UI/CodeExport',
  component: CodeExport,
  tags: ['autodocs'],
  argTypes: {
    'onCopy': { action: 'copy' },
  },
  args: {
    highlightedCode: '<span class="hljs-keyword">const</span> foo = <span class="hljs-string">"bar"</span>;',
  },
} satisfies Meta<typeof CodeExport>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongCode: Story = {
  args: {
    highlightedCode: `<span class="hljs-keyword">function</span> <span class="hljs-title function_">hello</span>() {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"Hello World!"</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
<span class="hljs-comment">// This is a long code block example</span>
<span class="hljs-keyword">const</span> x = <span class="hljs-number">10</span>;
<span class="hljs-keyword">const</span> y = <span class="hljs-number">20</span>;
<span class="hljs-keyword">const</span> sum = x + y;`,
  },
};
