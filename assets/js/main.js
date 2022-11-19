
const listaPokemon = document.getElementById('list-pokemons');
const btnLoad = document.getElementById('loadMoreBtn');
let root = document.querySelector(':root');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
	pokeAPI.getPokemons(offset, limit).then((pokemonList = []) => {

		const newHtml = pokemonList.map((pokemon) => `
			<li  class="pokemon ${pokemon.type}">
				<div class="number" style="color:${colours[pokemon.type]};">#${pokemon.number}</div>
				<div class="name" style="color:${colours[pokemon.type]};"> 
					<span class="magic-text"> ${pokemon.name} </span>
				</div>
				<div class="image" 
					style="background-image: url(${pokemon.photo});">
				</div>
				<div class="about conteudo">
					<ol class="list_types">
						${pokemon.types.map((type) => `<li><img src="${icon[type]}" alt="${type}"></li>`).join('')}
					</ol>
					<div class="flavor_text">
						<p>
							${pokemon.flavorText}
						</p>
						<p>
							Height: ${pokemon.height/10} m
						</p>
						<p>
							Weight: ${pokemon.weight/10} kg
						</p>
					</div>
				</div>
			</li>`).join('')
		
			listaPokemon.innerHTML += newHtml;
			for (const child of listaPokemon.children) {
				VanillaTilt.init(child,{
					glare: true,
					"max-glare": 1
				});			
			}
			
	})
}

loadPokemonItens(offset, limit);

btnLoad.addEventListener('click', () => {

	offset += limit;
	const qtdRecord = offset + limit;

	if (qtdRecord >= maxRecords) {

		const newLimit = maxRecords - offset;

		loadPokemonItens(offset, newLimit);

		btnLoad.disabled = "true";
		btnLoad.classList.add("disabled")
	} else {
		loadPokemonItens(offset, limit);

	}
})
