import { TOKEN_EXPIRY_DAYS } from "constants/Generals";
import Cookies, { CookieAttributes } from "js-cookie";

export const setToken = (token: string, options: CookieAttributes = { expires: TOKEN_EXPIRY_DAYS }): void => {
  Cookies.set("token", token, options);
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const removeToken = (): void => {
  Cookies.remove("token");
};

export const getUserType = (token : string|null): string|null => {
  if (!token) return null
  try {
    const parts = token?.split('.');
    if (parts?.length !== 3) {
      throw new Error("Invalid token");
    }
    const payload = atob(parts[1]); 
    const decodedPayload = JSON.parse(payload);

    return decodedPayload.userType;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

