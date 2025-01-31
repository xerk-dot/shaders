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
  uniform sampler2D iChannel0;
  out vec4 fragColor;

  #define PI 3.1415926538
  #define FLIP_SPEED 1.0
  #define SPREAD_SPEED 0.175

  // Hash function for random values
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float sdHexagonRepetition(in vec2 p, in vec2 s, in float r, in float flip_t, in vec2 delta) {
      vec2 q = p - s*round(p/s);
      
      if (!(delta.x == 0.0 && delta.y == 0.0)) {
          vec2 pdelta = vec2(-delta.y, delta.x);
          q = vec2(dot(delta, q), dot(pdelta, q));
          q.x /= cos(flip_t*2.0 + PI);
          q = vec2(dot(delta, q), dot(pdelta, q));
      }
      
      const vec3 k = vec3(-0.866025404,0.5,0.577350269);
      q = abs(q);
      q -= 2.0*min(dot(k.xy,q),0.0)*k.xy;
      q -= vec2(clamp(q.x, -k.z*r, k.z*r), r);
      return length(q)*sign(q.y);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      float SCALE = 18.0;
      vec2 HEX_GRID = vec2(1.8, 2.0);
      vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y * SCALE;
      
      // Generate a random starting position that changes every 3 seconds
      float timeBlock = floor(iTime / 10.0);
      vec2 randomPos = vec2(
          hash(timeBlock * 1.234) * iResolution.x,
          hash(timeBlock * 5.678) * iResolution.y
      );
      vec2 m = (2.0*randomPos-iResolution.xy)/iResolution.y * SCALE;

      float c = p.x * (HEX_GRID.y / HEX_GRID.x) * 0.25 - 0.25;
      float alternate = step(0.0, c - round(c));
      
      vec2 source = round((m + vec2(0, alternate))/HEX_GRID);
      vec2 tile = round((p + vec2(0, alternate))/HEX_GRID);
      vec2 delta = tile - source;
      float f = length(delta) - 1.0;
      delta = (f > -1.0) ? normalize(delta) : delta;

      // Create wave-like animation from the source
      float distanceFromSource = length(delta);
      float timeFactor = mod(iTime * 0.8 - distanceFromSource * 0.2, 5.0);
      
      float flip = timeFactor * FLIP_SPEED - f * SPREAD_SPEED;
      flip = min(flip, 1.0) + 0.06 * sin(flip * 3.5);
      
      float d = sdHexagonRepetition(p + vec2(0, alternate), HEX_GRID, 0.77, flip*PI, delta);

      float hover = 1.0 + 0.25*smoothstep(1.0, 0.0, length(source - tile));
      float honeycomb = 1.0 + 0.1*smoothstep(0.0, 1.0, length(delta) - 2.0*round(length(delta)/2.0));
      
      // Yellow and black stripes
      vec3 hex_col = mix(
          vec3(1.0, 0.8, 0.0), // Yellow
          vec3(0.1, 0.1, 0.1), // Black
          sin(flip * PI + distanceFromSource * 0.5) * 0.5 + 0.5
      ) * hover * honeycomb;
      
      vec3 col = smoothstep(60.0 / iResolution.x, 0.0, d) * hex_col;
      
      // Darker honey-colored background
      col = max(vec3(0.2, 0.15, 0.0), col);
      
      fragColor = vec4(col, 1.0);
  }

  void main() {
      mainImage(fragColor, gl_FragCoord.xy);
  }
`; 