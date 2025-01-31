import { vertexShader, fragmentShader as dirtyNotchFragment } from './shaders/dirty-notch';
import { fragmentShader as seascapeFragment } from './shaders/seascape';
import { fragmentShader as compoundEyeFragment } from './shaders/compound-eye';
import { fragmentShader as sephoraBdsmFragment } from './shaders/sephora-bdsm';
import { fragmentShader as orangeCircuitsFragment } from './shaders/orange-circuits';
import { fragmentShader as barryBensonFragment } from './shaders/barry-b-benson';

export const shaderData = [
  {
    id: 'seascape',
    name: 'Seascape',
    icon: '🌊', // Added icon
    description: 'Animated seascape shader',
    sourceUrl: 'https://www.shadertoy.com/view/XslGRr',
    code: seascapeFragment,
    category: 'animation'
  },
  {
    id: 'dirty-notch',
    name: 'Dirty Notch',
    icon: '🔍', // Added icon
    description: 'wireframe terrain viz w/ dynamic lighting + camera movement',
    sourceUrl: '',
    code: dirtyNotchFragment,
    category: 'geometry'
  },
  {
    id: 'compound-eye',
    name: '3000 compound eye',
    icon: '👀', // Added icon
    description: 'is watching u',
    sourceUrl: '',
    code: compoundEyeFragment,
    category: 'color'
  },
  {
    id: 'sephora-bdsm',
    name: 'sephora bdsm',
    icon: '💄', // Added icon
    description: 'ethylhexyl acetate',
    sourceUrl: '',
    code: sephoraBdsmFragment,
    category: 'geometry'
  },
  {
    id: 'orange-circuits',
    name: "Tomorrow's Parties",
    icon: '🎉', // Added icon
    description: 'Orange Circuits Scatter Wisdom Across the Acropolis to Thessaloniki\'s Port',
    sourceUrl: '',
    code: orangeCircuitsFragment,
    category: 'geometry'
  },
  {
    id: 'barry-b-benson',
    name: 'Barry B Benson',
    icon: '🐝', // Added icon
    description: 'Ya like jazz?',
    sourceUrl: '',
    code: barryBensonFragment,
    category: 'geometry'
  }
]; 