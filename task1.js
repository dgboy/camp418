const readlineSync = require('readline-sync');

function random(min=0, max=9) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeNumber() {
	const len = random(3, 6);
	let mystery = String(random(1, 9));
	let num;

	for(let i = 1; i < len; i++) {
		do {
			num = random();
		} while (mystery.includes(num));

		mystery += num;
	}

	return mystery;
};
function giveHint(mistery, guess) {
	let len = (guess.length > mistery.length) ? guess.length : mistery.length;
	
	let hits = 0;
	let near = 0;

	let checked = '';
	let store = '';
	
	for (let i = 0; i < len; i++) {
		if(guess[i] == mistery[i]) {
			hits++;
			if(store.includes(guess[i])) {
				let id = store.indexOf(guess[i]); 
				store = store.slice(0, id) + store.slice(id + 1);
			}

			checked += guess[i];
		} else if (!store.includes(guess[i]) && !checked.includes(guess[i])) {
			store += guess[i];
		}
	}

	for (let i = 0; i < store.length; i++) {
		if(mistery.includes(store[i])) {
			near++;
		} 
	}

	console.log(`$ Чисел на своих местах: ${hits}`);
	console.log(`$ Чисел не на своих местах: ${near}`);
};


const mistery = makeNumber();
let attempts = 10; // Я не знаю как тут победить... Т_Т
let win = false;


console.log("- Ты пробудил меня от вечного сна и теперь тебе придётся сыграть со мной в игру.");
console.log(`- Я загадал число размером от 3 до 6 цифр. Ты должен его отгадать за ${attempts} попыток. На этом всё. Дерзай!\n`);

do {
	let guess = readlineSync.question("# Enter number: ");
	win = guess === mistery;

	if (!win) {
		attempts--;
		giveHint(mistery, guess);
		console.log(`- Неверно. Осталось попыток: ${attempts}\n`);
	}

} while (!win && attempts > 0);

if (win) {
	console.log(`\n- Верно! Ответ был ${mistery}. А ты достаточно догадлив. Поздравляю!!!\n`);
} else {
	console.log(`\n- Нет! Ответ был ${mistery}. У тебя больше нет попыток. Ты проиграл... Прощай.\n`);
}
