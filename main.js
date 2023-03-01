const cards = document.querySelector('#cards');

const getInfoPokemon = async (url) =>{
    let pokeInfo;
    const response = await fetch(url);
    pokeInfo = await response.json();
    console.log(pokeInfo);
    cards.innerHTML += `
       <div id="card">
        <h1>${pokeInfo.name}</h1>
        <img
            src="${pokeInfo.sprites.front_default}"
            alt="bulbasor"
        />
        <p>Tipo:${pokeInfo.id}</p>
        <p>Peso: ${pokeInfo.weight} Kg</p>
        <button id="btnAgregarCarrito">Agregar al Carrito</button>
       </div>
    `
}

const getApiPoke = async () =>{
    let pokemon = [];
    let array1 = [];

    const request = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

    pokemon = await request.json();
    array1 = pokemon.results;
    console.log(array1);
    // array1.map((pokemon)=>{
    //     getInfoPokemon(pokemon.url);
    // }) 
    array1.map((array1)=>{
        getInfoPokemon(array1.url);
        // console.log(array1.url);
    }) 
}
getApiPoke();
