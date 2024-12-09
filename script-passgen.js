const passwordInput = document.getElementById("strongPasswordValue");
const copySuccess = document.getElementById("CopySuccess");
const rangeInput = document.getElementById("rangeInput");
const rangeValue = document.getElementById("rangeValue");
const generatePassword = document.querySelector(".generatePassword");
const options = document.querySelectorAll(".options input");
for (const opt of options) {
  opt.addEventListener("click", generateStrongPassword);
}
const Characters = {
    Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Lowercase: "abcdefghijklmnopqrstuvwxyz",
    Numbers: "0123456789",
    Symbols: "~!@#$%^&*()_+{}[].,:;|",
  };

  function CopyStrongPassword() {
    if (passwordInput.value !== "") {
      copySuccess.setAttribute("src", "https://www.pngitem.com/pimgs/b/11-110747_approval-icon-png.png");
      navigator.clipboard.writeText(passwordInput.value);
  
      setTimeout(function () {
        copySuccess.setAttribute("src", "https://th.bing.com/th/id/R.864d42d81c257368512c8591c680b3f2?rik=A%2faO%2fTxbbNjgCg&pid=ImgRaw&r=0");
      }, 2000);
    }
  }

  generatePassword.addEventListener("click", generateStrongPassword);
function generateStrongPassword() {
  let randomPassword = "",
    strongPassword = "",
    excludeDuplicate = false;

  options.forEach((option) => {
    if (option.checked && option.id !== "Duplicate") {
      randomPassword += Characters[option.id];
    }
    if (option.checked && option.id === "Duplicate") {
      excludeDuplicate = true;
    }
  });

  if (randomPassword !== "") {
    if (excludeDuplicate && randomPassword.length < rangeInput.value) {
      alert(
        "We Can't get password without Duplicate for selected options and length!"
      );
      passwordInput.value = "";
    } else {
      for (let i = 0; i < rangeInput.value; i++) {
        let charAt =
          randomPassword[Math.floor(Math.random() * randomPassword.length)];
        if (excludeDuplicate) {
          !strongPassword.includes(charAt) ? (strongPassword += charAt) : i--;
        } else {
          strongPassword += charAt;
        }
      }
      passwordInput.value = strongPassword;
    }
  } else {
    passwordInput.value = "";
  }
}

rangeInput.addEventListener("input", setPasswordIndicator);
rangeValue.addEventListener("input", setPasswordIndicator);

function setPasswordIndicator() {
  let indicator =
    rangeInput.value <= 8
      ? "weak"
      : rangeInput.value <= 16
      ? "medium"
      : "strong";
  passwordInput.parentElement.id = indicator;
  passwordInput.parentElement.title = "Your password is " + indicator;
  generateStrongPassword();
}