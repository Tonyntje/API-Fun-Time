
// Create const to store all pokemon details
const allPokemons = [];
// Promise function to get the first 151 "classic pokemon".
async function getPokeDetails() {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=386&offset=0", {method: "GET"})
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
    const ShinyRandomizer = Math.floor(Math.random() * 10)

    await fetch(pokemonUrl, {method: "GET"})
    .then(respons => respons.json())
    .then(res => { allPokemons
            // Hard to read, so multiline it is
            .push( 
                { 
                name:       res.name, 
                image:      (ShinyRandomizer) ? res.sprites.front_shiny : res.sprites.front_default, 
                hp:         res.stats[0].base_stat, 
                attack:     res.stats[1].base_stat, 
                defense:    res.stats[2].base_stat,
                shiny:      (ShinyRandomizer) ? true : false, 
                }
            )
            const hidden = document.getElementById('store-images')
            const temp = document.createElement('img')
            const shinytemp = document.createElement('img')
            temp.src = res.sprites.front_default
            shinytemp.src = res.sprites.front_shiny
            hidden.append(temp)
            hidden.append(shinytemp)
        }
    )
    .then(() => {
        const button = document.getElementById('buttonlistener');
        button.classList.remove('loading')
        button.addEventListener('click', whoIsMyPokemon);
    })
}
// The Get and datapush chain
getPokeDetails();

// On Button press get a random pokemon.
const whoIsMyPokemon = () => {
    // Creating a card design for a pokemon
    const container = document.getElementById('pokecontainer')
    const amount = 20;
    for(let c = 0; c < amount; c++) {
        setTimeout(() => {
            const pokemon = allPokemons[Math.round(Math.random() * 386)]
            

            container.innerHTML = `
            <div class="random">
                <img src="${pokemon.image}">
                <h3>${pokemon.name}</h3>
                <div class="stats">
                    <div class="hp">${pokemon.hp}</div>
                    <div class="attack">${pokemon.attack}</div>
                    <div class="defense">${pokemon.defense}</div>
                    ${(pokemon.shiny) ? '<div class="shiny"><div class="shinymate"></div><div class="shinybro"></div></div>' : ''}
                </div>
            </div>`
        }, 100*c);
    }
    setTimeout(() => {
        const last = document.querySelector('.random');
        last.classList.remove('random')
    }, 100*amount)
}