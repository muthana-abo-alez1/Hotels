import React from "react"; 
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DropPhoto from "./DropPhoto"; 
import uploadPhoto from "apis/admin/photos/PhotosApis";

jest.mock("apis/admin/photos/PhotosApis", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("DropPhoto Component", () => {
  const onImageUploadMock = jest.fn(); 

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls onImageUpload with the correct URL when the image upload is successful", async () => {
    const mockImageUrl = "http://example.com/photo.jpg";
    (uploadPhoto as jest.Mock).mockResolvedValueOnce(mockImageUrl);

    render(<DropPhoto onImageUpload={onImageUploadMock} url="" />);

    const dropArea = screen.getByText("Drop Photo...");
    fireEvent.drop(dropArea, {
      dataTransfer: { files: [new File(["photo"], "photo.jpg")] },
    });

    await waitFor(() => {
      expect(onImageUploadMock).toHaveBeenCalledWith(mockImageUrl);
      const image = screen.getByRole("img") as HTMLImageElement; 
      expect(image.src).toBe(mockImageUrl);
    });
  });


  it("sets the image URL correctly if a URL is passed as a prop", () => {
    const testUrl = "http://example.com/photo.jpg";

    render(<DropPhoto onImageUpload={onImageUploadMock} url={testUrl} />);

    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image.src).toBe(testUrl);
  });


  it("displays the uploaded image preview when the URL is set", async () => {
    const testUrl = "http://example.com/photo.jpg";
    render(<DropPhoto onImageUpload={onImageUploadMock} url={testUrl} />);

    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image.src).toBe(testUrl);
  });
});
