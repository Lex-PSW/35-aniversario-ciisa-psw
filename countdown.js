(function () {
  var el = document.getElementById('cip-countdown');
  if (!el) return;

  var targetDate = new Date(el.getAttribute('data-target'));

  var monthsEl = document.getElementById('cip-countdown-months');
  var daysEl = document.getElementById('cip-countdown-days');
  var hoursEl = document.getElementById('cip-countdown-hours');
  var secondsEl = document.getElementById('cip-countdown-seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    var now = new Date();
    var target = targetDate;

    if (target <= now) {
      monthsEl.textContent = '00';
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    var months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    var cursor = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    if (cursor > target) {
      months -= 1;
      cursor = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
    }

    var diffMs = target.getTime() - cursor.getTime();
    var totalSeconds = Math.floor(diffMs / 1000);

    var days = Math.floor(totalSeconds / 86400);
    totalSeconds -= days * 86400;
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds -= hours * 3600;
    var seconds = totalSeconds % 60;

    monthsEl.textContent = pad(months);
    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    secondsEl.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();
