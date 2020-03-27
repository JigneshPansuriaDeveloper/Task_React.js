import React, { Component } from 'react';
import axios from 'axios';
import '../component/style.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            JSON: [],
            currentPage: 1,
            todosPerPage: 1
        };
    }

    componentDidMount() {
        let productApi ="http://localhost:3002/products";
        let priceApi = "http://localhost:3002/price";


        const productData = axios.get(productApi);
        const priceData = axios.get(priceApi);


        axios.all([productData, priceData]).then(
                axios.spread((...responses) => {
                    const productJson = responses[0];
                    const priceJson = responses[1];
              
            let resArr=[];
            productJson.data.forEach(function(productData){ 
                priceJson.data.forEach(function(priceData){ 
                    if(priceData.productId === productData.id){
                        resArr.push({id:productData.id,name:productData.name,price:priceData.price})
                    }
                    
                });
            });                     
                this.setState({JSON:resArr})              
                })).catch(errors => {
                            // react on errors.
                            console.error(errors);
                        });

    }

    pageClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { JSON, currentPage, todosPerPage } = this.state;
        //console.log('>>',JSON);
        // Logic for displaying current JSON
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = JSON.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((data, index) => {
        return <li key={index}>Product:{data.name}-Price:${data.price}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(JSON.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.pageClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <ul>
                    {renderTodos}
                </ul>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}

export default Home;
