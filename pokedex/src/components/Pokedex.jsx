import React, {useState, useEffect} from 'react';

const Pokedex = () => {

    const [searchPokemon, setSearchPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        const catchPokemon = async (name) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                setPokemonData(data);
            } catch (error) {
                console.error("Error cannot fetch pokemon: ", error);
            }
        };
        catchPokemon();
    }, []);

    if(document.getElementById("search") == "") {
        window.alert("Please enter a pokemon name!");
        return;
    }

    const findPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`);
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            console.error("Error cannot fetch pokemon: ", error);
        }
    };

    return (
        <>
        <center><img id="imageTitle" alt="image" src="../Pokédex_logo.png"></img></center>
            
        <div className="container">

            <input id="searchPokemon" type="text" placeholder="Search Pokemon..." value={searchPokemon} onChange={(event) => setSearchPokemon(event.target.value)} />
            <button id="searchButton" type="button" onClick={findPokemon}>Search</button>

        </div>

            {pokemonData && (
                <div className="pokemon-card">
                <h3>{pokemonData.name.toUpperCase()}</h3>
                <img 
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                />
                <p><strong>Height: </strong> {pokemonData.height} ft</p>
                <p><strong>Weight: </strong> {pokemonData.weight} lbs</p>

                <h4>Abilities</h4>
                
                {pokemonData.abilities.map((a, index) => (
                    <li key={index}>{a.ability.name}</li>
                ))}
                
            </div>
        )}
     </>
    );
};

export default Pokedex;
