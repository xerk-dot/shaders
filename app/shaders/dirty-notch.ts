export const vertexShader = `#version 300 es
  in vec4 position;  // Input vertex position
  void main() {
    gl_Position = position;  // Output position in clip space
  }
`;

export const fragmentShader = `#version 300 es
  // Required precision qualifier for all float values
  precision highp float;

  // Input uniforms from JavaScript
  uniform vec2 iResolution;  // Screen resolution (width, height)
  uniform float iTime;       // Time in seconds since start
  uniform vec4 iMouse;       // Mouse position (x, y, click-x, click-y)
  uniform sampler2D iChannel0;  // Input texture for noise
  uniform bool iCheckerboard;  // Control checkerboard pattern
  uniform sampler2D iBlockTexture;  // Minecraft texture
  out vec4 fragColor;       // Output color

  // 3D noise function
  // Returns a smoothed random value based on position
  float noise(in vec3 x) {
    vec3 i = floor(x);      // Integer part
    vec3 f = fract(x);      // Fractional part
    f = f*f*(3.0-2.0*f);    // Smooth interpolation curve
    vec2 uv = (i.xy+vec2(37.0,17.0)*i.z) + f.xy;  // UV coordinates for texture lookup
    vec2 rg = texture(iChannel0, (uv+0.5)/256.0).yx;  // Sample noise texture
    return mix(rg.x, rg.y, f.z);  // Interpolate between two noise values
  }

  float mapTerrain( vec3 p )
  {
    p *= 0.1; 
    p.xz *= 0.6;
    
    float time = 0.5 + 0.15*iTime;
    float ft = fract( time );
    float it = floor( time );
    ft = smoothstep( 0.7, 1.0, ft );
    time = it + ft;
    float spe = 1.4;
    
    float f;
    f  = 0.5000*noise( p*1.00 + vec3(0.0,1.0,0.0)*spe*time );
    f += 0.2500*noise( p*2.02 + vec3(0.0,2.0,0.0)*spe*time );
    f += 0.1250*noise( p*4.01 );
    return 25.0*f-10.0;
  }

  vec3 gro = vec3(0.0);

  float map(in vec3 c) 
  {
    vec3 p = c + 0.5;
    
    float f = mapTerrain( p ) + 0.25*p.y;
    
    f = mix( f, 1.0, step( length(gro-p), 5.0 ) );

    // Create checkerboard pattern based on position
    float checker = mod(floor(p.x) + floor(p.y) + floor(p.z), 2.0);
    
    // Toggle every 10 seconds using iTime
    //if (mod(floor(iTime / 10.0), 2.0) == 0.0) {
    if (false){
    // Only allow blocks to appear on checker pattern when enabled
      return step(f, 0.5) * checker;
    } else {
      // Regular pattern without checkerboard
      return step(f, 0.5);
    }
  }

  const vec3 lig = normalize( vec3(-0.4,0.3,0.7) );

  float raycast( in vec3 ro, in vec3 rd, out vec3 oVos, out vec3 oDir )
  {
    vec3 pos = floor(ro);
    vec3 ri = 1.0/rd;
    vec3 rs = sign(rd);
    vec3 dis = (pos-ro + 0.5 + rs*0.5) * ri;
    
    float res = -1.0;
    vec3 mm = vec3(0.0);
    for( int i=0; i<128; i++ ) 
    {
      if( map(pos)>0.5 ) { res=1.0; break; }
      mm = step(dis.xyz, dis.yzx) * step(dis.xyz, dis.zxy);
      dis += mm * rs * ri;
      pos += mm * rs;
    }

    vec3 nor = -mm*rs;
    vec3 vos = pos;
    
    // intersect the cube	
    vec3 mini = (pos-ro + 0.5 - 0.5*vec3(rs))*ri;
    float t = max ( mini.x, max ( mini.y, mini.z ) );
    
    oDir = mm;
    oVos = vos;

    return t*res;
  }

  vec3 path( float t, float ya )
  {
    vec2 p  = 100.0*sin( 0.02*t*vec2(1.0,1.2) + vec2(0.1,0.9) );
    p +=  50.0*sin( 0.04*t*vec2(1.3,1.0) + vec2(1.0,4.5) );
    
    return vec3( p.x, 18.0 + ya*4.0*sin(0.05*t), p.y );
  }

  mat3 setCamera( in vec3 ro, in vec3 ta, float cr )
  {
    vec3 cw = normalize(ta-ro);
    vec3 cp = vec3(sin(cr), cos(cr),0.0);
    vec3 cu = normalize( cross(cw,cp) );
    vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, -cw );
  }

  float maxcomp( in vec4 v )
  {
    return max( max(v.x,v.y), max(v.z,v.w) );
  }

  float isEdge( in vec2 uv, vec4 va, vec4 vb, vec4 vc, vec4 vd )
  {
    vec2 st = 1.0 - uv;

    // edges
    vec4 wb = smoothstep( 0.85, 0.99, vec4(uv.x,
                                           st.x,
                                           uv.y,
                                           st.y) ) * ( 1.0 - va + va*vc );
    // corners
    vec4 wc = smoothstep( 0.85, 0.99, vec4(uv.x*uv.y,
                                           st.x*uv.y,
                                           st.x*st.y,
                                           uv.x*st.y) ) * ( 1.0 - vb + vd*vb );
    return maxcomp( max(wb,wc) );
  }

  vec3 render( in vec3 ro, in vec3 rd )
  {
    vec3 col = vec3(0.0);
    
    // raymarch	
    vec3 vos, dir;
    float t = raycast( ro, rd, vos, dir );
    if( t>0.0 )
    {
      vec3 nor = -dir*sign(rd);
      vec3 pos = ro + rd*t;
      vec3 uvw = pos - vos;
      
      // Calculate texture coordinates based on world position and normal
      vec2 texCoord;
      if (abs(nor.x) > 0.5) {
        // Side face (X)
        texCoord = vec2(uvw.z, -uvw.y);
      } else if (abs(nor.y) > 0.5) {
        // Top/Bottom face (Y)
        texCoord = vec2(uvw.x, uvw.z);
      } else {
        // Front/Back face (Z)
        texCoord = vec2(uvw.x, -uvw.y);
      }
      
      texCoord = fract(texCoord * 0.0625 + 0.5);
      
      vec3 blockTexture = texture(iBlockTexture, texCoord).rgb;
      col = blockTexture;
      
      float occ = 1.0;
      
      // Reduced lighting intensities
      float dif = clamp(dot(nor, lig), 0.0, 1.0);
      float bac = clamp(dot(nor, normalize(lig*vec3(-1.0,0.0,-1.0))), 0.0, 1.0);
      float sky = 0.3 + 0.2*nor.y;  // Reduced sky light
      float amb = clamp(0.5 + pos.y/25.0,0.0,1.0);  // Reduced ambient
      
      // Darker lighting
      vec3 lin = vec3(0.0);
      lin += 1.2*dif*vec3(1.00,0.90,0.70)*(0.5+0.5*occ);  // Reduced from 2.5 to 1.2
      lin += 0.3*bac*vec3(0.15,0.10,0.10)*occ;  // Reduced from 0.5 to 0.3
      lin += 1.0*sky*vec3(0.40,0.30,0.15)*occ;  // Reduced from 2.0 to 1.0
      
      col *= lin;
    }
    
    return col;
  }

  // Main image processing function
  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Convert pixel coordinates to normalized device coordinates (-1 to 1)
    vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
    
    // Handle mouse input
    vec2 mo = iMouse.xy / iResolution.xy;
    if(iMouse.z <= 0.00001) mo = vec2(0.0);  // No mouse input
    float time = 2.0*iTime + 50.0*mo.x;
    
    // Camera setup
    float cr = 0.2*cos(0.1*iTime);  // Camera rotation
    vec3 ro = path(time+0.0, 1.0);  // Camera position (ray origin)
    vec3 ta = path(time+5.0, 1.0) - vec3(0.0,6.0,0.0);  // Target position
    gro = ro;  // Store global ray origin

    // Setup camera matrix
    mat3 cam = setCamera(ro, ta, cr);
    
    // Apply lens distortion
    float r2 = p.x*p.x*0.32 + p.y*p.y;
    p *= (7.0-sqrt(37.5-11.5*r2))/(r2+1.0);
    
    // Calculate ray direction
    vec3 rd = normalize(cam * vec3(p.xy,-2.5));

    // Render the scene
    vec3 col = render(ro, rd);
    
    // Apply vignette effect
    vec2 q = fragCoord / iResolution.xy;
    col *= 0.5 + 0.5*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y), 0.1);
    
    // Output final color
    fragColor = vec4(col, 1.0);
  }

  // Entry point
  void main() {
    mainImage(fragColor, gl_FragCoord.xy);  // Process the image
  }
`; 