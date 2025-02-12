import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DropPhoto from "./DropPhoto"; 

const meta: Meta = {
  title: "Components/DropPhoto",
  component: DropPhoto,
  argTypes: {
    onImageUpload: { action: "imageUploaded" }, 
    url: {
      control: "file", 
      description: "File to upload as the image preview",
    },
  },
};

export default meta;

const Template: StoryFn<any> = (args) => {
  const [imageUrl, setImageUrl] = useState<string | null>(args.url || null);

  const handleImageUpload = (url: string) => {
    setImageUrl(url); 
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file); 
        handleImageUpload(url); 
      }
    }
  };

  return (
    <>
      <DropPhoto {...args} onImageUpload={handleImageUpload} url={imageUrl || ""} />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        style={{ marginTop: 10 }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  url: "",
};

export const WithExistingImage = Template.bind({});
WithExistingImage.args = {
  url: "https://via.placeholder.com/200",
};
