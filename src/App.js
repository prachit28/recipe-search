import React from 'react';
import Search from './components/Search/Search';
import Result from './components/Result/Result';
import PreviousSearch from './components/PreviousSearch/PreviousSearch';
import './App.css';

const API_URL = 'https://api.edamam.com/search';
const API_KEY = '&app_key=d120e1a9d2e6659d944b95aa9e50a217';
const APP_ID = '&app_id=ffd6e01d'
class App extends React.Component {

    state = {
        recipes: null,
        loading: false,
        lastFiveSearch: [],
    }

    searchRecipe = params => {
        if(!this.state.loading) {

            let queryParams = '?';
            for( let key in params) {
                if(params.hasOwnProperty(key) && params[key] !== '') {
                    queryParams += `${key}=${params[key]}&`;
                }
            }
            queryParams = queryParams.substring(0, queryParams.length - 1);
            if(queryParams) {
                this.setState({ loading: true });
                fetch(`${API_URL}${queryParams}${APP_ID}${API_KEY}`)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({ loading: false })
                        if(data.hits && data.hits.length > 0) {
                            let lastSearchs = [...this.state.lastFiveSearch];
                            if(lastSearchs.length >= 5) {
                                lastSearchs.splice(0,1)
                            }
                            lastSearchs.push(params);
                            this.setState({
                                params: params,
                                lastFiveSearch: [...lastSearchs],
                                recipes: data
                            });
                        }
                    })
                    .catch(e => {
                        this.setState({loading: false})
                        console.error(e)
                    });
            }
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Recipe</h1>
                <Search searchRecipe={this.searchRecipe}/>
                {this.state.loading ? <div className="loader"/> : null}
                {this.state.lastFiveSearch.length > 0 && <PreviousSearch previous={this.state.lastFiveSearch} />}
                {this.state.recipes && <Result recipes={this.state.recipes} params={this.state.params}/>}
            </div>
        );
    }
}

export default App;
