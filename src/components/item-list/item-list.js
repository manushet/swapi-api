import { useState, useEffect, useMemo, useCallback } from 'react';
import setContent from '../../utils/setContent';
import './item-list.css';

const ItemList = (props) => {
  
  const [itemList, setItemList] = useState([]);
  const {getData, onSelectedItem} = props;  
  const [process, setProcess] = useState('idle');
 
  const onItemListLoaded = (items) => {     
    setItemList(items);
    setProcess('loaded');
    //console.log(items);
  }

  const loadItemList = () => {
    clearError();
    setProcess('loading');
    try {
      getData().then(res => onItemListLoaded(res));
    } 
    catch(e) {
        setProcess('error');
        throw e;
    }    
  } 

  const clearError = useCallback(() => {
    setProcess('loading');
  }, []); 

  useEffect(() => {
    loadItemList();
  }, []);

  const renderItems = (arr) => {
    const items = arr.map(item => {
      const {id} = item;
      const label = props.children(item);
      return (
        <li className="list-group-item" key={id} onClick={() => onSelectedItem(id)}>{label}</li>
      )
    });
 
    return (
      <ul className="item-list list-group">
        {items} 
      </ul>
    );    
  }

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(itemList), itemList, props);
  }, [renderItems]);
 
  return (
    <>
      {elements} 
    </>
  );
}

export default ItemList;
