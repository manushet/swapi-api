import Header from '../header';
import RandomPlanet from '../random-planet';
import CharactersPage from '../pages/CharactersPage';
import MainPage from '../pages/MainPage';
import CharacterDetailsPage from '../pages/CharactersPage/CharacterDetailsPage';
import PlanetDetailsPage from '../pages/PlanetsPage/PlanetDetailsPage';
import StarshipDetailsPage from '../pages/StarshipsPage/StarshipDetailsPage';
import PlanetsPage from '../pages/PlanetsPage';
import StarshipsPage from '../pages/StarshipsPage';
import useSwapiService from '../../services/swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './app.css';

const App = () => {
  
  const swapiService = useSwapiService();
  return (
    <SwapiServiceProvider value={swapiService}>   
      <BrowserRouter>
        <Header />
        <RandomPlanet />         
        <Routes>
          <Route path="/" element={<MainPage/>}/>       
          <Route path="/characters/" element={<CharactersPage/>}/>
          <Route path="/characters/:id" element={<CharacterDetailsPage/>}/>
          <Route path="/planets/" element={<PlanetsPage/>}/>
          <Route path="/planets/:id" element={<PlanetDetailsPage/>}/>
          <Route path="/starships/" element={<StarshipsPage/>}/>   
          <Route path="/starships/:id" element={<StarshipDetailsPage/>}/>           
        </Routes>
      </BrowserRouter>
    </SwapiServiceProvider>
  );
};
 
export default App;