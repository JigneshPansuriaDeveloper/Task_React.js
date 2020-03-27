import React from 'react';
const styles={'border':'1px solid black','list-style-type':'none','border-style': 'ridge'}
const colorStyles={'background-color':'red'}

const List =(props)=>{
    const {JSON, currentPage, todosPerPage}=props;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = JSON.slice(indexOfFirstTodo, indexOfLastTodo);
   
    return currentTodos.map((data, index) => {
    return (<li key={index} style={styles} >
        <p>Product:{data.name}-<span style={colorStyles}> Price:${data.price}</span></p>
        </li>);
    });

}

export default List;