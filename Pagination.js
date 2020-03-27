 import React,{Fragment} from 'react';
 
 const Pagination=(props)=>{
  function handleClick(event) {
      props.pageOnClick(event.target.id); // calling parent component click event
    }
  
  const pageNos = [];
  for (let i = 1; i <= Math.ceil(props.JSON.length / props.todosPerPage); i++) {
    pageNos.push(i);
  }

  const displayPageNumber = pageNos.map(number => {
      return (
          <span  key={number}  id={number} onClick={handleClick}>
              {number} |
          </span>
      );
  });

   return(<Fragment>Pages - {displayPageNumber}</Fragment>
   )
  
 }
export default Pagination;