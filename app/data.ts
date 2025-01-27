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
    code: seascapeFragment
  },
  {
    id: 'dirty-notch',
    name: 'Dirty Notch',
    icon: '⭣',
    description: 'wireframe terrain viz w/ dynamic lighting + camera movement',
    sourceUrl: '',
    code: dirtyNotchFragment
  },
  {
    id: 'compound-eye',
    name: 'my 3000 compound eye is watching you',
    icon: '⭠',
    description: 'omg why',
    sourceUrl: '',
    code: compoundEyeFragment
  }
]; 