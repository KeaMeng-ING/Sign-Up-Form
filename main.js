const form = document.querySelector("form");
const email = document.getElementById("mail");
const inputs = form.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", (event) => {
    const invalidMessage = input.previousElementSibling;
    if (
      input.validity.valid &&
      (input.id !== "confirm" || input.value === password.value)
    ) {
      input.classList.remove("active");
      invalidMessage.style.visibility = "hidden";
    } else {
      showError(input, invalidMessage, "input");
    }
  });
});

form.addEventListener("submit", (event) => {
  let formIsValid = true;

  for (const input of inputs) {
    const invalidMessage = input.previousElementSibling;
    if (!input.validity.valid) {
      showError(input, invalidMessage, "submit");
      formIsValid = false;
    }
  }

  if (!formIsValid) {
    event.preventDefault();
  } else {
    alert("All inputs are valid. Form submitted.");
  }
});

function showError(element, invalidMessage, key) {
  if (element.validity.valueMissing) {
    if (key == "input") {
      return;
    } else {
      console.log();
    }
  } else if (element.validity.typeMismatch) {
    invalidMessage.textContent = "Entered value needs to be a valid format.";
  } else if (element.validity.tooShort) {
    if (element.name == "password") {
      invalidMessage.textContent = `Password must be at least 8 characters`;
    } else {
      invalidMessage.textContent = `Please enter valid ${element.name}.`;
    }
  } else if (element.validity.patternMismatch) {
    invalidMessage.textContent =
      "Entered value does not match the required pattern.";
  } else if (element.id === "confirm" && element.value !== password.value) {
    invalidMessage.textContent = "Passwords do not match.";
  }

  invalidMessage.style.visibility = "visible";
  element.className = "active";
  // invalidMessage.classList.toggle = "invalid";
}
