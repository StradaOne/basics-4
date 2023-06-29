import { Hours, Minutes } from "./date.js";
import dom from "./dom.js";

dom.form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (dom.input.value != "") {
    createMassege();
  }
});

function createMassege() {
  let myMassege = document.createElement("div");
  myMassege.classList.add("myMassege");
  myMassege.innerHTML = `<div class='name'>Я<div class='time'>${Hours}:${Minutes}</div></div>${dom.input.value}`;
  dom.place.append(myMassege);
  dom.place.scrollTo({ top: 9999999999, behavior: "smooth" });
}
