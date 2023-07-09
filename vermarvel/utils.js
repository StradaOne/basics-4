import dom from "./dom.js";
export const utils = {
  timeFormat(time) {
    const date = new Date(time);
    return date.toLocaleString().slice(11, 17);
  },

  scrollToBottom() {
    dom.parentMessages.scrollTo(0, dom.parentMessages.scrollHeight);
  },

  splitArray(chunkSize, array) {
    const newArr = [];
    console.log(array);
    for (let i = 0; i < array.length; i += chunkSize) {
      const element = array.slice(i, i + chunkSize);
      newArr.push(element.reverse());
    }
    return newArr;
  },
  loadMore() {
    // Reaching coord in Y of the chat
    const approach = 0;
    const scrollSpot = dom.tape.offsetTop - dom.parentMessages.scrollTop;
    if (scrollSpot >= approach) {
      renderHistory("loadMore");
    } else {
      dom.notice.textContent = "";
    }
  },
};
