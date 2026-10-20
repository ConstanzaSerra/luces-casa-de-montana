import unidad1 from '../assets/images/unidad-1.jpg';
import unidad2 from '../assets/images/unidad-2.jpg';
import unidad3 from '../assets/images/unidad-3.jpg';
import unidad4 from '../assets/images/unidad-4.jpg';
import unidad5 from '../assets/images/unidad-5.jpg';
import unidad6 from '../assets/images/unidad-6.jpg';

/**
 * Tipos de cabaña. Para agregar o editar una unidad, modificá este arreglo.
 * `price` es opcional: si se deja en null, la tarjeta muestra "Consultar tarifa".
 */
export const UNITS = [
  {
    id: 'cabana-2',
    name: 'Cabaña para 2',
    guests: 2,
    beds: '1 cama matrimonial',
    description:
      'Ideal para parejas: living comedor luminoso, cocina equipada y baño completo con vista a las sierras.',
    price: null,
    images: [
      { src: unidad1, alt: 'Living comedor con ventanal' },
      { src: unidad2, alt: 'Cocina equipada' },
      { src: unidad3, alt: 'Baño completo' },
    ],
  },
  {
    id: 'cabana-4',
    name: 'Cabaña para 4',
    guests: 4,
    beds: '1 cama matrimonial y 2 camas individuales',
    description:
      'Pensada para familias o grupos: ambientes amplios, deck propio con parrilla y salida directa al parque.',
    price: null,
    images: [
      { src: unidad6, alt: 'Dormitorio con cama matrimonial' },
      { src: unidad4, alt: 'Comedor con camas individuales' },
      { src: unidad5, alt: 'Deck con parrilla y jardín' },
    ],
  },
];
