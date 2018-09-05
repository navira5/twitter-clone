import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
   
    { props.items.map((item, i )=> <ListItem key={i} item={item}/>)}
  </div>
)        
export default List;