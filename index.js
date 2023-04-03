function calculateAge() {
  let year = document.getElementById("yearInput").value;
  let month = document.getElementById("monthInput").value - 1;
  let day = document.getElementById("dayInput").value;
  let diff = new Date().getTime() - new Date(year, month, day).getTime();
  let ageYears = Math.floor(diff / 3.154e10);
  let ageMonths = Math.floor(diff / 2.628e9) % 12;
  let durationMinusYears = diff - ageYears * 3.154e10;
  let durationMinusMonths = durationMinusYears - ageMonths * 2.628e9;
  let ageDays = Math.floor(durationMinusMonths / 8.64e7);

  document.querySelector(".output").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("years").innerHTML = ageYears;
    document.getElementById("yearsText").innerHTML = setPlural(
      "year",
      ageYears
    );
    document.getElementById("months").innerHTML = ageMonths;
    document.getElementById("monthsText").innerHTML = setPlural(
      "month",
      ageMonths
    );
    document.getElementById("days").innerHTML = ageDays;
    document.getElementById("daysText").innerHTML = setPlural("day", ageDays);
    document.querySelector(".output").style.opacity = 1;
  }, 500);
}

function setPlural(string, number) {
  if (number === 1) {
    return string;
  }
  return string + "s";
}
