import React from 'react';

function useLocalStorage(itemName, initialValue){

	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const [item, setItem] = React.useState(initialValue); //Aquí creo la variable item y setItem, por lo que puedo usarlas después para actualizar los estados 
	
	React.useEffect(() => {
	  setTimeout(() => {
		try{
		  const localStorageItem = localStorage.getItem(itemName);
		  let parsedItem;
		  if (!localStorageItem){
			localStorage.setItem(itemName, JSON.stringify(initialValue));
			parsedItem = [];
			
		  } else{
			parsedItem = JSON.parse(localStorageItem);
		  }
		  setItem(parsedItem);
		  setLoading(false);
		}
		catch(error){
		  setError(error);
		}
  
  
  
	  },1000);
	});
  
	const saveItem = (newItem) => {
	  try{
		const stringifiedItem = JSON.stringify(newItem);
		localStorage.setItem(itemName, stringifiedItem);
		setItem(newItem);
	  }
	  catch(error){
		setError(error);  
	  }
	};
  
	return {
	  item,
	  saveItem,
	  loading,
	  error,
	};
  }

export { useLocalStorage };