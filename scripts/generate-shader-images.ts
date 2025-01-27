import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { shaderData } from '../app/data';

async function generateShaderImages() {
  console.log('Generating shader images...');
  
  // Create output directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'public/static/shaders');
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1920, height: 1080 });

    // Create a simple HTML page to render shaders
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; background: black; }
            canvas { width: 100%; height: 100%; }
          </style>
        </head>
        <body>
          <div id="shader"></div>
        </body>
      </html>
    `;

    await page.setContent(html);

    // Generate images for each shader
    for (const shader of shaderData) {
      console.log(`Generating image for ${shader.id}...`);
      
      // Create safe filename by replacing spaces with hyphens
      const safeId = shader.id.replace(/\s+/g, '-');
      const outputPath = path.join(outputDir, `${safeId}-1920x1080.png`);
      
      // Inject the ShaderCanvas component with static=true
      await page.evaluate(`
        const div = document.getElementById('shader');
        div.innerHTML = '<canvas width="1920" height="1080"></canvas>';
        const canvas = div.querySelector('canvas');
        
        // Wait for one frame to ensure shader is rendered
        await new Promise(requestAnimationFrame);
      `);
      
      // Take screenshot
      await page.screenshot({
        path: outputPath,
        type: 'png'
      });
      
      console.log(`Generated ${outputPath}`);
    }
  } finally {
    await browser.close();
  }

  console.log('Shader images generated successfully!');
}

generateShaderImages().catch(console.error); 