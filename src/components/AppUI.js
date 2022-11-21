import React from 'react';
import { TodoContext } from './TodoContext';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from "./TodoSearch.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";
import { TodoForm } from "./TodoForm.js";
import { CreateTodoButton } from "./CreateTodoButton.js";
import { Modal } from './Modal';

function AppUI() {
	const { error, 
			loading, 
			searchedTodos, 
			completeTodo, 
			deleteTodo,
			openModal,
			setOpenModal,
		} = React.useContext(TodoContext);
	
	return (
		<React.Fragment>
			<TodoCounter />
			<TodoSearch />
			
			<TodoList>
			{ error && <p>error...</p>}
			{ loading && <p>Estamos cargando...</p>}
			{ (!loading && !searchedTodos.length) && <p>Crea tu primer TO DO!</p>}

			{searchedTodos.map(todo => (
				<TodoItem
				key={todo.text}
				text={todo.text}
				completed={todo.completed}
				onComplete = {() => completeTodo(todo.text)}
				onDelete = {() => deleteTodo(todo.text)}
				/>
			))}

			</TodoList>

			{!!openModal && (
				<Modal >
					<TodoForm>

					</TodoForm>
				</Modal>
			)}
			


			<CreateTodoButton 
				setOpenModal = {setOpenModal}
			/>
		</React.Fragment>
		
	);
}

export { AppUI };
  