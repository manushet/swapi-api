import { useHttp } from "../hooks/http.hook";
const useSwapiService = () => {

  const _apiBase = 'https://swapi.dev/api';
  
  const { request, clearError, process, setProcess } = useHttp();

  const _getImageUrl = async (type, id) => {
    const img_placeholder = `https://starwars-visualguide.com/assets/img/big-placeholder.jpg`;
    const img = `https://starwars-visualguide.com/assets/img/${type}/${id}.jpg`;         
    let res = await fetch(img);     
    return res.ok ? img : img_placeholder;
  }

  const _extractId = (url) => {
    const regex = /\/(\d+)\//;
    return url.match(regex)[1];
  }    

  const combineProperties = (person, id, img) => {
    return {...person, id: id, img: img};
  }

  const _transformPerson = async (person) => {
    const id = _extractId(person.url);
    const img = await _getImageUrl('characters', id);
    const item = await combineProperties(person, id, img);
    return item;
  }

  const _transformPlanet = async (planet) => {
    const id = _extractId(planet.url);
    const img = await _getImageUrl('planets', id);
    return {...planet, id: id, img: img};
  }

  const _transformStarship = async (starship) => {
    const id = _extractId(starship.url);
    const img = await _getImageUrl('starships', id);
    return {...starship, id: id, img: img};
  }  

  const getAllPeople = async () => {
    const res = await request(`${_apiBase}/people/`);
    const items = await Promise.all(res.results.map(async (item) => {
      const dop = await _transformPerson(item);
      return {...item, ...dop};
    }));
    return items;
  }

  const getPerson = async (id) => {
    const res = await request(`${_apiBase}/people/${id}/`);
    return _transformPerson(res);
  }

  const getAllPlanets = async () => {
    const res = await request(`${_apiBase}/planets/`);
    const items = await Promise.all(res.results.map(async (item) => {
      const dop = await _transformPlanet(item);
      return {...item, ...dop};
    }));
    return items;    
  }

  const getPlanet = async (id) => {
      const res = await request(`${_apiBase}/planets/${id}/`);
      return _transformPlanet(res);
  }

  const getAllStarships = async () => {
    const res = await request(`${_apiBase}/starships/`);
    const items = await Promise.all(res.results.map(async (item) => {
      const dop = await _transformStarship(item);
      return {...item, ...dop};
    }));
    return items;
  }

  const getStarship = async (id) => {
    const res = await request(`${_apiBase}/starships/${id}/`);
    return _transformStarship(res);    
  }

	return {
      clearError,
      process,
      setProcess,
      getAllPeople,
      getPerson,
      getAllPlanets,
      getPlanet,
      getAllStarships,
      getStarship,
	};  
}

export default useSwapiService;