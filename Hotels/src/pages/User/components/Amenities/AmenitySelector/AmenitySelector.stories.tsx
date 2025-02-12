import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AmenitySelector from './AmenitySelector';
import { Box } from '@mui/material';

const meta: Meta = {
  title: 'Components/AmenitySelector',
  component: AmenitySelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedAmenities: {
      control: 'object',
      description: 'Array of selected amenities',
      defaultValue: ['Free Wi-Fi', 'Fitness Center'], 
    },
    reset: {
      control: 'boolean', 
    },
    onAmenitiesChange: { action: 'onAmenitiesChange' },
  },
};

export default meta;

const Template: StoryFn = (args) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    args.selectedAmenities || []
  );

  const handleAmenitiesChange = (newAmenities: string[]) => {
    setSelectedAmenities(newAmenities);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <AmenitySelector
        selectedAmenities={selectedAmenities}
        onAmenitiesChange={handleAmenitiesChange}
        reset={args.reset}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  selectedAmenities: ['Free Wi-Fi', 'Fitness Center'], 
  reset: false,
};

export const WithSelectedAmenities = Template.bind({});
WithSelectedAmenities.args = {
  selectedAmenities: ['Free Wi-Fi', 'Fitness Center'], 
  reset: false,
};

