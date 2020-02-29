import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => Cookies.get("refresh_token");
export const isAuthenticated = () => !!getAccessToken();

// for testing, to make sure all cookies are removed
export const removeAccessToken = () => {
  Object.keys(Cookies.get()).forEach(function(cookieName) {
    var neededAttributes = {
      // Here you pass the same attributes that were used when the cookie was created
      // and are required when removing the cookie
    };
    Cookies.remove(cookieName, neededAttributes);
  });
};
// Cookies.remove("access_token");

export const authenticate = async sessId => {
  try {
    // you will have the exact same setters in your Login page/app too
    Cookies.set("access_token", sessId);
    console.log("set cookies");

    return true;
  } catch (error) {
    return false;
  }
};
