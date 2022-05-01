
// Create const to store all pokemon details
const allPokemons = [];
// Promise function to get the first 151 "classic pokemon".
async function getPokeDetails() {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0", {method: "GET"})
        .then(respons => respons.json())
        .then(results => results.results)
        .then(pokemon => {
            const mapped = pokemon.map(mon => mon.url)
            mapped.forEach(pokemonUrl => getDetails(pokemonUrl))
        })
        .catch(err => console.log(err));
}

// Had to make another await, but this can't be initialized in .then(). Called on line 13.
async function getDetails(pokemonUrl) {
    await fetch(pokemonUrl, {method: "GET"})
    .then(respons => respons.json())
    .then(res => allPokemons
        // Hard to read, so multiline it is
        .push( 
            { 
            name:       res.name, 
            image:      res.sprites.back_default, 
            hp:         res.stats[0].base_stat, 
            attack:     res.stats[1].base_stat, 
            defense:    res.stats[2].base_stat
            }
        )
    ).then(() => {
        const button = document.getElementById('buttonlistener');
        button.classList.remove('loading')
        button.addEventListener('click', whoIsMyPokemon);
    })
}
// The Get and datapush chain
getPokeDetails();

// On Button press get a random pokemon.
const whoIsMyPokemon = () => {
    const pokemon = allPokemons[Math.round(Math.random() * 151)]
    console.log(pokemon);

}


// const fetchPokemonDetails = url => {
//     return new Promise((resolve, reject) => {
//         try {
//             resolve());
//         } catch(err) {
//             reject(err);
//         }
//     })
// }
// async function sortPokemons (pokemonList) {
    

// }