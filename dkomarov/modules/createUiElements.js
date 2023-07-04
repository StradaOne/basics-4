import { INPUT_NODE } from "./DOMelements";
import { DISPLAY_NODE } from "./DOMelements";
import { inputClear } from "..";
// const TEMPLATE = document.querySelector("#template");

export function createNewMessage(nickname, text, timeMess) {
    const textElement = template.content.cloneNode(true);
    const nameMessage = (textElement.querySelector(
      ".message-nickname"
    ).textContent = `${nickname}:`);
    textElement.querySelector(".message-date").textContent = timeMess; //date
    textElement.querySelector("p").textContent = text; //было inputNode.value
  
    if (`${nickname}:` === nameMessage) {
      textElement.querySelector("div").classList.add("display-items__message");
    } else {
      textElement.querySelector("div").classList.add("me");
    }
    return textElement;
  }
  
export function myMessageCreate(nickname, text, timeMess) {
    if (INPUT_NODE.value != '') {
      const textElement = template.content.cloneNode(true);
      const nameMessage = (textElement.querySelector(
        ".message-nickname"
      ).textContent = "Me:");
      textElement.querySelector(".message-date").textContent = timeMess; //date
      textElement.querySelector("p").textContent = text; //было inputNode.value
  
      if (nickname === nameMessage) {
        textElement.querySelector("div").classList.add("display-items__message");
      } else {
        textElement.querySelector("div").classList.add("me");
      }
  
      DISPLAY_NODE.append(textElement);
      inputClear();
    }
  }

