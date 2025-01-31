'use client';

import { useEffect, useRef, useCallback } from 'react';
import { vertexShader as seascapeVertex, fragmentShader as seascapeFragment } from '../app/shaders/seascape';
import { vertexShader as dirtyNotchVertex, fragmentShader as dirtyNotchFragment } from '../app/shaders/dirty-notch';
import { vertexShader as compoundEyeVertex, fragmentShader as compoundEyeFragment } from '../app/shaders/compound-eye';
import { vertexShader as sephoraBdsmVertex, fragmentShader as sephoraBdsmFragment } from '../app/shaders/sephora-bdsm';
import { vertexShader as orangeCircuitsVertex, fragmentShader as orangeCircuitsFragment } from '../app/shaders/orange-circuits';

interface ShaderCanvasProps {
  shaderId: string;
  width: number | string;  // Can now be number (pixels) or string (e.g., '100vw')
  height: number | string; // Can now be number (pixels) or string (e.g., '100vh')
  fadeBottom?: boolean;
}

const shaders = {
  'seascape': {
    vertex: seascapeVertex,
    fragment: seascapeFragment
  },
  'dirty-notch': {
    vertex: dirtyNotchVertex,
    fragment: dirtyNotchFragment
  },
  'compound-eye': {
    vertex: compoundEyeVertex,
    fragment: compoundEyeFragment
  },
  'sephora-bdsm': {
    vertex: sephoraBdsmVertex,
    fragment: sephoraBdsmFragment
  },
  'orange-circuits': {
    vertex: orangeCircuitsVertex,
    fragment: orangeCircuitsFragment
  }
};

export default function ShaderCanvas({ shaderId, width, height, fadeBottom = false }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  // Function to get current dimensions based on viewport if needed
  const getDimensions = useCallback(() => {
    if (typeof width === 'number' && typeof height === 'number') {
      return { width, height };
    }
    
    const viewportWidth = typeof width === 'string' && width.endsWith('vw') 
      ? (window.innerWidth * parseFloat(width) / 100)
      : (typeof width === 'number' ? width : window.innerWidth);
      
    const viewportHeight = typeof height === 'string' && height.endsWith('vh')
      ? (window.innerHeight * parseFloat(height) / 100)
      : (typeof height === 'number' ? height : window.innerHeight);
      
    return { width: viewportWidth, height: viewportHeight };
  }, [width, height]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL2 not supported');
      return;
    }

    // Set initial dimensions
    const dimensions = getDimensions();
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Add resize handler for viewport units
    const handleResize = () => {
      const newDimensions = getDimensions();
      canvas.width = newDimensions.width;
      canvas.height = newDimensions.height;
      
      // Update WebGL viewport
      gl.viewport(0, 0, canvas.width, canvas.height);
      
      // Update resolution uniform if it exists
      if (program) {
        const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
        if (resolutionLocation) {
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        }
      }
    };

    if (typeof width === 'string' || typeof height === 'string') {
      window.addEventListener('resize', handleResize);
    }

    const shaderProgram = shaders[shaderId as keyof typeof shaders];
    if (!shaderProgram) {
      console.error('Shader not found:', shaderId);
      return;
    }

    // Create shader program
    const program = createShaderProgram(gl, shaderProgram.vertex, shaderProgram.fragment);
    if (!program) {
      console.error('Failed to create shader program');
      return;
    }

    console.log('Shader program created successfully');

    gl.useProgram(program);

    // Set up buffers
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Set up attributes and uniforms
    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const timeLocation = gl.getUniformLocation(program, 'iTime');
    const mouseLocation = gl.getUniformLocation(program, 'iMouse');
    const checkerboardLocation = gl.getUniformLocation(program, 'iCheckerboard');
    gl.uniform1f(checkerboardLocation, 0.0); // Use 0.0 instead of false

    // Create and initialize noise texture
    const noiseTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, noiseTexture);
    
    // Generate noise data
    const noiseSize = 256;
    const noiseData = new Uint8Array(noiseSize * noiseSize * 4);
    for (let i = 0; i < noiseData.length; i += 4) {
      const value = Math.random() * 255;
      noiseData[i] = value;
      noiseData[i + 1] = value;
      noiseData[i + 2] = value;
      noiseData[i + 3] = 255;
    }
    
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      noiseSize,
      noiseSize,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      noiseData
    );
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

    // Set uniform location for texture
    const iChannel0Location = gl.getUniformLocation(program, 'iChannel0');
    gl.uniform1i(iChannel0Location, 0);  // Use texture unit 0

    // Load texture
    const textureImage = new Image();
    textureImage.src = 'app/pack.png'; // Make sure this path is correct
    textureImage.onload = () => {
      // Activate texture unit 1 before binding
      gl.activeTexture(gl.TEXTURE1);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      // Set texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      
      // Upload texture to GPU
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
      
      // Set up uniform
      const textureLocation = gl.getUniformLocation(program, 'iBlockTexture');
      gl.uniform1i(textureLocation, 1); // Use texture unit 1
    };

    // Animation frame
    function render() {
      if (!canvasRef.current || !gl) return;
      const canvas = canvasRef.current;
      
      const time = (Date.now() - startTimeRef.current) / 1000;
      
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform4f(mouseLocation, 0, 0, 0, 0);
      gl.uniform1f(checkerboardLocation, 0.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameRef.current = requestAnimationFrame(render);
    }

    render();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteBuffer(positionBuffer);
      if (typeof width === 'string' || typeof height === 'string') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [width, height, shaderId, fadeBottom]);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ 
          width: '100%', 
          height: 'auto',
          background: '#000',
          border: '1px solid #333'
        }}
      />
      {fadeBottom && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: 'linear-gradient(to bottom, transparent, var(--theme-background))',
          pointerEvents: 'none'
        }} />
      )}
    </div>
  );
}

function createShaderProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) {
    console.error('Failed to create vertex shader');
    return null;
  }
  gl.shaderSource(vertexShader, vertexSource);
  gl.compileShader(vertexShader);
  
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader));
    return null;
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fragmentShader) {
    console.error('Failed to create fragment shader');
    return null;
  }
  gl.shaderSource(fragmentShader, fragmentSource);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader));
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    console.error('Failed to create program');
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking failed:', gl.getProgramInfoLog(program));
    return null;
  }

  return program;
}

function createNoiseTexture(gl: WebGL2RenderingContext) {
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Create noise texture data
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }

  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    size,
    size,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    data
  );

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.generateMipmap(gl.TEXTURE_2D);

  return texture;
} 