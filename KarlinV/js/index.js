import { getData } from "./genderizeAPI.js";
import { render } from "./render.js";

const form = document.querySelector("form");
const err = "Поле не должно быть пустым, введите запрос и повторите попытку!";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const firstName = form["firstName"];
  const btn = form["action"];

  if (!firstName.value.trim()) {
    render(err);

    return;
  }

  const preloaderOn = () => {
    btn.classList.add("pulse");
    btn.setAttribute("disabled", "");
  };

  const preloaderOff = () => {
    btn.classList.remove("pulse");
    btn.removeAttribute("disabled");
  };

  try {
    preloaderOn();
    const data = await getData(firstName.value);

    if (data.gender === null) {
      throw new Error("Имя не найдено, или не определен пол для этого имени.");
    }

    render(data);
    preloaderOff();
  } catch (error) {
    console.error(error);

    render(error.message);
    preloaderOff();
  } finally {
    firstName.value = "";
  }
});
