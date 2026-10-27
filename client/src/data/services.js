import {
  AirVent,
  BedDouble,
  Car,
  CookingPot,
  Fan,
  Flame,
  Tv,
  UtensilsCrossed,
  Waves,
  Wifi,
  Armchair,
  Cctv,
} from 'lucide-react';
import pileta from '../assets/images/pileta.jpg';
import cochera from '../assets/images/cochera.jpg';
import ropaDeCama from '../assets/images/ropa-de-cama.jpg';
import vistaAerea from '../assets/images/vista-aerea.jpg';
import complejoFrente from '../assets/images/complejo-frente.jpg';
import dormitorio from '../assets/images/unidad-6.jpg';

/**
 * Servicios destacados: cada tarjeta abre una galería con sus fotos.
 * Para sumar fotos, importalas arriba y agregalas al arreglo `images` que corresponda.
 * La primera foto es la que se ve en la tarjeta.
 */
export const HIGHLIGHTS = [
  {
    title: 'Pileta con vista panorámica',
    description: 'Amplio deck para disfrutar los mejores atardeceres del Valle de Calamuchita.',
    images: [
      { src: pileta, alt: 'Pileta con vista a las sierras' },
      { src: vistaAerea, alt: 'Vista aérea del complejo con la pileta' },
    ],
  },
  {
    title: 'Cochera techada',
    description: 'Cocheras amplias y techadas para todos los huéspedes.',
    images: [
      { src: cochera, alt: 'Cochera techada del complejo' },
      { src: complejoFrente, alt: 'Ingreso al complejo' },
    ],
  },
  {
    title: 'Ropa de cama',
    description: 'Cómodas camas Queen con colchones de resortes.',
    images: [
      { src: ropaDeCama, alt: 'Ropa de cama blanca' },
      { src: dormitorio, alt: 'Dormitorio con cama Queen' },
    ],
  },
];

// Comodidades incluidas en cada unidad (lista con íconos).
export const AMENITIES = [
  { icon: UtensilsCrossed, label: 'Vajilla completa y accesorios de cocina' },
  { icon: Armchair, label: 'Deck con mesas y sillas' },
  { icon: AirVent, label: 'Aire acondicionado en todos los ambientes' },
  { icon: Car, label: 'Cochera cubierta para cada unidad' },
  { icon: BedDouble, label: 'Ropa de cama y toallas opcionales' },
  { icon: Fan, label: 'Ventilador en cada unidad' },
  { icon: Waves, label: 'Pileta con reposeras' },
  { icon: CookingPot, label: 'Heladera, microondas y cocina con horno' },
  { icon: Cctv, label: 'Monitoreo' },
  { icon: Flame, label: 'Asador para cada unidad' },
  { icon: Wifi, label: 'WiFi de fibra óptica en todo el complejo' },
  { icon: Tv, label: 'Smart TV' },
];

// Aclaraciones que el complejo pidió mostrar.
export const NOT_INCLUDED = [
  'No brindamos servicio de mucama ni de limpieza durante la estadía.',
  'No se permiten visitas.',
  'No se permiten mascotas.',
];
