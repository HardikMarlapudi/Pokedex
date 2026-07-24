import React, {useState} from "react";

const Pokedex = () => {

    const [searchPokemon, setSearchPokemon] = useState("");
    const [pokemonData, setPokemonData] = useState(null);

   const findPokemon = async () => {

        if(!searchPokemon.trim()) {
            alert("Please enter a pokemon name.");
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon.toLowerCase()}`);
            const data = await response.json();
            setPokemonData(data);
        } catch (error) {
            console.error("Error cannot fetch pokemon data.", error);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-200 flex flex-col items-center p-6">

                <img src="Pokedex_logo.png" alt="Pokedex" className="w-64 mb-8"/>

                <div className="flex gap-4 mb-10">
                    <input type="text" placeholder="Search Pokemon..." value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                    />

                    <button onClick={findPokemon} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition cursor-pointer">
                        Search
                    </button>
                </div>

                {pokemonData && (
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                        <h3 className="text-2xl font-bold mb-3 uppercase">
                            {pokemonData.name}
                        </h3>

                        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="inline-flex text-2xl font-bold mb-3" />
                        
                        <p className="text-gray-700">
                            <strong>Height:</strong> {(pokemonData.height * 0.328084).toFixed(1)} ft
                        </p>

                        <p className="text-gray-700 mb-4">
                            <strong>Weight:</strong> {(pokemonData.weight * 0.220462).toFixed(1)} lbs
                        </p>

                        <h4 className="text-lg font-semibold mb-2">Abilities</h4>

                        <ul className="space-y-1">
                            {pokemonData.abilities.map((a) => (
                                <li key={a.ability.name} className="capitalize">
                                    {a.ability.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default Pokedex;
