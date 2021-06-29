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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getAllCharacter() {
    if (!characters.length) {
      let allCharacter;
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
          setCharacters(prevCharacters => ([...prevCharacters, ...allCharacter]))
        })
    }
  }

  function getCharacter() {
    if (!selectCharacter.length) {
      let url = baseUrl + 'people/1/';
      getCharacterByUrl(url);
    }
  }

  function getCharacterByUrl(url) {
    let character = {};
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        character = await data;
      })
      .then(() => {
        setSelectedCharacter(() => (character))

        // clear films, species, starships, vehicles
        setFilms(() => ([]))
        setSpecies(() => ([]))
        setVehicles(() => ([]))
        setStarships(() => ([]))

        // get films, species, starships, vehicles
        character.films.map(url => getCharacterFilmByUrl(url))
        character.species.map(url => getCharacterSpeiceByUrl(url))
        character.starships.map(url => getCharacterStarshipsByUrl(url))
        character.vehicles.map(url => getCharacterVehiclesByUrl(url))
      });

  }

  function getCharacterFilmByUrl(url) {
    let film = {};
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        film = await data;
        setFilms(prevFilms => ([...prevFilms, film]))
      })

  }

  function getCharacterSpeiceByUrl(url) {
    let speice = {};
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        speice = await data;
        setSpecies(prevSpecies => ([...prevSpecies, speice]))
      })

  }

  function getCharacterStarshipsByUrl(url) {
    let starship = {};
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        starship = await data;
        setStarships(prevStarships => ([...prevStarships, starship]))
      })

  }

  function getCharacterVehiclesByUrl(url) {
    let vehicle = {};
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        vehicle = await data;
        setVehicles(prevVehicles => ([...prevVehicles, vehicle]))
      })

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
