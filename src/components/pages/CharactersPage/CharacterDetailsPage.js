import React from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails, {Parameter} from '../../item-details/item-details';
import withSwapiService from '../../hoc-helpers/with-swapi-service';
import './characters-page.css';

const CharacterDetailsPage = (props) => {
    let { id } = useParams();
    
    return (
        <div className="row mb2">
            <div className="col-md-12">
                <ItemDetails selectedItem={id} {...props}>
                    <Parameter field="gender" label="Gender"/>
                    <Parameter field="birth_year" label="Birth Year"/>
                    <Parameter field="eye_color" label="Eye Color"/>
                    <Parameter field="hair_color" label="Hair Color"/>   
                    <Parameter field="skin_color" label="Skin Color"/>   
                    <Parameter field="mass" label="Mass"/>   
                </ItemDetails>           
            </div>
        </div>
    )
}

const mapMethodsToProps = (swapiService) => {
    return {
        getDetailData: swapiService.getPerson,
    }
  }
  
export default withSwapiService(CharacterDetailsPage, mapMethodsToProps);