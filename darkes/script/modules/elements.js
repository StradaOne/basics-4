const getSelector = (css) => document.body.querySelector(css);

const ELEMENT = {
   FORM_HIGH: getSelector('.high-task'),
   INPUT_HIGH: getSelector('#input-high'),
   FORM_LOW: getSelector('.low-task'),
   INPUT_LOW: getSelector('#input-low')
};

export { getSelector, ELEMENT };