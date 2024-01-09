import './style.scss';

interface Grocery {
	text: string;
	quantity?: number;
	completed: boolean;
	id: number;
}

let groceries: Array<Grocery> = [];
const groceryList = document.querySelector('.list');
const addBtn = document.querySelector('.add-button');
const clearBtn = document.querySelector('.clear-button');
const input = document.querySelector('.text-input') as HTMLInputElement | null;

function init(): void {
	const groceriesElements = localStorage.getItem('groceries');

	if (groceriesElements) {
		const parsedGroceries = JSON.parse(groceriesElements);
		groceries = parsedGroceries;
		renderGroceries();
	}
}

function saveToLocalStorage(): void {
	localStorage.setItem('groceries', JSON.stringify(groceries));
}

// wyswietl elementy listy w ul
function renderGroceries(): void {
	if (!groceryList) {
		return;
	}

	groceryList.innerHTML = '';
	groceries.forEach((grocery) => {
		const groceryLi = document.createElement('li');

		const groceryText = document.createElement('span');
		groceryText.textContent = grocery.text;

		const groceryDeleteBtn = document.createElement('button');
		groceryDeleteBtn.innerHTML = 'Delete';
		groceryDeleteBtn.addEventListener('click', () => deleteGroceryItem(grocery.id));

		const groceryEditBtn = document.createElement('button');
		groceryEditBtn.innerHTML = 'Edit';
		groceryEditBtn.addEventListener('click', () => editGroceryItem(grocery.id));

		const groceryCheckbox = document.createElement('input');
		groceryCheckbox.type = 'checkbox';
		groceryCheckbox.checked = grocery.completed;
		if (grocery.completed) {
			groceryLi.className = 'item-completed';
		}
		groceryCheckbox.addEventListener('change', () => toggleCompletedStatus(grocery.id));

		groceryLi.appendChild(groceryCheckbox);
		groceryLi.appendChild(groceryText);
		groceryLi.appendChild(groceryDeleteBtn);
		groceryLi.appendChild(groceryEditBtn);
		groceryList?.appendChild(groceryLi); // ? - pobieramy z drzewa DOM i to moze byc nullem dlatego jest optional chaining
	});
}

function toggleCompletedStatus(id: number): void {
	const indexOfGroceryElement = groceries.findIndex((element) => element.id === id);
	groceries[indexOfGroceryElement].completed = !groceries[indexOfGroceryElement].completed;

	saveToLocalStorage();
	renderGroceries();
}

function deleteGroceryItem(id: number): void {
	groceries = groceries.filter((element) => element.id !== id);

	saveToLocalStorage();
	renderGroceries();
}

function editGroceryItem(id: number): void {
	const indexOfGroceryElement = groceries.findIndex((element) => element.id === id);

	const editedText = prompt('Make a change:', groceries[indexOfGroceryElement].text);
	if (!editedText?.trim()) {
		return;
	}
	groceries[indexOfGroceryElement].text = editedText;

	saveToLocalStorage();
	renderGroceries();
}

function addGroceryItem(): void {
	if (!input?.value.trim()) {
		input!.value = '';
		return;
	}

	const uniqueNumber = new Date().getTime();
	const todaysDate = new Date().toISOString();

	const newGrocery = {
		text: input.value,
		quantity: 2,
		completed: false,
		id: uniqueNumber,
		date: todaysDate,
	};

	groceries.push(newGrocery);
	saveToLocalStorage();
	input.value = '';
	renderGroceries();
}

function clearGroceryList(): void {
	groceries = [];

	saveToLocalStorage();
	renderGroceries();
}

addBtn?.addEventListener('click', addGroceryItem);
clearBtn?.addEventListener('click', clearGroceryList);

init();
