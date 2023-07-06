// set
export const cookies = {
  cookify(key, value, minutes = 60) {
    const now = new Date();
    const time = now.getTime();
    const expirationDate = time + convertToMsc(minutes);
    now.setTime(expirationDate);
    const cookie = `${key}=${value};expires=${now.toUTCString()};`;

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

  killCookie(key) {
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
