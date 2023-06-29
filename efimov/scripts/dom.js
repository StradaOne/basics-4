const fastDOM = (s) => document.querySelector(s);

const form = fastDOM("#form");
const input = fastDOM("#massage");
const place = fastDOM("#place");

export default {
  form,
  input,
  place,
};
