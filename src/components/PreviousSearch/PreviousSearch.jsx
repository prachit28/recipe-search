import React from 'react';
import './PreviousSearch.css';

export default function PreviousSearch(props) {

    let html = props.previous.map((params, index) => {
        let searchKeywords = '';
        for(let key in params){
            if(params.hasOwnProperty(key) && params[key] !== '') {
                searchKeywords += params[key] +', ';
            }
        }
        searchKeywords = searchKeywords.substring(0, searchKeywords.length - 2);
        return <span key={index}>{searchKeywords}</span>
    });

    return (
        <div className="previous-search">
            Previous Searches: {html}
        </div>
    )
}
