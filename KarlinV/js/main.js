(function () {
  const outPut = document.querySelector(".stopwatch__output"),
    btnStart = document.querySelector(".btn__start"),
    btnStop = document.querySelector(".btn__stop"),
    btnPause = document.querySelector(".btn__pause");

  let clocktimer = null,
    h = 0,
    m = 0,
    s = 0,
    ms = 0;

  btnStart.addEventListener("click", start);

  btnStop.addEventListener("click", stop);

  btnPause.addEventListener("click", pause);

  function start() {
    btnStart.setAttribute("disabled", "");
    btnStop.removeAttribute("disabled");
    btnPause.removeAttribute("disabled");

    timer();
  }

  function stop() {
    clearTimeout(clocktimer);
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", "");
    btnPause.setAttribute("disabled", "");
    (h = 0), (m = 0), (s = 0), (ms = 0);
    out(h, m, s, ms);
  }

  function pause() {
    clearTimeout(clocktimer);
    btnStart.removeAttribute("disabled");
    btnPause.setAttribute("disabled", "");
  }

  function timer() {
    clocktimer = setTimeout(timer, 1000 / 60);
    ms++;
    if (ms >= 60) {
      ms = 0;
      s++;
      if (s >= 60) {
        s = 0;
        m++;
        if (m >= 60) {
          m = 0;
          h++;
        }
      }
    }

    out(h, m, s, ms);
  }

  function out(h, m, s, ms) {
    outPut.textContent =
      `${h < 10 ? 0 : ""}${h} : ` +
      `${m < 10 ? 0 : ""}${m} : ` +
      `${s < 10 ? 0 : ""}${s} : ` +
      `${ms < 10 ? 0 : ""}${ms}`;
  }
})();
