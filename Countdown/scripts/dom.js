const fastDOM = (id) => document.getElementById(id);

const button = fastDOM("button");
const input = fastDOM("input");
const txt = fastDOM("txt");

export default {
  button,
  input,
  txt,
};
