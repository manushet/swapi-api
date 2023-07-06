import React from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails, {Parameter} from '../../item-details/item-details';
import withSwapiService from '../../hoc-helpers/with-swapi-service';
import './planets-page.css';

const CharacterDetailsPage = (props) => {
    let { id } = useParams();
    
    return (
        <div className="row mb2">
            <div className="col-md-12">
                <ItemDetails selectedItem={id} {...props}>
                    <Parameter field="diameter" label="Diameter"/>
                    <Parameter field="rotation_period" label="Rotation Period"/>
                    <Parameter field="climate" label="Climate"/>
                    <Parameter field="population" label="Population"/>
                    <Parameter field="surface_water" label="Surface Water"/>
                    <Parameter field="terrain" label="Terrain"/>
                </ItemDetails>           
            </div>
        </div>
    )
}

const mapMethodsToProps = (swapiService) => {
    return {
        getDetailData: swapiService.getPlanet,
    }
  }
  
export default withSwapiService(CharacterDetailsPage, mapMethodsToProps);