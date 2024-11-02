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
    window.document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
  }
}

export function getDataInCookie(cName: string): any {
  if (typeof window !== "undefined") {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(window.document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) {
        res = val.substring(name.length);
      }
    });
    return res;
  }
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
