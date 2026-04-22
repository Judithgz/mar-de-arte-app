import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 1,
    name: 'Live Painting (Reality Sketch)',
    description:
      'Nuestro servicio estrella. Artistas capturan en vivo los momentos más especiales de tu evento — bodas, cumpleaños o reuniones — creando una obra original única que los invitados pueden ver tomar vida.',
    isMain: true,
    images: ['/images/live-sketching/live-sketch.jpg'],
  },
  {
    id: 2,
    name: 'Sketch Personalizado',
    description:
      'Envíanos una foto de lo que deseas retratar y nuestros artistas crearán un sketch hecho a mano especialmente para ti. Ideal como regalo o recuerdo.',
    isMain: false,
    images: ['/images/personalized-sketch/personalized.jpg'],
  },
  {
    id: 3,
    name: 'Accesorios de Playa Pintados a Mano',
    description:
      'Sombreros, bolsas y carteras decoradas con diseños originales pintados a mano. Cada pieza es irrepetible y lleva el sello único de Mar de Arte.',
    isMain: false,
    images: ['/images/accesories/hat-bag.jpg'],
  },
  {
    id: 4,
    name: 'Joyeria Personalizada',
    description:
      'Recuerdos de boda con identidad propia: un hermoso collar para las damas y pulseras para caballeros, elaborados artesanalmente como detalle para los invitados.',
    isMain: false,
    images: ['/images/jewerly/necklace1.jpg'],
  },
];