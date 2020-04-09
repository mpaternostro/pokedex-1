import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';
import listadoPagina1 from '../../../cypress/fixtures/listado-pagina-1.json';
import listadoPagina49 from '../../../cypress/fixtures/listado-pagina-49.json';


describe('determina argumento con el que se llamará a la función de callback segun event.target', () => {
  const a = document.createElement('a');
  const mockCallback = jest.fn();
  a.addEventListener('click', (e) => manejarCambioPagina(e, mockCallback));

  test('comprueba argumento llamado al clickear en número de página', () => {
    a.href = '#';
    a.dataset.pagina = 2;
    a.click();
    expect(mockCallback).toHaveBeenCalledWith(Number(a.dataset.pagina));
  });
  test('comprueba argumento llamado al clickear en siguiente', () => {
    a.href = 'https://pokeapi.co/api/v2/pokemon/?offset=20&amp;limit=20';
    a.click();
    expect(mockCallback).toHaveBeenCalledWith(a.href);
  });
});

describe('paginador asigna clases disabled según página actual', () => {
  document.body.innerHTML = '<div id="paginador">';
  const mockCallback = jest.fn(() => true);

  describe('paginador asigna clases disabled según página actual', () => {
    test('última página siguiente es disabled', () => {
      const paginaActual = 49;
      const {
        count: totalPokemones,
        next: urlSiguiente,
        previous: urlAnterior,
      } = listadoPagina49;
      const paginaDisabled = '<a class="page-link" href="null" data-pagina="Siguiente">Siguiente</a>';
      mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, mockCallback);
      expect(document.querySelector('.disabled').innerHTML).toMatch(paginaDisabled);
    });
    test('primera página anterior es disabled', () => {
      const paginaActual = 1;
      const {
        count: totalPokemones,
        next: urlSiguiente,
        previous: urlAnterior,
      } = listadoPagina1;
      const paginaDisabled = '<a class="page-link" href="null" data-pagina="Anterior">Anterior</a>';
      mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, mockCallback);
      expect(document.querySelector('.disabled').innerHTML).toMatch(paginaDisabled);
    });
  });

  describe('chequea callbackPaginaSeleccionada en mostrarPaginador', () => {
    const paginaActual = 1;
    const paginador = document.querySelector('#paginador');
    const {
      count: totalPokemones,
      next: urlSiguiente,
      previous: urlAnterior,
    } = listadoPagina1;

    test('paginador llama a manejarCambioPagina con mockCallback', () => {
      mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior, mockCallback);
      paginador.click();
      expect(mockCallback).toHaveReturned();
    });
    test('paginador llama a función vacía ya que no se le asignó ninguna función de callback', () => {
      mostrarPaginador(totalPokemones, paginaActual, urlSiguiente, urlAnterior);
      paginador.click();
    });
  });
});
