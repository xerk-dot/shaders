'use client';

import Hero from '@components/Hero';
import Card from '@components/Card';
import CardDouble from '@components/CardDouble';
import RadioButtonGroup from '@components/RadioButtonGroup';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import '@root/global.scss';

export default function AboutPage() {
  const [feedback, setFeedback] = useState<string>('');

  return (
    <>
      <div style={{ marginTop: '5vh' }}>
        <Hero word="(about me)" />
      </div>
      <div className={styles['cards-container']}>
        <Card maxWidth="100%" centered title="huh?">
          <Image
            src="/images/bed-working.jpeg"
            alt="in bed"
            width={1200}
            height={800}
            style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
            priority
          />
          <p>hi! i'm a pixel-wrangler and code-tinkerer obsessed with shaders. here you'll find: glsl, wgsl, webgpu, antialiasing, raymarching, depth buffers, etc... this site is my chaotic playground— just me attempting to use math that somehow makes pretty things.</p>
          <br />

          <div style={{ textAlign: 'left' }}>
            <p>i am: 10% intention, 90% "what if i tweak this number?"</p>
            
            <br />
            <p style={{ fontStyle: 'italic' }}>spoiler: it either becomes a rainbow tornado or the FPS goes down. no regrets.</p>
          <br />
          </div>
          <p>some days i'm all "let's simulate fluid dynamics!" other days it's "why does this cube look like a potato?" either way, you'll find the carnage documented here.</p>
          <br />
          <p>i'm not here to gatekeep. code's included in every post—steal it, break it, make it weirder. if you spot a typo that accidentally made something cool, please tell me. we're all bugs in the matrix.</p>
          <br />
          <p>my creative process: 1. watch a tutorial, 2. forget half of it, 3. brute-force the rest with caffeine.</p>
          <br />
          <p>this isn't a tutorial hub—i'm the lab rat, not the professor. but if my spaghetti code helps you crack a problem, that's a win. let's normalize celebrating "it works but i don't know why" moments.</p>
          <br />
          <p>big thanks to the webgpu/dev community for keeping the chaos alive. y'all are the real mvps. also, sorry to my gpu. i promise i'll stop setting you on fire someday. maybe.</p>
        </Card>

        <Card title="q: what do u think id want u to tell me?" maxWidth="100%" centered>
          <RadioButtonGroup
            defaultValue="none"
            options={[
              { 
                value: 'a', 
                label: 'mitochondria is the powerhouse of the cell.',
                feedback: <>
                <Image
                  src="/images/night.jpeg"
                  alt="in bed"
                  width={1200}
                  height={800}
                  style={{ width: '50%', height: 'auto', marginBottom: '1rem' }}
                  priority
                />
                <span style={{ backgroundColor: 'white', color: 'red', fontWeight: 'bold' }}>INCORRECT:</span> congratulations, the mitochondria have unionized and now demand vacation days and higher wages. enjoy the start of body communism.
                </>
              },
              {
                value: 'b',
                label: "your existence is a typo in the universe's first draft.",
                feedback: <>
                          <Image
                            src="/images/death.jpeg"
                            alt="in bed"
                            width={1200}
                            height={800}
                            style={{ width: '50%', height: 'auto', marginBottom: '1rem' }}
                            priority
                          />
                <span style={{ backgroundColor: 'white', color: 'red', fontWeight: 'bold' }}>INCORRECT:</span> i just finished that self-help audiobook where a disinterested AI narrates your life as a protagonist. Chapter 1: "why bother?"'</>
              },
              {
                value: 'c', 
                label: 'i hired this penguin in a top hat and he just changed your AWS billing settings',

                feedback: <>
                          <Image
                            src="/images/agh.jpeg"
                            alt="in bed"
                            width={1200}
                            height={800}
                            style={{ width: '50%', height: 'auto', marginBottom: '1rem' }}
                            priority
                          />
                          <span style={{ backgroundColor: 'white', color: 'red', fontWeight: 'bold' }}>INCORRECT:</span> great, now the IRS thinks I owe 15000 krill. this is why you can't trust birds in formalgear.
                          </>
              },
              {
                value: 'd',
                label: 'i love you.',
                feedback: <>
                <Image
                  src="/images/nope.jpeg"
                  alt="nope"
                  width={1200}
                  height={800}
                  style={{ width: '50%', height: 'auto', marginBottom: '1rem' }}
                  priority
                />
                <span style={{ backgroundColor: 'white', color: 'red', fontWeight: 'bold' }}>INCORRECT:</span> no you don't.
                </>
              }
            ]}
          />
        </Card>
      </div>
    </>
  );
} 