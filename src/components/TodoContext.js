import React from 'react';
import { useLocalStorage } from './UseLocalStorage';



const TodoContext = React.createContext();

function TodoProvider(props){
	const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', []);
	const [searchValue, setSearchValue] = React.useState('');
	const [openModal, setOpenModal] = React.useState(false);


	const completedTodos = todos.filter(todo => !!todo.completed).length;
	const totalTodos = todos.length;

	let searchedTodos = [];
	if(!searchValue.length >= 1){
		searchedTodos = todos;
	}
	else{
		searchedTodos = todos.filter(todo => {
		const todoText = todo.text.toLowerCase();
		const searchedText = searchValue.toLocaleLowerCase();
		return todoText.includes(searchedText);
		})
	}

	// Función para añadir un nuevo TODO
	const addTodo = (text) => {
		const newTodos = [...todos];
		newTodos.push({
			completed: false,
			text,
		});
		saveTodos(newTodos);
	};


	const completeTodo = (text) => {
		const todoIndex = todos.findIndex(todo => todo.text == text);
		const newTodos = [...todos];
		newTodos[todoIndex].completed = true;
		//Aquí actualizamos el estado
		saveTodos(newTodos);
	};

	const deleteTodo = (text) => {
		const todoIndex = todos.findIndex(todo => todo.text == text);
		const newTodos = [...todos];
		newTodos.splice(todoIndex,1);
		//Aquí actualizamos el estado
		saveTodos(newTodos);
	};

	console.log('Render (antes del use effect')

	React.useEffect(() => {
		console.log('use effect')
	}, [totalTodos])
	console.log('Render (después del use effect')
	

	return(
		<TodoContext.Provider value = {{
			loading,
			error,
			totalTodos,
			completedTodos,
			searchValue,
			setSearchValue,
			searchedTodos,
			addTodo,
			completeTodo,
			deleteTodo,	
			openModal,
			setOpenModal,
		}}>
			{props.children}
		</TodoContext.Provider>


	);

}
export { TodoContext, TodoProvider };

