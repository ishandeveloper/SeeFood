import React from 'react';
import style from './recipe.module.css';

const Recipe = ({title, calories, image, ingredients}) => {
  return(
  <div className={style.recipe}>
       <img src={image} className={style.image} />
      <h1 className={style.heading}>{title}</h1>
      <ol>
        {ingredients.map(ingredient => (
          <li className={style.listItems}>{ingredient.text}</li>
        ))}
      </ol>
   
    </div>
  );
}

export default Recipe;
