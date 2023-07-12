export function openModal(modal) {
  modal.classList.remove('hidden');
};
export function closeModal(modal) {
  modal.classList.add('hidden');
};

export function converterTime(inputTime) {
  const date = new Date(inputTime);
  const options = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const formattedTime = date.toLocaleString("en-US", options);
  return formattedTime;
};