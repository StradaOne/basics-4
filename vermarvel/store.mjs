export const store = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(
        `Error getting data from localStorage for key "${key}":`,
        error
      );
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

// set
export const cookies = {
  cookify(key, value, minutes = 60) {
    const now = new Date();
    const time = now.getTime();
    const expirationDate = time + convertToMsc(minutes);
    now.setTime(expirationDate);
    const cookie = `${key}=${value};expires=${now.toUTCString()};`;
    console.log(cookie);
    document.cookie = cookie;
  },

  uncookify(key) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  },

  decookify(key) {
    cookify(key, "", {
      "max-age": -1,
    });
  },
};

// Helper
// Time converted to millisec
function convertToMsc(min) {
  return min * 60000;
}
