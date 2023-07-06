import ItemList from '../../item-list';
import ItemDetails, {Parameter} from '../../item-details/item-details';
import withSwapiService from '../../hoc-helpers/with-swapi-service';
import { useState } from 'react';
import './starships-page.css';

const StarshipsPage = (props) => {  
    const [selectedItem, setSelectedItem] = useState(null);
    
    const onSelectedItem = (id) => {
        setSelectedItem(id);
    }    

    const items = (
        <ItemList onSelectedItem={onSelectedItem} {...props}>
            {(i) => `${i.name}, ${i.starship_class} (${i.model})`}
        </ItemList>
    );

    const details = (
        <ItemDetails selectedItem={selectedItem} {...props}>
            <Parameter field="manufacturer" label="Manufacturer"/>
            <Parameter field="model" label="Model"/>
            <Parameter field="starship_class" label="Starship Class"/>
            <Parameter field="max_atmosphering_speed" label="Maximum Atmosphering Speed"/>
        </ItemDetails>
    );

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
        getData: swapiService.getAllStarships,
        getDetailData: swapiService.getStarship,
        dataType: 'starships',
    }
  }
  
  export default withSwapiService(StarshipsPage, mapMethodsToProps);