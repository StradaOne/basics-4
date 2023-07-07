import Cookies from "js-cookie";
import dom from "./dom.js";
import axios from "axios";

let ShowMassagesNumber = 20;
let ShowMassagesNumber2 = 0;
let showAll = false;

//когад пришло новое
export function showComponentMassages(massage) {
  const mass = JSON.parse(massage);
  if (mass.user.name === Cookies.get("name")) {
    createMYMassege(mass);
  } else {
    console.log(JSON.parse(massage));
    let componentMassege = document.createElement("div");
    componentMassege.classList.add("companionMassege");
    console.log(mass.user.name);
    componentMassege.innerHTML = `<div class='name'>${mass.user.name}<div class='time'>${mass.createdAt[11]}${mass.createdAt[12]}:${mass.createdAt[14]}${mass.createdAt[15]}</div></div><div class="text"><div class="text-right">${mass.text}</div></div>`;
    dom.place.append(componentMassege);
    dom.place.scrollTo({ top: 9999999999 });
  }
}

//показать мое сообщение
function createMYMassege(mass) {
  let myMassege = document.createElement("div");
  myMassege.classList.add("myMassege");
  myMassege.innerHTML = `<div class='name'>Я<div class='time'>${mass.createdAt[11]}${mass.createdAt[12]}:${mass.createdAt[14]}${mass.createdAt[15]}</div></div><div class="text"><div class="text-right">${mass.text}</div></div>`;
  dom.place.append(myMassege);
  dom.place.scrollTo({ top: 9999999999, behavior: "smooth" });
  dom.input.value = "";
}

//запрос на старые
export function askMassages() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "code"
  )}`;
  axios
    .get("https://edu.strada.one/api/messages/ ")
    .then((response) => {
      localStorage.setItem("massages", JSON.stringify(response.data.messages));
      showMassages();
    })
    .catch((error) => {
      console.error(error);
    });
}

const element = document.querySelector(".scroll");
function handleScroll() {
  if (element.scrollTop === 0) {
    if (showAll === false) {
      showMassages();
    }
  }
}
element.addEventListener("scroll", handleScroll);

//показать старые
function showMassages() {
  let massages = JSON.parse(localStorage.getItem("massages"));
  console.log(ShowMassagesNumber);
  let newMassages = massages.slice(0, ShowMassagesNumber);
  for (let i = 0; i < newMassages.length + 1; i++) {
    if (i > ShowMassagesNumber2 - 1 && i < massages.length) {
      console.log(i);
      let myMassege = document.createElement("div");
      if (Cookies.get("name") === massages[i].user.name) {
        myMassege.classList.add("myMassege");
        myMassege.innerHTML = `<div class='name'>Я<div class='time'>${massages[i].createdAt[11]}${massages[i].createdAt[12]}:${massages[i].createdAt[14]}${massages[i].createdAt[15]}</div></div><div class="text"><div class="text-right">${massages[i].text}</div></div>`;
      } else {
        myMassege.classList.add("companionMassege");
        myMassege.innerHTML = `<div class='name'>${massages[i].user.name}<div class='time'>${massages[i].createdAt[11]}${massages[i].createdAt[12]}:${massages[i].createdAt[14]}${massages[i].createdAt[15]}</div></div><div class="text"><div class="text-right">${massages[i].text}</div></div>`;
      }
      dom.place.insertBefore(myMassege, dom.place.firstChild);
      dom.place.scrollTo({ top: 1311 });
    }
    if (i == massages.length) {
      console.log("all");
      showAll = true;
      const allMassage = document.createElement("div");
      allMassage.classList.add(all);
      allMassage.innerHTML = "<div>all</div>";
      dom.place.insertBefore(allMassage, dom.place.firstChild);
    }
  }
  ShowMassagesNumber = ShowMassagesNumber + 20;
  ShowMassagesNumber2 = ShowMassagesNumber2 + 20;
}
