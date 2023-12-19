import './style.scss';

interface Grocery {
	text: string;
	quantity?: number;
	completed: boolean;
	id: number;
}

const groceries: Array<Grocery> = [
	{
		text: 'carrot',
		quantity: 2,
		completed: false,
		id: 1,
	},
	{ text: 'apple', quantity: 3, completed: true, id: 2 },
	{ text: 'banana', quantity: 8, completed: false, id: 3 },
	{ text: 'cookies', quantity: undefined, completed: false, id: 4 },
];
const groceryList = document.querySelector('.list');
const button = document.querySelector('.add-button');
const input = document.querySelector('.text-input') as HTMLInputElement | null;

// wyswietl elementy listy w ul
renderGroceries();
function renderGroceries() {
	if (!groceryList) {
		return;
	}

	groceryList.innerHTML = '';
	groceries.forEach((grocery) => {
		const groceryLi = document.createElement('li');

		groceryLi.textContent = grocery.text;

		groceryList?.appendChild(groceryLi);
	});
}

button?.addEventListener('click', () => {
	if (!input?.value.trim()) {
		input!.value = '';
		return;
	}

	const newGrocery = {
		text: input.value,
		quantity: 2,
		completed: false,
		id: groceries.length + 1,
	};

	groceries.push(newGrocery);
	input.value = '';
	renderGroceries();
});
