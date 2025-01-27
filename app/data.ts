import { vertexShader } from './shaders/dirty-notch';
import { fragmentShader } from './shaders/dirty-notch';

export const shaderData = [
  {
    id: 'fluid-simulation',
    name: 'Fluid Simulation',
    icon: '⭡',
    description: 'WebGL Fluid Simulation shader',
    sourceUrl: 'https://github.com/PavelDoGreat/WebGL-Fluid-Simulation',
    code: `// Add your code here`
  },
  {
    id: 'fractal-pyramid',
    name: 'Fractal Pyramid',
    icon: '⭢',
    description: 'Fractal Pyramid shader visualization',
    sourceUrl: 'https://www.shadertoy.com/view/l3cfW4',
    code: `// Add your code here`
  },
  {
    id: 'protean-clouds',
    name: 'Protean Clouds',
    icon: '⭣',
    description: 'Volumetric clouds shader',
    sourceUrl: 'https://www.shadertoy.com/view/4dfGzs',
    code: `// Add your code here`
  },
  {
    id: 'seascape',
    name: 'Seascape',
    icon: '⭠',
    description: 'Animated seascape shader',
    sourceUrl: 'https://www.shadertoy.com/view/XslGRr',
    code: `// Add your code here`
  },
  {
    id: 'dirty-notch',
    name: 'Dirty Notch',
    icon: '⭣',
    description: 'A mesmerizing voxel-based wireframe terrain visualization with dynamic lighting and camera movement',
    sourceUrl: '',
    code: fragmentShader
  }
]; 