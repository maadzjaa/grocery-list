import './style.scss';

const groceries = [
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

// wyswietl elementy listy w ul
function renderGroceries() {
	const groceryList = document.querySelector('.list');

	groceries.forEach((grocery) => {
		const groceryLi = document.createElement('li');
		groceryLi.textContent = grocery.text;

		groceryList?.appendChild(groceryLi);
	});
}
renderGroceries();
