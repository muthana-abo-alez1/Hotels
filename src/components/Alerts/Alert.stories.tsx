import React from 'react';
import Alert, { AlertOptions } from './Alert';
import { Meta, StoryFn } from '@storybook/react';
import { AlertColor } from '@mui/material';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'text' }, 
      description: 'The type of alert message to display.',
      table: {
        type: { summary: 'success | error | info | warning' },
        defaultValue: { summary: 'success' },
      },
    },
    title: {
      control: { type: 'text' },  
      description: 'The title of the alert message.',
    },
    text: {
      control: { type: 'text' },  
      description: 'The content of the alert message.',
    },
  },
  args: {
    title: 'Success',
    type: 'success' as AlertColor,  
    text: 'Your operation was successful!',
  },
};

export default meta;

const Template: StoryFn<AlertOptions> = (args) => <Alert {...args} />;

export const SuccessAlert = Template.bind({});
SuccessAlert.args = {
  title: 'Success',
  type: 'success',  
  text: 'Your operation was successful!',
};

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  title: 'Error',
  type: 'error',
  text: 'Something went wrong. Please try again.',
};

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  title: 'Info',
  type: 'info',
  text: 'This is an informational message.',
};

export const WarningAlert = Template.bind({});
WarningAlert.args = {
  title: 'Warning',
  type: 'warning',
  text: 'Be cautious! Something might be wrong.',
};
