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
import pileta from '../assets/images/pileta-cochera.jpg';
import ropaDeCama from '../assets/images/ropa-de-cama.jpg';
import vistaAerea from '../assets/images/vista-aerea.jpg';

// Servicios destacados (tarjetas con foto).
export const HIGHLIGHTS = [
  {
    title: 'Recepción 24 horas',
    description: 'Check-in a partir de las 14 h y check-out hasta las 10 h.',
    image: vistaAerea,
  },
  {
    title: 'Pileta con vista panorámica',
    description:
      'Amplio deck para disfrutar los mejores atardeceres del Valle de Calamuchita y cocheras techadas para todos los huéspedes.',
    image: pileta,
  },
  {
    title: 'Ropa de cama',
    description: 'Cómodas camas Queen con colchones de resortes.',
    image: ropaDeCama,
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
