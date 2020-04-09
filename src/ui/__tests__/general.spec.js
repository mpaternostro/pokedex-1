import { actualizarTextoAyuda, mostrarTotalPokemones } from '../general.js';

test('actualiza el texto de ayuda', () => {
  document.body.innerHTML = '<div id="ayuda"></div>';
  actualizarTextoAyuda('test');
  expect(document.querySelector(('#ayuda')).textContent)
    .toMatch('test');
});

test('actualiza el total de pokemones', () => {
  document.body.innerHTML = '<div id="total-pokemones"></div>';
  mostrarTotalPokemones(200);
  expect(document.querySelector(('#total-pokemones')).textContent)
    .toMatch('200');
});
