import React,{useState,useEffect} from "react";
import Recipe from "./Recipe.js";

import './App.css';

const App=()=> { 


  const APP_ID = "0ab6d157";
  const APP_KEY ="8ae9aaa08a6756c13f0f7a4367b8652b";
  const [recipes,setRecipes] = useState([]);
  const [search,setSearch]= useState('');
  const [query,setQuery] = useState('chicken');
  useEffect(() => { 
    getRecipes();
    },[query]);
   const getRecipes=async()=>{
      const response=await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data=await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
      };

      const updateSearch= e =>{
        setSearch(e.target.value);
      };
      const getSearch= e=>{
        e.preventDefault();
        setQuery(search);
        setSearch('');
      };

  return(
     <div className="App">
          <form onSubmit={getSearch} className="search-form">
            <input className='search-box' type='text' value={search}  onChange={updateSearch}/>
            <button className="search-button" type='submit'>
              Search
              </button>
            </form>
            <div className='recipes'>
            {recipes.map(recipe => (
              <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
              />
            ))}
            </div>
      </div>
  );
};
export default App;
