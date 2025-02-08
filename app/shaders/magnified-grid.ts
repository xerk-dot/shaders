export const vertexShader = `#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`;

export const fragmentShader = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform int iFrame;
uniform float duration;
uniform float fadeDuration;
out vec4 fragColor;

vec4 mainImage(vec2 fragCoord, vec2 resolution) {
  vec2 uv = fragCoord.xy / resolution.xy;
  vec3 col = vec3(0.0);
  vec2 p = uv * 2.0 - 1.0;
  p.x *= resolution.x / resolution.y;
  
  // Example color calculation (you can modify this as needed)
  col = vec3(uv, 0.5);

  return vec4(col, 1.0); // Return a vec4 color
}

void main() {
  fragColor = mainImage(gl_FragCoord.xy, iResolution); // Corrected function call
}
`;