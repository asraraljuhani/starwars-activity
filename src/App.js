import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import vehicleImage from './assets/snowspeeder.png';
import SpecieImage from './assets/species.png';
import starshipImage from './assets/starship.png';
import CharacterCard from './components/CharacterCard';
import FigureCard from './components/FigureCard';
import FilmCard from './components/FilmCard';
import InfoBox from './components/InfoBox';




const App = (props) => {


  const isMountedRef = useRef(true);
  const baseUrl = 'https://swapi.dev/api/';


  const [selectCharacter, setSelectedCharacter] = useState({})
  const [characters, setCharacters] = useState([])
  const [films, setFilms] = useState([])
  const [species, setSpecies] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [starships, setStarships] = useState([])


  useEffect(() => {
    getAllCharacter();
    getCharacter();
    return () => { isMountedRef.current = false; };
  }, [])

  function getAllCharacter() {
    var allCharacter;
    characters.length = 0;
    fetch(baseUrl + 'people/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    })
      .then(response => response.json())
      .then(data => data.results)
      .then(async (results) => {
        allCharacter = await results;
      }).then(() => {

        for (let i = 0; i < 10; i++) {
          let element = allCharacter[i];
          // element = JSON.stringify(element)
          characters.push(element)
        }

      }).then(console.log('characters obj : ', characters));

    return allCharacter;


  }

  function getCharacter() {
    // selectCharacter.length = 0;
    let url = baseUrl + 'people/1/';
    getCharacterByUrl(url);
    console.log('selectCharacter ', selectCharacter);
    return selectCharacter;
  }

  function getCharacterByUrl(url) {

    console.log('url ', url)
    var singleCharacter = {};
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        singleCharacter = await data;
      })
      .then(() => {
        selectCharacter.name = singleCharacter.name;
        selectCharacter.birth_year = singleCharacter.birth_year;
        selectCharacter.eye_color = singleCharacter.eye_color;
        selectCharacter.hair_color = singleCharacter.hair_color;
        selectCharacter.skin_color = singleCharacter.skin_color;
        selectCharacter.gender = singleCharacter.gender;
        selectCharacter.height = singleCharacter.height;
        selectCharacter.mass = singleCharacter.mass;
        // console.log('selectCharacter obj : ', selectCharacter);
        //
        films.length = 0;
        species.length = 0;
        vehicles.length = 0;
        starships.length = 0;

        let FilmsData = singleCharacter.films;
        FilmsData.map(url => getCharacterFilmByUrl(url))

      });

  }

  function getCharacterFilmByUrl(url) {
    var singleFilm = {};
    if (typeof url === 'undefined') url = baseUrl + 'films/1/';
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        singleFilm = await data;
        films.push(singleFilm)
      })
      .then(() => {
        singleFilm.species.map(url => getCharacterSpeiceByUrl(url))
        singleFilm.starships.map(url => getCharacterStarshipsByUrl(url))
        singleFilm.vehicles.map(url => getCharacterVehiclesByUrl(url))
      });
  }

  function getCharacterSpeiceByUrl(url) {
    var singleSpeice = {};
    if (typeof url === 'undefined') url = baseUrl + 'species/1/';
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        singleSpeice = await data;
        species.push(singleSpeice)
      })
      .then(() => {
        // console.log('singleSpeice ', singleSpeice);
        // console.log('species obj : ', species);
      });
  }

  function getCharacterStarshipsByUrl(url) {
    var singleStarship = {};
    if (typeof url === 'undefined') url = baseUrl + 'starships/2/';
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        singleStarship = await data;
        starships.push(singleStarship)
      })
      .then(() => {
        // console.log('singleStarship ', singleStarship);
        // console.log('starships obj : ', starships);
      });
  }

  function getCharacterVehiclesByUrl(url) {
    var singleVehicle = {};
    if (typeof url === 'undefined') url = baseUrl + 'vehicles/4/';
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        singleVehicle = await data;
        vehicles.push(singleVehicle)

      })
      .then(() => {
        // console.log('singleVehicle ', singleVehicle);
        // console.log('vehicles obj : ', vehicles);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <div id='stars'></div>
        <div className="characters-box">
          {!_.isEmpty(characters) &&
            characters.map((character) =>
            (<CharacterCard character={character} getCharacter={() => getCharacterByUrl(character.url)} />
            ))}
          {_.isEmpty(characters) &&
            (
              <div> No Characters to show </div>
            )}
        </div>

        <div className="detail-box">
          <div className="detail-content">
            <div>
              {!_.isEmpty(selectCharacter) && (
                <>
                  <InfoBox title="Name" characterInfo={selectCharacter.name} />
                  <InfoBox title="Birth Year" characterInfo={selectCharacter.birth_year} />
                  <InfoBox title="Eye Color" characterInfo={selectCharacter.eye_color} />
                  <InfoBox title="Hair Color" characterInfo={selectCharacter.hair_color} />

                  <InfoBox title="Skin Color" characterInfo={selectCharacter.skin_color} />
                  <InfoBox title="Gender" characterInfo={selectCharacter.gender} />
                  <InfoBox title="Height" characterInfo={selectCharacter.height} />
                  <InfoBox title="Mass" characterInfo={selectCharacter.mass} />
                </>
              )}

              {_.isEmpty(selectCharacter) && (
                <>
                  <div> No Character to show </div>
                </>
              )}

            </div>

            {!_.isEmpty(films) && (
              <>
                <InfoBox title="Films" characterInfo={''} />
                <div className="list">
                  {films.map((film) => (<FilmCard film={film} />))}
                </div>
              </>
            )}


            {!_.isEmpty(species) && (
              <>
                <InfoBox title="Species" characterInfo={''} />
                <div className="list">
                  {species.map((specie) => (<FigureCard figure={specie} figureImage={SpecieImage} />))}
                </div>
              </>
            )}


            {!_.isEmpty(starships) && (
              <>
                <InfoBox title="Starships" characterInfo={''} />
                <div className="list">
                  {starships.map((starship) =>
                    (<FigureCard figure={starship} figureImage={starshipImage} />))}
                </div>
              </>
            )}


            {!_.isEmpty(vehicles) && (
              <>
                <InfoBox title="Vehicles" characterInfo={''} />
                <div className="list">
                  {vehicles.map((vehicle) =>
                    (<FigureCard figure={vehicle} figureImage={vehicleImage} />))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
