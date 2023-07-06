import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import setContent from '../../utils/setContent';
import { Link } from 'react-router-dom';
import './item-details.css';

const ItemDetails = (props) => {
  const {getDetailData, dataType, selectedItem} = props;
  const [charInfo, setCharInfo] = useState({});
  const [process, setProcess] = useState('idle');

  const clearError = useCallback(() => {
    setProcess('loading');
  }, []);   
  
  useEffect(() => {
    updateCharInfo();
  }, [selectedItem])

  const updateCharInfo = () => {
    if (!selectedItem) {
        return;
    }

    clearError();
    try {
      getDetailData(selectedItem).then(onCharLoaded);
    } 
    catch(e) {
        setProcess('error');
        throw e;
    }  
  }   

  const onCharLoaded = (char) => {
    setCharInfo(char);
    setProcess('loaded');
    console.log(char);
  }

  const CharView = ({data, children, selectedItem}) => { 
    return (
      <>
        <img className="item-image" src={data.img} alt={data.name}/>
        <div className="card-body">
          <h4><Link to={`/${dataType}/${data.id}`}>{data.name}</Link></h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(children, child => {
                return React.cloneElement(child, {data});
              })
            }
          </ul>
        </div>
      </>
    );
  }  

  const content = setContent(process, CharView, charInfo, props);
 
  return (
      <div className="item-details card">
        {content ? content : `Please select one of the ${dataType} to view details`}  
      </div>
    )
}

export const Parameter = ({data, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{data[field]}</span>
    </li>
  );
}

export default ItemDetails;
