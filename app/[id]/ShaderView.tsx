'use client';

import { useRouter } from 'next/navigation';

interface ShaderViewProps {
  shader: {
    id: string;
    name: string;
    description: string;
    sourceUrl: string;
  };
}

export default function ShaderView({ shader }: ShaderViewProps) {
  const router = useRouter();

  return (
    <div className="container">
      <div className="">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {shader.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {shader.description}
        </p>
      </div>
      <div className="shaderContainer">
        {/* Shader rendering will go here */}
      </div>
      <a 
        href={shader.sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="sourceLink"
      >
        View Source
      </a>
    </div>
  );
} 