'use client';
import '@root/global.scss';

import { shaderData } from '../data';
import { notFound, useParams } from 'next/navigation';
import ShaderView from './ShaderView';
import Card from '@components/Card';
import CodeBlock from '@components/CodeBlock';
import { lazy, Suspense, useEffect } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Carousel = lazy(() =>
  import('@components/carousel/carousel').then(module => ({ default: module.Carousel }))
);



const carouselImages = [

  {
    src: "https://picsum.photos/seed/1/1920/900",
    alt: "Placeholder image 1", 
  },
  {
    src: "https://picsum.photos/seed/13/1920/900",
    alt: "Placeholder image 13",
  },
  {
    src: "https://picsum.photos/seed/8/1920/900",
    alt: "Placeholder image 8",
  },
  {
    src: "/vr-midjourney.png",
    alt: "Placeholder image 9",
  }
];



  
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
            <Suspense fallback={null}>
              <Carousel
                placeholder="/bridge-gradient.png"
                images={carouselImages}
                width={1920}
                height={900}
                fadeBottom={false}
              />
            </Suspense>
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
