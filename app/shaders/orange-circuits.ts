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

  void main() {
    // Resolution for scaling
    vec2 r = iResolution.xy;
    // Center, rotate and scale
    vec2 I = gl_FragCoord.xy;
    vec2 p = (I+I-r) / r.y * mat2(4.0,-3.0,3.0,4.0);
    
    // Time, trailing time and iterator variables
    float t = iTime;
    float T = t + 0.1 * p.x;
    float i;
    
    // Initialize output color
    vec4 O = vec4(0.0);
    
    // Iterate through 50 particles
    for(i = 0.0; i < 50.0; i += 1.0) {
        // Color calculation
        vec4 particleColor = (cos(sin(i)*vec4(1.0,2.0,3.0,0.0))+1.0);
        
        // Flashing brightness
        float brightness = exp(sin(i+0.1*i*T));
        
        // Trail particles with attenuating light
        float noise = texture(iChannel0, p/exp(sin(i)+5.0)+vec2(t,i)/8.0).r;
        vec2 scaledP = p / vec2(noise*40.0,2.0);
        float attenuation = 1.0 / length(max(p, scaledP));
        
        // Shift position for each particle
        p += 2.0*cos(i*vec2(11.0,9.0)+i*i+T*0.2);
        
        // Accumulate color
        O += particleColor * brightness * attenuation;
    }
    
    // Add sky background and "tanh" tonemap
    O = tanh(0.01*p.y*vec4(0.0,1.0,2.0,3.0)+O*O/1e4);
    
    fragColor = O;
  }
`; 