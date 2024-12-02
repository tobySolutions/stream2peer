import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

export function storeDataInCookie(
  cName: string,
  cValue: string,
  expDays: number
) {
  if (typeof window !== "undefined") {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    const encodedValue = encodeURIComponent(cValue); // Ensuring the value is encoded

    // Optional: Add `Secure` flag if using HTTPS and `SameSite` for security
    window.document.cookie = `${cName}=${encodedValue}; ${expires}; path=/; Secure; SameSite=Lax`;
  }
}

export function getDataInCookie(cName: string): any {
  if (typeof window !== "undefined") {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(window.document.cookie); // Decode the cookie value
    const cArr = cDecoded.split("; ");

    const cookie = cArr.find((val) => val.indexOf(name) === 0);

    return cookie ? cookie.substring(name.length) : null;
  }
  return null;
}

export function deleteDataInCookie(cName: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
}

export function deleteAllCookie() {
  if (typeof window !== "undefined") {
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
