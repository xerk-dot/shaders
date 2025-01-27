'use client';
import '@root/global.scss';

import { shaderData } from '../data';
import { notFound, useParams } from 'next/navigation';
import ShaderView from './ShaderView';
import Card from '@components/Card';
import CodeBlock from '@components/CodeBlock';
import { lazy, Suspense, useEffect } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ShaderCanvas from '@components/ShaderCanvas';
import Carousel from '@components/Carousel';
import Badge from '@components/Badge';




  
export default function ShaderPage() {
  const isDesktop = useMediaQuery('(min-width: 781px)');
  const params = useParams();

  useEffect(() => {
    const shader = shaderData.find((s) => s.id === params?.id);
    if (!shader) {
      notFound();
    }
  }, [params?.id]);

  const shader = shaderData.find((s) => s.id === params?.id);
  if (!shader) return null;
  const carouselImages = [

    {
      src: "https://picsum.photos/seed/1/1920/900",
      alt: "Placeholder image 1", 
    },
  ]
  return (
    <main>
      <div className="shaderContainer" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '80vh',
        zIndex: -1,
        opacity: 0.5
      }}>
        <ShaderCanvas 
          shaderId={shader.id}
          width={1920}
          height={1080}
        />
      </div>

      <div className="m-4">
          <Badge>
            <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {shader.name}
            </h1>
          </Badge>
          
          <Badge>
              {shader.description}
          </Badge>
        </div>
        
      <div className="grid">
        {isDesktop && (
          <Card title="augment intimacy" mode="left" maxWidth="80vw" centered>
            <div className="shaderContainer">
              <ShaderCanvas 
                shaderId={shader.id}
                width={1920}
                height={900}
              />
            </div>
          </Card>
        )}
        
        <Card title="CODE">
          <CodeBlock>
            {shader.code}
          </CodeBlock>
        </Card>
        <br />
      </div>
    </main>
  );
} 
