const qs = (element) => {
  return document.querySelector(element);
};

export const el = {
  container: qs("#countdownApp"),
  dateLabel: qs(".date-label"),
  dateInput: qs("#date-input"),
  dateBtn: qs(".date-btn"),
  countdownDisplay: qs(".countdown-display"),
};

export const dateUtils = {
  currentDate: new Date(),

  getCurrentDate: function () {
    return this.currentDate;
  },

  getCurrentDateISOString: function (date = this.currentDate) {
    const currentDateISOString = date.toISOString().split("T")[0];
    return currentDateISOString;
  },
};
