import mostrarPokemon from '../pokemon.js';
import htmlFixture from '../../__tests__/pokedex.fixture.js';
import pokemon from '../../../cypress/fixtures/bulbasaur.json';
import imagen from './imagen-bulbasaur.fixture.js';
import nombre from './nombre-bulbasaur.fixture.js';
import id from './id-bulbasaur.fixture.js';
import tipos from './tipos-bulbasaur.fixture.js';
import habilidades from './habilidades-bulbasaur.fixture.js';
import movimientos from './movimientos-bulbasaur.fixture.js';

test('muestra la información del pokemon que recibió como argumento', () => {
  document.body.innerHTML = htmlFixture;

  mostrarPokemon(pokemon);

  expect(document.querySelector('#ayuda').textContent).toMatch('');
  expect(document.querySelector('#pokemon-contenedor').style.display).toMatch('block');
  expect(document.querySelector('#pokemon-imagen').outerHTML).toMatch(imagen);
  expect(document.querySelector('#pokemon-nombre').outerHTML).toMatch(nombre);
  expect(document.querySelector('#pokemon-id').outerHTML).toMatch(id);
  expect(document.querySelector('#tipos-contenedor').outerHTML).toMatch(tipos);
  expect(document.querySelector('#habilidades-contenedor').outerHTML).toMatch(habilidades);
  expect(document.querySelector('#movimientos-contendor').outerHTML).toMatch(movimientos);
});
