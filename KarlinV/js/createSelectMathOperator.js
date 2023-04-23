export const createSelect = () => {
  const options = ["+", "-", "*", "/"];
  const action = document.createElement("select");

  action.classList.add("action");

  for (let i = 0; i < options.length; i++) {
    const optionEl = document.createElement("option");
    const element = options[i];

    optionEl.value = element;
    optionEl.textContent = element;

    action.append(optionEl);
  }

  return action;
};
