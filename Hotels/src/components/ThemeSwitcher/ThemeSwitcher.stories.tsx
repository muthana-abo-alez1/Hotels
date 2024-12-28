// src/stories/ThemeSwitcher.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ThemeSwitcher from 'components/ThemeSwitcher'; 
import { Box } from '@mui/material';
import { ThemeProviderWrapper } from 'context/ThemeContext'; 

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered', 
  },
};

export default meta;

const Template: StoryFn<typeof ThemeSwitcher> = () => (
  <ThemeProviderWrapper> 
    <Box sx={{ width: 100 }}>
      <ThemeSwitcher />
    </Box>
  </ThemeProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {};
