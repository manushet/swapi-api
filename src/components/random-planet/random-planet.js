import { useState, useEffect, useCallback } from 'react';
import setContent from '../../utils/setContent';
import './random-planet.css';
import withSwapiService from '../hoc-helpers/with-swapi-service';

const RandomPlanet = (props) => { 

    const [randomPlanet, setRandomPlanet] = useState({});
    const [process, setProcess] = useState('idle');
    const {getData} = props;

    const clearError = useCallback(() => {
        setProcess('loading');
      }, []);      
   
    const onRandomPlanetLoaded = (planet) => {
        setRandomPlanet({...planet});
        setProcess('loaded');
    }
    
    const updateRandomPlanet = () => {
        clearError();
        const id = Math.floor(Math.random() * 60) + 1;
        try {
            getData(id).then(planet => onRandomPlanetLoaded(planet));
        } 
        catch(e) {
            setProcess('error');
            throw e;
        } 
    }

    useEffect(() => {
        updateRandomPlanet();
        const randomTimer = setInterval(updateRandomPlanet, 360000);
        return () => {
            clearInterval(randomTimer);
        }
    }, []);

    return (
        <div className="random-planet jumbotron rounded" style={{minHeight: '182px', }}>
            {setContent(process, RandomPlanetView, randomPlanet, props)}
        </div>
    );
}

const RandomPlanetView = ({data}) => {
    return (
        <>
        <img className="planet-image" src={data.img} alt={data.name}/>
        <div>
            <h4>{data.name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span className="term">Population</span>
                    <span>{data.population}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Rotation Period</span>
                    <span>{data.rotation_period}</span>
                </li>
                <li className="list-group-item">
                    <span className="term">Diameter</span>
                    <span>{data.diameter}</span>
                </li>
            </ul>
        </div>
        </>
  )
}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        request: swapiService.request,
        clearError: swapiService.clearError,
        process: swapiService.process,
        setProcess: swapiService.setProcess,
    }
}

export default withSwapiService(RandomPlanet, mapMethodsToProps);
