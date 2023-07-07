export function createNewMessage(nickname, text, timeMess) {
    const textElement = template.content.cloneNode(true);
    if (`${nickname}:` == 'Dima:') { //сделать проверку на ник 
      textElement.querySelector("div").classList.add("me");
    } else {
      textElement.querySelector("div").classList.add("display-items__message");
    }
    const nameMessage = (textElement.querySelector(
      ".message-nickname"
    ).textContent = `${nickname}:`);
    textElement.querySelector(".message-date").textContent = timeMess; //date
    textElement.querySelector("p").textContent = text; //было inputNode.value
    
    return textElement;
}