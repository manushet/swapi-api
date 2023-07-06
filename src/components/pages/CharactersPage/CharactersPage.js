import ItemList from '../../item-list';
import ItemDetails, {Parameter} from '../../item-details/item-details';
import withSwapiService from '../../hoc-helpers/with-swapi-service';
import { useState } from 'react';
import './characters-page.css';

const CharactersPage = (props) => {  
    const [selectedItem, setSelectedItem] = useState(null);
    
    const onSelectedItem = (id) => {
        setSelectedItem(id);
    }    

    const items = (
        <ItemList onSelectedItem={onSelectedItem} {...props}>
            {(i) => `${i.name}, ${i.gender} (${i.birth_year})`}
        </ItemList>
    );

    const details = (
        <ItemDetails selectedItem={selectedItem} {...props}>
            <Parameter field="gender" label="Gender"/>
            <Parameter field="birth_year" label="Birth Year"/>
            <Parameter field="eye_color" label="Eye Color"/>
            <Parameter field="hair_color" label="Hair Color"/>
        </ItemDetails>
    );
/*
    const Row = ({left, right}) => {
        return (
            <div className="row mb2">
                <div className="col-md-6">
                    {left}
                </div>
                <div className="col-md-6">
                    {right}
                </div>
            </div>
        );
    }
*/
    return (
        <>
            <div className="row mb2">
                <div className="col-md-6">
                    {items}
                </div>
                <div className="col-md-6">
                    {details}
                </div>
            </div>
        </>
    )
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople,
        getDetailData: swapiService.getPerson,
        dataType: 'characters',
    }
  }
  
  export default withSwapiService(CharactersPage, mapMethodsToProps);