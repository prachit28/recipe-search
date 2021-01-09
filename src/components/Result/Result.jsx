import React from 'react';
import './Result.css';

export default function Result(props) {
    let search = '';
    for(let key in props.params){
        if(props.params.hasOwnProperty(key) && props.params[key] !== '') {
            search += props.params[key] +', ';
        }
    }
    search = search.substring(0, search.length - 2);
    return (
        <div className="results">
            <h3>Search result for: {search}</h3>
            <table className="table">
                <thead>
                    <tr className="table-row table-header">
                        <th className="table-row-item w100">Image</th>
                        <th className="table-row-item">Quantity</th>
                        <th className="table-row-item">Unit</th>
                        <th className="table-row-item">Title</th>
                        <th className="table-row-item">Energy</th>
                        <th className="table-row-item flex-grow2">Nutrients</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.recipes.hits.map(hit => {
                            const { recipe } = hit;
                            return (
                                <tr className="table-row" key={recipe.uri}>
                                    <td className="table-row-item w100">
                                        <img src={recipe.image} alt={recipe.label} width="100" height="100"/>
                                    </td>
                                    <td className="table-row-item">{recipe.yield}</td>
                                    <td className="table-row-item">Servings</td>
                                    <td className="table-row-item">{recipe.label}</td>
                                    <td className="table-row-item"><b>{Math.round(recipe.calories)} kcal</b></td>
                                    <td className="table-row-item flex-grow2 al">
                                        <p>Protiens: <b>{Math.round(recipe.totalNutrients.PROCNT.quantity)} {recipe.totalNutrients.PROCNT.unit}</b></p>
                                        <p>Fats: <b>{Math.round(recipe.totalNutrients.FAT.quantity)} {recipe.totalNutrients.FAT.unit}</b></p>
                                        <p>Carbs: <b>{Math.round(recipe.totalNutrients.CHOCDF.quantity)} {recipe.totalNutrients.CHOCDF.unit}</b></p>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

