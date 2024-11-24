import { TOKEN_EXPIRY_DAYS } from "constants/Generals.constants";
import Cookies, { CookieAttributes } from "js-cookie";

/**
 * Set a token cookie with the specified value and optional expiration time.
 * @param token - The token value to be stored in the cookie.
 * @param options - Optional cookie settings (e.g., expires, secure).
 */
export const setToken = (token: string, options: CookieAttributes = { expires: TOKEN_EXPIRY_DAYS }): void => {
  Cookies.set("token", token, options);
};
export const setUserType = (userType: string, options: CookieAttributes = { expires: TOKEN_EXPIRY_DAYS }): void => {
  Cookies.set("userType", userType, options);
};
export const getUserType = (): string | undefined => {
  return Cookies.get("userType");
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};

export const removeToken = (): void => {
  Cookies.remove("token");
};
