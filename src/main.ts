import './style.scss';

interface Grocery {
	text: string;
	quantity?: number;
	completed: boolean;
	id: number;
}

let groceries: Array<Grocery> = [];
const groceryList = document.querySelector('.list');
const button = document.querySelector('.add-button');
const input = document.querySelector('.text-input') as HTMLInputElement | null;

function init(): void {
	const groceriesElements = localStorage.getItem('groceries');

	if (groceriesElements) {
		const parsedGroceries = JSON.parse(groceriesElements);
		groceries = parsedGroceries;
		renderGroceries();
	}
}

// wyswietl elementy listy w ul
function renderGroceries(): void {
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

function addGroceryItem(): void {
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
	localStorage.setItem('groceries', JSON.stringify(groceries));
	input.value = '';
	renderGroceries();
}

button?.addEventListener('click', addGroceryItem);

init();
