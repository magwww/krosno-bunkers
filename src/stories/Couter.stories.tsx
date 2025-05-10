import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Counter from '@/components/custom/common/counter'

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  argTypes: {
    maxValue: { control: { type: 'number', min: 1 } },
    count: { control: { type: 'number', min: 1 } },
  },
}
export default meta

type Story = StoryObj<typeof Counter>

export const MaxValue10: Story = {
  args: {
    maxValue: 10,
  },
  render: (args) => {
    const [count, setCount] = useState(1)
    return <Counter {...args} count={count} setCount={setCount} />
  },
}
