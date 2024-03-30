let nameField = document.getElementById("name");
let emailField = document.getElementById("email");
let phoneField = document.getElementById("phone");
let addressField = document.getElementById("address");
let fileField = document.getElementById("file");
let fileNameField = document.getElementById("file-name");
let uploadButton = document.getElementById("upload");
let button = document.getElementById("submit-btn");

let nameWarn = document.getElementById("w-name");
let emailWarn = document.getElementById("w-email");
let phoneWarn = document.getElementById("w-phone");
let addressWarn = document.getElementById("w-address");

let selectedFile = null;

function submitForm() {
  selectedFile = null;
  nameField.value = null;
  emailField.value = null;
  phoneField.value = null;
  addressField.value = null;
  fileNameField.classList.add("warn");
  fileNameField.textContent = "No file chosen";
  iziToast.show({
    title: "Success",
    message: "Application submitted successfully!",
    position: "topRight",
    timeout: 5000,
  });
}

button.addEventListener("click", () => {
  let canSubmit = true;
  if (nameWarn.textContent === "" && nameField.value === "") {
    nameWarn.textContent = "Name can not be empty!";
    iziToast.show({
      title: "Error",
      message: "Name can not be empty!",
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  } else if (nameWarn.textContent !== "") {
    iziToast.show({
      title: "Error",
      message: nameWarn.textContent,
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  }
  if (emailWarn.textContent === "" && emailField.value === "") {
    emailWarn.textContent = "E-mail can not be empty!";
    iziToast.show({
      title: "Error",
      message: "E-mail can not be empty!",
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  } else if (emailWarn.textContent !== "") {
    iziToast.show({
      title: "Error",
      message: emailWarn.textContent,
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  }
  if (phoneWarn.textContent === "" && phoneField.value === "") {
    phoneWarn.textContent = "Phone number can not be empty!";
    iziToast.show({
      title: "Error",
      message: "Phone number can not be empty!",
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  } else if (phoneWarn.textContent !== "") {
    iziToast.show({
      title: "Error",
      message: phoneWarn.textContent,
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  }
  if (addressWarn.textContent === "" && addressField.value === "") {
    addressWarn.textContent = "Address can not be empty!";
    iziToast.show({
      title: "Error",
      message: "Address can not be empty!",
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  } else if (addressWarn.textContent !== "") {
    iziToast.show({
      title: "Error",
      message: addressWarn.textContent,
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  }
  if (fileNameField.classList.contains("warn")) {
    iziToast.show({
      title: "Error",
      message: "Choose a valid resume file!",
      position: "topRight",
      timeout: 5000,
    });
    canSubmit = false;
  }
  if (canSubmit) {
    submitForm();
  }
});

uploadButton.addEventListener("click", (event) => {
  event.preventDefault();
  fileField.click();
});

fileField.addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
  event.target.value = null;
  if (selectedFile.size <= 5 * 1024 * 1024) {
    fileNameField.textContent = selectedFile.name;
    fileNameField.classList.remove("warn");
  } else {
    selectedFile = null;
    fileNameField.classList.add("warn");
    fileNameField.textContent = "Max. file size is 5MB";
  }
});

nameField.addEventListener("input", (event) => {
  nameWarn.textContent = "";
  let name = event.target.value;
  nameField.value = getValidName(name);
});

nameField.addEventListener("focusout", (event) => {
  let name = event.target.value.trim();
  event.target.value = name;
  if (name.length === 0) {
    nameWarn.textContent = "Name can not be empty!";
  } else if (name.length === 1) {
    nameWarn.textContent = "Name should contains atleast 2 characters!";
  }
});

phoneField.addEventListener("input", (event) => {
  let phone = event.target.value;
  phoneWarn.textContent = "";
  phoneField.value = getValidPhoneNumber(phone);
});

phoneField.addEventListener("focusout", (event) => {
  let phone = event.target.value;
  if (phone.length === 0) {
    phoneWarn.textContent = "Phone number can not be empty!";
  } else if (phone.length !== 10) {
    phoneWarn.textContent = "Phone number should have exactly 10 digits!";
  }
});

emailField.addEventListener("input", (event) => {
  emailWarn.textContent = "";
  let email = event.target.value;
  emailField.value = getValidEmail(email);
});

emailField.addEventListener("focusout", (event) => {
  let email = event.target.value;
  if (email.length === 0) {
    emailWarn.textContent = "E-mail can not be empty!";
  } else {
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      emailWarn.textContent = "Invalid e-mail format";
  }
});

addressField.addEventListener("input", (event) => {
  addressWarn.textContent = "";
});

addressField.addEventListener("focusout", (event) => {
  addressField.value = getValidAddress(event.target.value);
  let address = event.target.value;
  if (address.length === 0) {
    addressWarn.textContent = "Address can not be empty!";
  } else {
    let count = 0;
    for (let letter of address) {
      if (letter !== " " && letter !== "\n") ++count;
      if (count >= 20) break;
    }
    if (count < 20) {
      addressWarn.textContent = "Address should have atleast 20 characters!";
    }
  }
});

function getValidName(name) {
  let correctValue = "";
  for (let letter of name) {
    if ("abcdefghijklmnopqrstuvwxyz ".includes(letter.toLowerCase())) {
      if (letter === " ") {
        if (
          correctValue.length !== 0 &&
          correctValue[correctValue.length - 1] != " "
        )
          correctValue += letter;
      } else correctValue += letter;
    }
  }
  return correctValue;
}

function getValidPhoneNumber(phoneNumber) {
  let correctValue = "";
  for (let digit of phoneNumber) {
    if (correctValue.length === 10) break;
    if ("0123456789".includes(digit)) {
      if (correctValue.length === 0) {
        if (digit !== "0") correctValue += digit;
      } else correctValue += digit;
    }
  }
  return correctValue;
}

function getValidEmail(email) {
  let correctValue = "";
  for (let letter of email) {
    if (letter !== " ") correctValue += letter.toLowerCase();
  }
  return correctValue;
}

function getValidAddress(address) {
  let correctValue = "";
  let addressLines = address.split("\n");
  addressLines = addressLines.map((value) => value.trim());
  addressLines = addressLines.filter((value) => value.length !== 0);
  for (let line of addressLines) {
    if (correctValue.length !== 0) correctValue += "\n";
    for (let letter of line) {
      if (letter === " ") {
        if (
          correctValue.length !== 0 &&
          correctValue[correctValue.length - 1] != " "
        )
          correctValue += letter;
      } else correctValue += letter;
    }
  }

  return correctValue;
}

let bodyElement = document.getElementById("body");
let body = document.body;
let logo = document.getElementById("logo");
let mode = document.getElementById("mode");
let images = document.getElementsByClassName("detail-img");

let darkModeFlag = false;

mode.addEventListener("click", () => {
  darkModeFlag = !darkModeFlag;
  if (darkModeFlag) darkMode();
  else lightMode();
});

function darkMode() {
  bodyElement.style.backgroundColor = "#2D3250";
  body.style.backgroundColor = "#424769";
  body.style.color = "white";
  logo.style.filter = "invert(100%) grayscale(100%)";
  mode.innerHTML = `<img src="./dark.png" id="mode-img" class="dark" />`;
  $("input").addClass("dark-placeholder");
  $("textarea").addClass("dark-placeholder");
  button.style.border = "thin solid #424769";
  nameField.style.backgroundColor = "#2D3250";
  emailField.style.backgroundColor = "#2D3250";
  phoneField.style.backgroundColor = "#2D3250";
  addressField.style.backgroundColor = "#2D3250";
  nameField.style.border = "2px solid #424769";
  emailField.style.border = "2px solid #424769";
  phoneField.style.border = "2px solid #424769";
  addressField.style.border = "2px solid #424769";
  nameField.style.color = "white";
  emailField.style.color = "white";
  phoneField.style.color = "white";
  addressField.style.color = "white";
  uploadButton.style.border = "2px solid #424769";
  uploadButton.style.backgroundColor = "#2D3250";
  $(uploadButton)
    .mouseenter(function () {
      $(this).css("background-color", "#424769");
    })
    .mouseleave(function () {
      $(this).css("background-color", "#2D3250");
    });
  for (let image of images) {
    image.style.filter = "brightness(0) invert(1)";
  }
}

function lightMode() {
  bodyElement.style.backgroundColor = "white";
  body.style.backgroundColor = "#e3ebed";
  body.style.color = "black";
  logo.style.filter = "none";
  mode.innerHTML = `<img src="./light.png" id="mode-img" />`;
  $("input").removeClass("dark-placeholder");
  $("textarea").removeClass("dark-placeholder");
  button.style.border = "thin solid gray";
  nameField.style.backgroundColor = "white";
  emailField.style.backgroundColor = "white";
  phoneField.style.backgroundColor = "white";
  addressField.style.backgroundColor = "white";
  nameField.style.border = "thin solid gray";
  emailField.style.border = "thin solid gray";
  phoneField.style.border = "thin solid gray";
  addressField.style.border = "thin solid gray";
  nameField.style.color = "black";
  emailField.style.color = "black";
  phoneField.style.color = "black";
  addressField.style.color = "black";
  uploadButton.style.border = "thin solid gray";
  uploadButton.style.backgroundColor = "white";
  $(uploadButton)
    .mouseenter(function () {
      $(this).css("background-color", "rgb(216, 216, 216)");
    })
    .mouseleave(function () {
      $(this).css("background-color", "white");
    });
  for (let image of images) {
    image.style.filter = "none";
  }
}
