import Button from '@/components/ButtonComponent'
import '../src/tailwind.css'; // replace with the name of your tailwind css file

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'positive']
    },
    size: {
      control: 'select',
      options: ['normal', 'small']
    },
    disabled: {
      control: 'boolean'
    }
  }
}

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args }
  },
  template: '<Button v-bind="args">Click me</Button>'
})

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  size: 'normal',
  disabled: false
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary'
}

export const Positive = Template.bind({})
Positive.args = {
  type: 'positive'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}