import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import AmenitiesIcons from './AmenitiesIcons';
import { Amenities } from 'interfaces/amenities';

// Example amenities data
const exampleAmenities: Amenities[] = [
  { name: 'Free Wi-Fi', description: 'Free Wi-Fi for all guests' },
  { name: 'Fitness Center', description: 'Open 24 hours a day' },
  { name: 'Swimming Pool', description: 'Outdoor pool available' },
  { name: 'Free Breakfast', description: 'Complimentary breakfast every morning' },
  { name: 'TV', description: 'Flat-screen TVs in every room' },
  { name: 'Business Center Access', description: 'Computers and printers available' },
  { name: 'Ocean View', description: 'Beautiful ocean view from the room' },
  { name: 'Room Service', description: 'Order food to your room anytime' },
];

// Define the metadata for the story
const meta: Meta = {
  title: 'Components/AmenitiesIcons',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  component: AmenitiesIcons,
  argTypes: {
    backgroundColor: { control: 'color' },
    iconSize: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    amenities: {
      control: {
        type: 'object', 
      },
      description: 'Array of amenities to display icons for',
    },
  },
};

export default meta;

const Template: StoryFn<any> = (args) => <AmenitiesIcons {...args} />;

export const Default = Template.bind({});
Default.args = {
  amenities: exampleAmenities,
  backgroundColor: 'primary.main',
  iconSize: 'medium',
};

export const SmallIcons = Template.bind({});
SmallIcons.args = {
  amenities: exampleAmenities,
  backgroundColor: 'secondary.main',
  iconSize: 'small',
};

export const LargeIcons = Template.bind({});
LargeIcons.args = {
  amenities: exampleAmenities,
  backgroundColor: 'error.main',
  iconSize: 'large',
};

export const CustomAmenities = Template.bind({});
CustomAmenities.args = {
  amenities: [
    { name: 'Free Wi-Fi', description: 'Free Wi-Fi for all guests' },
    { name: 'TV', description: 'Flat-screen TVs in every room' },
    { name: 'Room Service', description: 'Order food to your room anytime' },
  ],
  backgroundColor: 'info.main',
  iconSize: 'medium',
};
