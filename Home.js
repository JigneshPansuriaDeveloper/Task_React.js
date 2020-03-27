import React, { Component } from 'react';
import '../component/style.css';
import Pagination from '../component/Pagination';
import List from '../component/List';
import axios from 'axios';
const productApi ="http://localhost:3002/products";
const priceApi = "http://localhost:3002/price";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            JSON: [],
            currentPage: 1,
            todosPerPage: 4
        };
    }

    componentDidMount() {   
        const productData = axios.get(productApi);
        const priceData = axios.get(priceApi);
    // calling two api with promises
        axios.all([productData, priceData]).then(
                axios.spread((...responses) => {
                   console.log('main response',responses)
                    const productJson = responses[0];
                    console.log('product json',productJson)
                    const priceJson = responses[1];
                    console.log('priceJson',priceJson)
                let resArr=[];
                productJson.data.forEach(function(productData){ 
                    priceJson.data.forEach(function(priceData){ 
                        if(priceData.productId === productData.id){
                            resArr.push({id:productData.id,name:productData.name,price:priceData.price})
                        }
                        
                    });
            });                     
            this.setState({JSON:resArr})              
                }))
                .catch(errors => {console.error(errors);
            });

    }

    pageClick = (productId) => {
        this.setState({currentPage: Number(productId)});
    }

    render() {
        const { JSON, currentPage, todosPerPage } = this.state;
        
        return (
            <div>
                <List JSON={JSON} currentPage={currentPage} todosPerPage={todosPerPage}/>
                <Pagination JSON={JSON} currentPage={currentPage} todosPerPage={todosPerPage} pageOnClick={(event)=>this.pageClick(event)}/> 
             </div>
        );
    }
}

export default Home;
