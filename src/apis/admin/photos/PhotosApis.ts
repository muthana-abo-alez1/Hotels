import { axiosInstance, handleError } from "apis/ApisConfig";
import { showErrorSnackbar } from "utils/snackbarUtils";

interface UploadPhotoResponse {
  url: string; 
}

const API_BASE_URL = "/api";


const uploadPhoto = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('files', file);

  try {
    const response = await axiosInstance.post<UploadPhotoResponse>(
      `${API_BASE_URL}/photos`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }
    );

    return response.data.url;
  } catch (error) {
    throw error; 
  }
};

export default uploadPhoto;
