import { vertexShader } from './shaders/dirty-notch';
import { fragmentShader as dirtyNotchFragment } from './shaders/dirty-notch';
import { fragmentShader as seascapeFragment } from './shaders/seascape';
import { fragmentShader as compoundEyeFragment } from './shaders/compound-eye';
export const shaderData = [
  {
    id: 'seascape',
    name: 'Seascape',
    icon: '⭠',
    description: 'Animated seascape shader',
    sourceUrl: 'https://www.shadertoy.com/view/XslGRr',
    code: seascapeFragment,
    category: 'animation'
  },
  {
    id: 'dirty-notch',
    name: 'Dirty Notch',
    icon: '⭣',
    description: 'wireframe terrain viz w/ dynamic lighting + camera movement',
    sourceUrl: '',
    code: dirtyNotchFragment,
    category: 'geometry'
  },
  {
    id: 'compound-eye',
    name: '3000 compound eye',
    icon: '⭠',
    description: 'is watching u',
    sourceUrl: '',
    code: compoundEyeFragment,
    category: 'color'
  }
]; 