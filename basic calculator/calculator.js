let display = document.getElementById('display');
let darkModeBtn = document.getElementById('dark-mode-btn');
let isDarkMode = false;

function add(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  let input = display.value;
  let operators = /[+\-*/]/g;
  let numbers = input.split(operators);
  let operator = input.match(operators);
  let result = parseFloat(numbers[0]);
  for (let i = 1; i < numbers.length; i++) {
    let num = parseFloat(numbers[i]);
    if (operator[i - 1] === '+') {
      result += num;
    } else if (operator[i - 1] === '-') {
      result -= num;
    } else if (operator[i - 1] === '*') {
      result *= num;
    } else if (operator[i - 1] === '/') {
      result /= num;
    }
  }
  display.value = result;
}

function toggleDarkMode() {
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeBtn.innerHTML = 'Light Mode';
      isDarkMode = true;
    } else {
      document.body.classList.remove('dark-mode');
      darkModeBtn.innerHTML = 'Dark Mode';
      isDarkMode = false;
    }
  }
  
