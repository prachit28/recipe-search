import React, { Component } from 'react';
import { DIET, DISH_TYPE, CUISINE_TYPE, MEAL_TYPE, HEALTH } from '../../data/recipeData';
import './Search.css';

export default class Search extends Component {

    state = {
        filters: false,
        q: '',
        cuisineType: '',
        mealType: '',
        dishType: '',
        health: '',
        diet: '',
        calories: '',
        time: '',
    }

    toggleFilters = () => this.setState({ filters: !this.state.filters })

    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value })

    onSearchHandler = () => {
        const { filters, ...params} = this.state;
        this.props.searchRecipe(params);
    }

    render() {
        const { q, filters, cuisineType, mealType, dishType, health, diet, calories, time } = this.state;
        return (
            <div className="search-container">
                <div className="search-box">

                    <input type="search" placeholder="Search" value={q} name="q" onChange={this.onChangeHandler}/>

                    {
                        filters &&
                        <div className="filters">
                            <select value={cuisineType} name="cuisineType" onChange={this.onChangeHandler}>
                                <option value="" key="0">Select Cuisine Type</option>
                                { CUISINE_TYPE.map(o => <option value={o.value} key={o.id}>{o.value}</option>) }
                            </select>
                            <select value={mealType} name="mealType" onChange={this.onChangeHandler}>
                                <option value="" key="0">Select Meal Type</option>
                                { MEAL_TYPE.map(o => <option value={o.value} key={o.id}>{o.value}</option>) }
                            </select>
                            <select value={dishType} name="dishType" onChange={this.onChangeHandler}>
                                <option value="" key="0">Select Dish Type</option>
                                { DISH_TYPE.map(o => <option value={o.value} key={o.id}>{o.value}</option>) }
                            </select>
                            <select value={health} name="health" onChange={this.onChangeHandler}>
                                <option value="" key="0">Select Health</option>
                                { HEALTH.map(o => <option value={o.value} key={o.id}>{o.label}</option>) }
                            </select>
                            <select value={diet} name="diet" onChange={this.onChangeHandler}>
                                <option value="" key="0">Select Diet</option>
                                { DIET.map(o => <option value={o.value} key={o.id}>{o.label}</option>) }
                            </select>
                            <input type="text" placeholder="Calories" name="calories" value={calories} onChange={this.onChangeHandler}/>
                            <input type="text" placeholder="Time" name="time" value={time} onChange={this.onChangeHandler}/>
                        </div>
                    }
                    <button onClick={this.onSearchHandler}><i className="fas fa-search"></i> Search</button>
                    <button onClick={this.toggleFilters}><i className="fas fa-filter"></i> Filters</button>
                </div>
            </div>
        )
    }
}

