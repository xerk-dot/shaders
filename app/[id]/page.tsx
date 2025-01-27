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

  return (
    <main>
      <ShaderView shader={shader} />

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
