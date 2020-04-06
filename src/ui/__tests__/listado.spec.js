import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from '../listado.js';

test('actualiza el texto del indice', () => {
  document.body.innerHTML = '<div id="indice">';
  actualizarTextoIndicePokemones('test');
  expect(document.querySelector('#indice').textContent).toMatch('test');
});

describe('listado pokemones', () => {
  document.body.innerHTML = '<div id="indice">';

  const pokemonesTest = [{ name: 'bulbasaur' }];
  const mockCallback = jest.fn();
  const regEx = /<a (class="list-group-item list-group-item-action" href="#")|(href="#" class="list-group-item list-group-item-action")>bulbasaur<\/a>/g;

  test('muestra un listado de pokemones', () => {
    mostrarListadoPokemones(pokemonesTest, mockCallback);
    const indice = document.querySelector('#indice');
    expect(indice.innerHTML).toMatch(regEx);
  });

  test('clickea un pokemon del indice y llama a la función de callback', () => {
    mostrarListadoPokemones(pokemonesTest, mockCallback);
    const a = document.querySelector('a');
    a.click();
    expect(mockCallback).toHaveBeenCalledWith(pokemonesTest[0].name);
  });

  test('clickea un pokemon del indice y llama a una funcion vacía, ya que no se le asignó ninguna función de callback', () => {
    mostrarListadoPokemones(pokemonesTest);
    const a = document.querySelector('a');
    a.click();
    expect(a.onclick).toBeInstanceOf(Function);
  });
});
