function setCookie(name, val) {
  document.cookie = name+"="+val+"; path=/; max-age=3600";
}
function readCookie(name){
    const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export{setCookie,readCookie}