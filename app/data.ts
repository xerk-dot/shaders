import { vertexShader } from './shaders/dirty-notch';
import { fragmentShader as dirtyNotchFragment } from './shaders/dirty-notch';
import { fragmentShader as seascapeFragment } from './shaders/seascape';

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
    description: 'A mesmerizing voxel-based wireframe terrain visualization with dynamic lighting and camera movement',
    sourceUrl: '',
    code: dirtyNotchFragment
  }
]; 