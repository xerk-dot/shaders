import { vertexShader, fragmentShader as dirtyNotchFragment } from './shaders/dirty-notch';
import { fragmentShader as seascapeFragment } from './shaders/seascape';
import { fragmentShader as compoundEyeFragment } from './shaders/compound-eye';
import { fragmentShader as sephoraBdsmFragment } from './shaders/sephora-bdsm';
import { fragmentShader as orangeCircuitsFragment } from './shaders/orange-circuits';
import { fragmentShader as barryBensonFragment } from './shaders/barry-b-benson';
import { fragmentShader as xhamsterFragment } from './shaders/x';
import { fragmentShader as pipesFragment } from './shaders/pipes';
import { fragmentShader as beatsaberFragment } from './shaders/beatsaber';
import { fragmentShader as bachFragment } from './shaders/bach';
import { fragmentShader as magnifiedGridFragment } from './shaders/magnified-grid';
import { fragmentShader as breakFragment } from './shaders/break';
export const shaderData = [
  {
    
      id: 'xhamster',
      name: 'hamster',
      icon: '🐹', 
      description: '(formerly known as twitter)',
      sourceUrl: '',
      code: xhamsterFragment,
      category: 'geometry'
    },
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
    name: 'sephora, bdsm',
    icon: '💄', // Added icon
    description: '',
    sourceUrl: '',
    code: sephoraBdsmFragment,
    category: 'geometry'
  },
  {
    id: 'orange-circuits',
    name: "Tomorrow's Parties",
    icon: '🎉', // Added icon
    description: 'Orange Circuits Share Wisdom',
    sourceUrl: '',
    code: orangeCircuitsFragment,
    category: 'geometry'
  },
  {
    id: 'barry-b-benson',
    name: 'Bee Good',
    icon: '🐝', // Added icon
    description: 'Ya like jazz?',
    sourceUrl: '',
    code: barryBensonFragment,
    category: 'geometry'
  },

  {
    id: 'pipes',
    name: 'Pipes',
    icon: '🌈',
    description: 'Pipes',
    sourceUrl: '',
    code: pipesFragment,
    category: 'geometry'
  },
  {
    id: 'beatsaber',
    name: 'Beatsaber',
    icon: '🎧',
    description: 'deconstructed',
    sourceUrl: '',
    code: beatsaberFragment,
    category: 'geometry'
  },
  {
    id: 'bach',
    name: 'Bach',
    icon: '🌃',
    description: 'under a tree in eisenach, germany',
    sourceUrl: '',
    code: bachFragment,
    category: 'geometry'
  },
  {
    id: 'magnified-grid',
    name: 'Magnified Grid',
    icon: '🌉',
    description: 'magnified grid',
    sourceUrl: '',
    code: magnifiedGridFragment,
    category: 'geometry'
  },
  {
    id: 'break',
    name: 'Depression Cherry',
    icon: '🍒',
    description: '',
    sourceUrl: '',
    code: breakFragment,
    category: 'geometry'
  }
]; 