export const vertexShader = `#version 300 es
  in vec4 position;
  void main() {
    gl_Position = position;
  }
`;

export const fragmentShader = `#version 300 es
  precision highp float;
  
  // Standard uniforms from the rendering engine
  uniform vec2 iResolution;
  uniform float iTime;
  out vec4 fragColor;

  // Shadertoy compatibility defines
  #define fGlobalTime iTime
  #define v2Resolution iResolution
  const float pi = acos(-1.);
  #define r2(a) mat2(cos(a),-sin(a),sin(a), cos(a))  // 2D rotation matrix
  
  // Global state vectors for timing
  vec4 s,t;  // s = time phases, t = fractional parts for animation

  // Signed distance function for a box primitive
  float sd_b(vec3 p, vec3 e) {
    p = abs(p) -e ;
    return length(max(p,0.)) + min(max(max(p.x,p.y),p.z),0.);
  }

  #define time fGlobalTime

  // Triangle wave function for smooth oscillation
  float tri(float a) {
    a/=4.;return min(fract(a),fract(-a))*4.-1.;
  }

  // Scene distance function - defines the 3D geometry
  float map(vec3 p) {
    float d;
    {
      // Main saw wave shape
      vec3 q = p;
      float m = mix(.2,2.,t.w);  // Modulation intensity
      q.xy *= r2(0.5*q.z*sin(time*0.1));  // Rotate based on z position
      q.xy = abs(q.xy);  // Mirror the shape
      q.xy -= 1.5;  // Offset
      // Add triangle wave displacement
      q.x += tri(0.5*q.z+time)*m;
      q.y += tri(0.5*q.z+time+.5)*m;
      d = sd_b(q, vec3(0.2,0.2,111))-.1;  // Create infinite tunnel
    }
    {
      // Secondary floating cubes
      vec3 q = p;
      q.z+=pow(t.x,5.);  // Time-based z offset
      float id = round(q.z);  // Instance ID for variation
      q.z -= id;  // Local space
      q.xz *= r2(time+id);  // Rotate each instance
      d = min(d, sd_b(q, vec3(0.1))-0.1);  // Add to scene
    }
    return d;
  }

  // Calculate surface normal using central differences
  vec3 nor(vec3 p) {
    vec3 e = vec3(5e-3,0,0);
    return normalize(vec3(
    map(p+e.xyy)-map(p-e.xyy),
    map(p+e.yxy)-map(p-e.yxy),
    map(p+e.yyx)-map(p-e.yyx)
    ));
  }

  void mainImage(out vec4 out_color, in vec2 in_FragCoord)
  {
      // Setup timing vectors
      s = fGlobalTime*(120./60.)/vec4(1,4,8,16);  // Different time scales
      t = fract(s);  // Fractional parts for smooth looping
      
      // Setup camera ray
      vec2 uv = (in_FragCoord.xy  - .5 * v2Resolution.xy ) / v2Resolution.y;
      vec3 col = vec3(1);
      
      // Camera position animation
      vec3 ro = vec3(2.*cos(fGlobalTime),1.+2.*sin(fGlobalTime),4.);
      float fv = .5;  // Field of view
      
      // Camera position transitions based on time
      if (t.w > .75)
          ro = vec3(4,0,t.w);
      else if (t.w >.5){
          ro = vec3(0,4,sin(time));
          fv=mix(.4,.5,pow(t.x,2.));
      }
      else if (t.w > .25)
        ro = vec3(4.*sin(time),4.,sin(time));
      
      // Setup camera basis vectors
      vec3 cf = normalize(-ro),  // Forward
      cu = normalize(cross(cf, vec3(1,0,0))),  // Up
      cl = normalize(cross(cf,cu)),  // Right
      rd = mat3(cl,cu,cf)*normalize(vec3(uv, fv));  // Ray direction
      
      // Ray marching loop
      float i,r,d,N=123.,h=0.;
      for (i=r=0.; i<N; i++) {
        d = 1e9;
        { 
          vec3 p = ro+rd*r;
          d=map(p);
          // Handle reflections
          if (d<1e-4 && h<10.) {
            p=ro+rd*(r+d);
            vec3 n = nor(p);
            col *= 1.-pow(1.-dot(-rd,n),1.5);  // Fresnel-like effect
            rd=reflect(rd,n);
            r=1e-3;
            ro=p;
            h++;
            continue;
          }
          {
            // Additional geometric elements
            vec3 p = ro+rd*r;
            p.z -= round(p.z);
            
            p.xy = abs(p.xy);
            p.x+=sin((-p.y))*t.y;
            p.xy -= 3.+pow(t.w,2.);
            p.xy *= r2(.25*pi);
            float n = floor(mix(1.,3.,t.x));
            if (t.w>.5&&t.w<.75)
                p.xy -= clamp(round(p.xy),-1.,n);
            d=min(d, sd_b(p, vec3(0.5+t.x,.05,.05)));
          }
          {
            // Final layer of geometry
            vec3 p = ro+rd*r;
            p.xy *= r2(.25*pi);
            float n = floor(mix(1.,4.,t.x));
            p.xy *= r2(0.01*pow(t.x,2.)*p.z);

            p.xy = abs(p.xy);
            p.xy -= 4.;
            p.x += tri(0.5*(p.z + time*2.))*pow(t.x,2.);
            
            d=min(d, sd_b(p, vec3(0.1+.1*pow(t.y,2.),.1+.1*pow(t.y,2.),5.)));
          }
        }
        if (d>0.) r+=d*.9;  // Ray march step
        if (d<1e-4||r>1e5) break;  // Exit conditions
      }
      
      // Apply distance fog
      col *= clamp(1./(r*.1),0.,1.);

      // Simple color inversion based on timing
      if (t.y>.5 && t.w < .5) {
        col = 1. - col;
      }
      
      out_color = vec4(col, 1.);
  }

  void main() {
    mainImage(fragColor, gl_FragCoord.xy);
  }
`;