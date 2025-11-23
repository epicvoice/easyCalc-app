//CALCULATOR CODE

let x = ''; //first-number
let y = ''; //second-number
let operator = ''; //operator
let result = false; // flag to check if equal button was pressed

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const actions = ['+', '-', '*', '/', '%', '±'];

const output = document.querySelector('.screen');
const btns = document.querySelector('.buttons');
const clear = document.querySelector('.clear');

// AC  RESET
const allClear = () => {
	x = '';
	y = '';
	operator = '';
	result = false;
	output.textContent = 0;
};

// HANDLE CLICKING EVENTS
btns.addEventListener('click', (e) => {
	const target = e.target;
	const value = target.textContent;

	if (!target.classList.contains('button')) return;
	//if missclicked button- return
	if (target.classList.contains('clear')) {
		allClear();
		return;
		//if clicked AC- allClear function loaded
	}

	if (target.classList.contains('positive-negative')) {
		if (output.textContent === '0') return;

		if (y === '' && operator === '') {
			x = (parseFloat(x) * -1).toString();
			output.textContent = x;
		} else {
			y = (parseFloat(y) * -1).toString();
			output.textContent = y;
		}
		return;
	}

	// NUMBERS
	if (numbers.includes(value)) {
		if (result) {
			allClear();
		}

		if (y === '' && operator === '') {
			x += value;
			output.textContent = x;
		} else if (x !== '' && y !== '' && result) {
			y = value;
			result = false;
			output.textContent = y;
		} else {
			y += value;
			output.textContent = y;
		}
		return;
	}

	// OPERATORS
	if (actions.includes(value)) {
		if (x !== '' && y !== '') {
			const numX = parseFloat(x);
			const numY = parseFloat(y);

			let res;
			if (operator === '+') res = numX + numY;
			if (operator === '-') res = numX - numY;
			if (operator === '*') res = numX * numY;
			if (operator === '/') {
				if (numY === 0) {
					output.textContent = 'Error';
					return allClear();
				} else {
					res = numX / numY;
				}
			}

			x = res.toString();
			y = '';
			output.textContent = x;
		}

		operator = value;
		result = false;
		return;

		if (result) {
			result = false;
			y = '';
		}

		if (x !== '' && y === '') {
			operator = value;
			output.textContent = operator;
			console.log(x, y, operator);
		}
		return;
	}

	// EQUAL BUTTON
	if (target.classList.contains('equal')) {
		if (x !== '' && operator !== '' && y !== '') {
			const numX = parseFloat(x);
			const numY = parseFloat(y);

			let res = 0;

			if (operator === '+') res = numX + numY;
			if (operator === '-') res = numX - numY;
			if (operator === '/') res = numX / numY;
			if (operator === '*') res = numX * numY;

			output.textContent = res;

			// 👉 Keep result as x for chaining, mark result = true
			x = res.toString();
			y = '';
			operator = '';
			result = true;
		}
	}
});

//SWITCH LIGHT/DARK MODE

const switchMode = document.querySelector('.switch-mode');
const calculatorCase = document.querySelector('.case');

switchMode.addEventListener('click', () => {
	document.body.classList.toggle('dark-mode-body');
	calculatorCase.classList.toggle('dark-mode-case');

	const darkModeOn = document.body.classList.contains('dark-mode-body');

	if (darkModeOn) {
		switchMode.innerHTML = '<i class="fa-solid fa-sun"></i>';
	} else if (!darkModeOn) {
		switchMode.innerHTML = '<i class="fa-solid fa-moon"></i>';
	}
});
