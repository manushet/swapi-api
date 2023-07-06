import React from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails, {Parameter} from '../../item-details/item-details';
import withSwapiService from '../../hoc-helpers/with-swapi-service';
import './starships-page.css';

const CharacterDetailsPage = (props) => {
    let { id } = useParams();
    
    return (
        <div className="row mb2">
            <div className="col-md-12">
                <ItemDetails selectedItem={id} {...props}>
                    <Parameter field="manufacturer" label="Manufacturer"/>
                    <Parameter field="model" label="Model"/>
                    <Parameter field="starship_class" label="Starship Class"/>
                    <Parameter field="max_atmosphering_speed" label="Maximum Atmosphering Speed"/>
                    <Parameter field="hyperdrive_rating" label="Hyperdrive Rating"/>
                    <Parameter field="length" label="Length"/>
                    <Parameter field="cargo_capacity" label="Cargo Capacity"/>
                </ItemDetails>           
            </div>
        </div>
    )
}

const mapMethodsToProps = (swapiService) => {
    return {
        getDetailData: swapiService.getStarship,
    }
  }
  
export default withSwapiService(CharacterDetailsPage, mapMethodsToProps);