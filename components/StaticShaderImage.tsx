import { useEffect, useRef } from 'react';
import { shaderData } from '../app/data';

interface StaticShaderImageProps {
  shaderId: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function StaticShaderImage({ shaderId, width, height, className, style }: StaticShaderImageProps) {
  const shader = shaderData.find((s) => s.id === shaderId);
  if (!shader) return null;

  // Generate a deterministic image URL based on shader parameters, replacing spaces with hyphens
  const safeId = shaderId.replace(/\s+/g, '-');
  const imageUrl = `/static/shaders/${safeId}-${width}x${height}.png`;

  return (
    <div className={className} style={{ 
      width: '100%', 
      height: '100%',
      overflow: 'hidden',
      ...style 
    }}>
      <img 
        src={imageUrl}
        alt={shader.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
} 