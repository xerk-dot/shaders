'use client';
import '@root/global.scss';

import { shaderData } from '../data';
import { notFound, useParams } from 'next/navigation';
import Card from '@components/Card';
import CodeBlock from '@components/CodeBlock';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import ShaderCanvas from '../../components/ShaderCanvas';
import StaticShaderImage from '../../components/StaticShaderImage';
import Badge from '@components/Badge';
import Grid from '@components/Grid';

export default function ShaderPage() {
  const isDesktop = useMediaQuery('(min-width: 781px)');
  const params = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const shader = shaderData.find((s) => s.id === params?.id);
    if (!shader) {
      notFound();
    }
  }, [params?.id]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const shader = shaderData.find((s) => s.id === params?.id);
  if (!shader) return null;

  return (
    <main>
      <div className="shaderContainer" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        opacity: .6,
        pointerEvents: 'none'
      }}>
        <ShaderCanvas 
          shaderId={shader.id}
          width="100vw"
          height="70vh"
          fadeBottom={true}
        />
        
      </div>
      <button
          onClick={() => setIsFullscreen(true)}
          style={{
            position: 'absolute',
            left: '50%',
            top: '30vh',
            transform: 'translate(-50%, -50%)',
            background: 'none',
            border: 'none',
            color: 'var(--theme-text)',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-mono)',
            fontSize: 'var(--font-size)',
            opacity: 1,
            transition: 'opacity 0.2s ease',
            pointerEvents: 'auto',
            zIndex: 10
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <Badge>(click to view fullscreen)</Badge>
        </button>
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--theme-background)',
          zIndex: 1000,
        }}>
          <ShaderCanvas 
            shaderId={shader.id}
            width="100vw"
            height="100vh"
          />
          <button
            onClick={() => setIsFullscreen(false)}
            style={{
              position: 'absolute',
              left: '2rem',
              top: '2rem',
              background: 'none',
              border: 'none',
              color: 'var(--theme-text)',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-mono)',
              fontSize: 'var(--font-size)',
              opacity: 1,
              transition: 'opacity 0.2s ease',
              pointerEvents: 'auto',
              zIndex: 10
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
          >
            <Badge>click me to leave [or press ESC]</Badge>
          </button>
        </div>
      )}

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
{/*         {(
           <Card title="augment intimacy" mode="left" maxWidth="80vw" centered>
            <div className="shaderContainer" style={{maxWidth: '80vw', width: '100%'}}>
              <ShaderCanvas 
                shaderId={shader.id}
                width={1920}
                height={900}
              />
            </div>
          </Card>
        )} */}
        <div style={{height: '40vh'}}></div>
        <Grid>
          <CodeBlock>
            {shader.code}
          </CodeBlock>
        </Grid>
        <br />
      </div>
    </main>
  );
} 
