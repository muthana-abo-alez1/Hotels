import Cookies from "js-cookie";

export const setToken = (token: string): void => {
  const TOKEN_EXPIRY = new Date(new Date().getTime() + 60 * 60 * 1000);
  Cookies.set("token", token, { expires: TOKEN_EXPIRY });
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const removeToken = (): void => {
  Cookies.remove("token");
};

export const getUserType = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const parts = token?.split(".");
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
export const decodeToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const getUserId = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      throw new Error("Invalid token");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));

    return decodedPayload.user_id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};