const pokeAPI = {};

async function convertPokeAPIDetalher(pokeDetalher) {
	const pokemon = new Pokemon();

	pokemon.number = pokeDetalher.id;
	pokemon.name = pokeDetalher.name;
	pokemon.height = pokeDetalher.height;
	pokemon.weight = pokeDetalher.weight;
	pokemon.flavorText = await flavorText(pokeDetalher.species.url)

	const types = pokeDetalher.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;

	pokemon.types = types;
	pokemon.type = type;
	pokemon.photo = pokeDetalher["sprites"]["other"]["official-artwork"]["front_default"];

	return pokemon

}

const flavorText = async (pokemon) => {
	return await fetch(pokemon)
		.then((resposta) => resposta.json())
		.then((getflavor) => getflavor["flavor_text_entries"][3]["flavor_text"])
		.then((removeCharSpecial) => removeCharSpecial.replace('\f',''))
}

pokeAPI.getDetalherPoke = (pokemon) => {
	return fetch(pokemon.url)
		.then((resposta) => resposta.json())
		.then((convertPokeAPIDetalher))
}

pokeAPI.getPokemons = (offset = 0, limit = 10) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

	return fetch(url)
		.then((resposta) => resposta.json())
		.then((jsonBody) => jsonBody.results)
		.then((pokemons) => pokemons.map(pokeAPI.getDetalherPoke))
		.then((detalherPokemon) => Promise.all(detalherPokemon))
}

