function submit() {
  let yearsContainer = document.querySelector("#yearInput");
  let monthsContainer = document.querySelector("#monthInput");
  let daysContainer = document.querySelector("#dayInput");

  let validCount = 0;
  validCount += validateDay(daysContainer);
  validCount += validateMonth(monthsContainer);
  validCount += validateYear(yearsContainer);
  if (validCount === 3) {
    if (!validateDate(yearsContainer, monthsContainer, daysContainer)) {
      enterErrorState(daysContainer, "Must be a valid date");
      enterErrorState(monthsContainer, "");
      enterErrorState(yearsContainer, "");
      return;
    } else if (
      daysContainer.querySelector("input").classList.contains("input-error")
    ) {
      exitErrorState(daysContainer);
      exitErrorState(monthsContainer);
      exitErrorState(yearsContainer);
    }
  } else {
    return;
  }

  let yearsInputValue = Number(yearsContainer.querySelector("input").value);
  let monthsInputValue =
    Number(monthsContainer.querySelector("input").value) - 1;
  let daysInputValue = Number(daysContainer.querySelector("input").value);
  let age = calculateAge(yearsInputValue, monthsInputValue, daysInputValue);
  updateOutput(age[0], age[1], age[2]);
}

function calculateAge(year, month, day) {
  let birthDay = new Date(year, month, day);
  let now = new Date();
  let ageYears = now.getFullYear() - birthDay.getFullYear();

  let ageMonths;
  if (now.getMonth() >= birthDay.getMonth()) {
    ageMonths = now.getMonth() - birthDay.getMonth();
  } else {
    ageYears--;
    ageMonths = 12 + now.getMonth() - birthDay.getMonth();
  }
  console.log(ageMonths);
  let ageDays;
  if (now.getDate() >= birthDay.getDate()) {
    ageDays = now.getDate() - birthDay.getDate();
  } else {
    ageMonths--;
    ageDays = 31 + now.getDate() - birthDay.getDate();

    if (ageMonths <= 0) {
      ageYears--;
      ageMonths = 12 + ageMonths;
    }
  }
  return [ageYears, ageMonths, ageDays];
}

function validateDay(daysContainer) {
  let daysInput = daysContainer.querySelector("input");
  if (daysInput.value === "") {
    enterErrorState(daysContainer, "This field is required");
  } else if (daysInput.value < 1 || daysInput.value > 31) {
    enterErrorState(daysContainer, "Must be a valid day");
  } else if (daysInput.classList.contains("input-error")) {
    exitErrorState(daysContainer);
    return 1;
  } else {
    return 1;
  }
}

function validateMonth(monthsContainer) {
  let monthsInput = monthsContainer.querySelector("input");
  if (monthsInput.value === "") {
    enterErrorState(monthsContainer, "This field is required");
  } else if (monthsInput.value < 1 || monthsInput.value > 12) {
    enterErrorState(monthsContainer, "Must be a valid month");
  } else if (monthsInput.classList.contains("input-error")) {
    exitErrorState(monthsContainer);
    return 1;
  } else {
    return 1;
  }
}

function validateYear(yearsContainer) {
  let yearsInput = yearsContainer.querySelector("input");
  if (yearsInput.value === "") {
    enterErrorState(yearsContainer, "This field is required");
  } else if (yearsInput.value < 1) {
    enterErrorState(yearsContainer, "Must be a valid year");
  } else if (yearsInput.value > new Date().getFullYear()) {
    enterErrorState(yearsContainer, "Must be in the past");
  } else if (yearsInput.classList.contains("input-error")) {
    exitErrorState(yearsContainer);
    return 1;
  } else {
    return 1;
  }
}

function validateDate(yearsContainer, monthsContainer, daysContainer) {
  let yearsInput = yearsContainer.querySelector("input");
  let monthsInput = monthsContainer.querySelector("input");
  let daysInput = daysContainer.querySelector("input");

  let ListOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (
    Number(monthsInput.value) === 2 &&
    Number(daysInput.value) === ListOfDays[monthsInput.value - 1] + 1
  ) {
    if (
      !(
        (typeof (!(yearsInput.value % 4) && yearsInput.value % 100) ||
          !(yearsInput.value % 400)) === "number"
      )
    ) {
      return false;
    }
  } else if (daysInput.value > ListOfDays[monthsInput.value - 1]) {
    return false;
  }
  return true;
}

function enterErrorState(inputContainer, error) {
  let input = inputContainer.querySelector("input");
  input.classList.add("input-error");
  let h1 = inputContainer.querySelector("h1");
  h1.classList.add("text-error");
  let p = inputContainer.querySelector("p");
  if (!p) {
    p = document.createElement("p");
    p.classList.add("p-error", "text-error");
    input.after(p);
  }
  p.innerHTML = error;
}

function exitErrorState(inputContainer) {
  let input = inputContainer.querySelector("input");
  input.classList.remove("input-error");
  let h1 = inputContainer.querySelector("h1");
  h1.classList.remove("text-error");
  let p = inputContainer.querySelector("p");
  if (p) {
    p.remove();
  }
}

function updateOutput(finalYears, finalMonths, finalDays) {
  document.querySelector(".output").style.opacity = 0;
  setTimeout(function () {
    document.getElementById("years").innerHTML = finalYears;
    document.getElementById("yearsText").innerHTML = setPlural(
      "year",
      finalYears
    );
    document.getElementById("months").innerHTML = finalMonths;
    document.getElementById("monthsText").innerHTML = setPlural(
      "month",
      finalMonths
    );
    document.getElementById("days").innerHTML = finalDays;
    document.getElementById("daysText").innerHTML = setPlural("day", finalDays);
    document.querySelector(".output").style.opacity = 1;
  }, 500);
}

function setPlural(string, number) {
  if (number === 1) {
    return string;
  }
  return string + "s";
}
