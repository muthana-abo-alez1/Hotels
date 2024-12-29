import { axiosInstance } from "apis/ApisConfig";

interface UploadPhotoResponse {
  url: string;
}

const API_BASE_URL = "/api";

const uploadPhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("files", file);
    const response = await axiosInstance.post<UploadPhotoResponse>(
      `${API_BASE_URL}/photos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.url;
};

export default uploadPhoto;
