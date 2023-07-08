var $1uc5u$datefns = require("date-fns");
var $1uc5u$datefnslocale = require("date-fns/locale");

const $95b0a77720946bf1$export$836aee6bce45247 = (element)=>{
    return document.querySelector(element);
};
const $95b0a77720946bf1$export$3d7cd8ed57263b30 = (element)=>{
    return document.createElement(element);
};
const $95b0a77720946bf1$export$c3da0dad1b44eea9 = {
    container: $95b0a77720946bf1$export$836aee6bce45247("#countdownApp"),
    dateLabel: $95b0a77720946bf1$export$836aee6bce45247(".date-label"),
    dateInput: $95b0a77720946bf1$export$836aee6bce45247("#date-input"),
    dateBtn: $95b0a77720946bf1$export$836aee6bce45247(".date-btn"),
    countdownDisplay: $95b0a77720946bf1$export$836aee6bce45247(".countdown-display")
};
const $95b0a77720946bf1$export$f89cde9cb3fa9e34 = {
    currentDate: new Date(),
    getCurrentDate: function() {
        return this.currentDate;
    },
    getCurrentDateISOString: function(date = this.currentDate) {
        const currentDateISOString = date.toISOString().split("T")[0];
        return currentDateISOString;
    }
};




(0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateInput.setAttribute("min", (0, $95b0a77720946bf1$export$f89cde9cb3fa9e34).getCurrentDateISOString());
(0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateBtn.addEventListener("click", $d640d6d13838b754$var$render);
(0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateInput.addEventListener("input", (event)=>{
    const selectedDate = new Date(event.target.value);
    if (selectedDate < (0, $95b0a77720946bf1$export$f89cde9cb3fa9e34).getCurrentDate()) event.target.setCustomValidity("Выберите дату, которая больше или равна текущей дате");
    else event.target.setCustomValidity("");
});
(0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateInput.addEventListener("keydown", (event)=>{
    if (event.key === "Enter") $d640d6d13838b754$var$render(event);
});
function $d640d6d13838b754$var$render(event) {
    event.preventDefault();
    const pastDate = new Date((0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateInput.value);
    if (!(0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateInput.value) return;
    if (pastDate < (0, $95b0a77720946bf1$export$f89cde9cb3fa9e34).getCurrentDate()) {
        (0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateInput.value = "";
        return;
    }
    const interval = (0, $1uc5u$datefns.intervalToDuration)({
        start: (0, $95b0a77720946bf1$export$f89cde9cb3fa9e34).getCurrentDate(),
        end: pastDate
    });
    console.log(interval);
    let format = [
        "hours",
        "minutes",
        "seconds"
    ];
    if (interval.years) format = [
        "years",
        "days",
        "hours"
    ];
    else if (interval.days) format = [
        "days",
        "hours",
        "minutes"
    ];
    const formattedDuration = (0, $1uc5u$datefns.formatDuration)(interval, {
        locale: (0, $1uc5u$datefnslocale.ru),
        delimiter: " ",
        format: format
    });
    (0, $95b0a77720946bf1$export$c3da0dad1b44eea9).countdownDisplay.classList.remove("load-save-data");
    (0, $95b0a77720946bf1$export$c3da0dad1b44eea9).countdownDisplay.textContent = formattedDuration;
    (0, $95b0a77720946bf1$export$c3da0dad1b44eea9).dateInput.value = "";
}


//# sourceMappingURL=index.js.map
