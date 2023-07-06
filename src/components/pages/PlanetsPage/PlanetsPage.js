import ItemList from '../../item-list';
import ItemDetails, {Parameter} from '../../item-details/item-details';
import withSwapiService from '../../hoc-helpers/with-swapi-service';
import { useState } from 'react';
import './planets-page.css';

const PlanetsPage = (props) => {  
    const [selectedItem, setSelectedItem] = useState(null);
    
    const onSelectedItem = (id) => {
        setSelectedItem(id);
    }    

    const items = (
        <ItemList onSelectedItem={onSelectedItem} {...props}>
            {(i) => `${i.name}, ${i.diameter}`}
        </ItemList>
    );

    const details = (
        <ItemDetails selectedItem={selectedItem} {...props}>
            <Parameter field="diameter" label="Diameter"/>
            <Parameter field="rotation_period" label="Rotation Period"/>
            <Parameter field="climate" label="Climate"/>
            <Parameter field="population" label="Population"/>
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
        getData: swapiService.getAllPlanets,
        getDetailData: swapiService.getPlanet,
        dataType: 'planets',
    }
  }
  
  export default withSwapiService(PlanetsPage, mapMethodsToProps);