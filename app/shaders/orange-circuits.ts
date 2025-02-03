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

  #define LAYERS            5.0
  #define PI                3.141592654
  #define TAU               (2.0*PI)
  #define TIME              mod(iTime, 30.0)
  #define TTIME            (TAU*TIME)
  #define RESOLUTION        iResolution
  #define ROT(a)           mat2(cos(a), sin(a), -sin(a), cos(a))
  #define MAX_DEPTH 10

  float noise2(vec2 p) {
    return fract(sin(dot(p.xy ,vec2(12.9898,78.233))) * 456367.5453);
  }

  // Background utility functions
  float sRGB(float t) { return mix(1.055*pow(t, 1./2.4) - 0.055, 12.92*t, step(t, 0.0031308)); }
  vec3 sRGB(in vec3 c) { return vec3(sRGB(c.x), sRGB(c.y), sRGB(c.z)); }
  
  vec3 aces_approx(vec3 v) {
    v = max(v, 0.0);
    v *= 0.6f;
    float a = 2.51f;
    float b = 0.03f;
    float c = 2.43f;
    float d = 0.59f;
    float e = 0.14f;
    return clamp((v*(a*v+b))/(v*(c*v+d)+e), 0.0f, 1.0f);
  }

  float tanh_approx(float x) {
    float x2 = x*x;
    return clamp(x*(27.0 + x2)/(27.0+9.0*x2), -1.0, 1.0);
  }

  const vec4 hsv2rgb_K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 hsv2rgb(vec3 c) {
    vec3 p = abs(fract(c.xxx + hsv2rgb_K.xyz) * 6.0 - hsv2rgb_K.www);
    return c.z * mix(hsv2rgb_K.xxx, clamp(p - hsv2rgb_K.xxx, 0.0, 1.0), c.y);
  }

  vec2 mod2(inout vec2 p, vec2 size) {
    vec2 c = floor((p + size*0.5)/size);
    p = mod(p + size*0.5,size) - size*0.5;
    return c;
  }

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p)*43758.5453123);
  }

  vec2 shash2(vec2 p) {
    return -1.0+2.0*hash2(p);
  }

  float hash1(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  vec3 toSpherical(vec3 p) {
    float r = length(p);
    float t = acos(p.z/r);
    float ph = atan(p.y, p.x);
    return vec3(r, t, ph);
  }

  vec3 blackbody(float Temp) {
    vec3 col = vec3(255.);
    col.x = 56100000. * pow(Temp,(-3. / 2.)) + 148.;
    col.y = 100.04 * log(Temp) - 623.6;
    if (Temp > 6500.) col.y = 35200000. * pow(Temp,(-3. / 2.)) + 184.;
    col.z = 194.18 * log(Temp) - 1448.6;
    col = clamp(col, 0., 255.)/255.;
    if (Temp < 1000.) col *= Temp/1000.;
    return col;
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f*f*(3.-2.*f);
    float n = mix(mix(dot(shash2(i + vec2(0.,0.)), f - vec2(0.,0.)),
                     dot(shash2(i + vec2(1.,0.)), f - vec2(1.,0.)), u.x),
                 mix(dot(shash2(i + vec2(0.,1.)), f - vec2(0.,1.)),
                     dot(shash2(i + vec2(1.,1.)), f - vec2(1.,1.)), u.x), u.y);
    return 2.0*n;
  }

  float fbm(vec2 p, float o, float s, int iters) {
    p *= s;
    p += o;
    const float aa = 0.5;
    const mat2 pp = 2.04*ROT(1.0);
    float h = 0.0;
    float a = 1.0;
    float d = 0.0;
    for (int i = 0; i < iters; ++i) {
      d += a;
      h += a*noise(p);
      p += vec2(10.7, 8.3);
      p *= pp;
      a *= aa;
    }
    h /= d;
    return h;
  }

  float height(vec2 p) {
    float h = fbm(p, 0.0, 5.0, 5);
    h *= 0.3;
    return h;
  }

  vec3 stars(vec3 ro, vec3 rd, vec2 sp, float hh) {
    vec3 col = vec3(0.0);
    const float m = LAYERS;
    hh = tanh_approx(20.0*hh);
    
    for (float i = 0.0; i < m; ++i) {
      vec2 pp = sp+0.5*i;
      float s = i/(m-1.0);
      vec2 dim = vec2(mix(0.05, 0.003, s)*PI);
      vec2 np = mod2(pp, dim);
      vec2 h = hash2(np+127.0+i);
      vec2 o = -1.0+2.0*h;
      float y = sin(sp.x);
      pp += o*dim*0.5;
      pp.y *= y;
      float l = length(pp);
    
      float h1 = fract(h.x*1667.0);
      float h2 = fract(h.x*1887.0);
      float h3 = fract(h.x*2997.0);
      
      vec3 scol = mix(8.0*h2, 0.25*h2*h2, s)*blackbody(mix(3000.0, 22000.0, h1*h1));
      vec3 ccol = col + exp(-(mix(6000.0, 2000.0, hh)/mix(2.0, 0.25, s))*max(l-0.001, 0.0))*scol;
      col = h3 < y ? ccol : col;
    }
    return col;
  }

  vec2 raySphere(vec3 ro, vec3 rd, vec4 sph) {
    vec3 oc = ro - sph.xyz;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - sph.w*sph.w;
    float h = b*b - c;
    if(h<0.0) return vec2(-1.0);
    h = sqrt(h);
    return vec2(-b - h, -b + h);
  }

  vec4 moon(vec3 ro, vec3 rd, vec2 sp, vec3 lp, vec4 md) {
    vec2 mi = raySphere(ro, rd, md);
    vec3 p = ro + mi.x*rd;
    vec3 n = normalize(p-md.xyz);
    vec3 r = reflect(rd, n);
    vec3 ld = normalize(lp - p);
    float fre = dot(n, rd)+1.0;
    fre = pow(fre, 15.0);
    float dif = max(dot(ld, n), 0.0);
    float spe = pow(max(dot(ld, r), 0.0), 8.0);
    float i = 0.5*tanh_approx(20.0*fre*spe+0.05*dif);
    vec3 col = blackbody(1500.0)*i+hsv2rgb(vec3(0.6, mix(0.6, 0.0, i), i));
    float t = tanh_approx(0.25*(mi.y-mi.x));
    return vec4(col, t);
  }

  vec3 sky(vec3 ro, vec3 rd, vec2 sp, vec3 lp, out float cf) {
    float ld = max(dot(normalize(lp-ro), rd),0.0);
    float y = -0.5+sp.x/PI;
    y = max(abs(y)-0.02, 0.0)+0.1*smoothstep(0.5, PI, abs(sp.y));
    vec3 blue = hsv2rgb(vec3(0.6, 0.75, 0.35*exp(-15.0*y)));
    float ci = pow(ld, 10.0)*2.0*exp(-25.0*y);
    vec3 yellow = blackbody(1500.0)*ci;
    cf = ci;
    return blue+yellow;
  }

  vec3 galaxy(vec3 ro, vec3 rd, vec2 sp, out float sf) {
    vec2 gp = sp;
    gp *= ROT(0.67);
    gp += vec2(-1.0, 0.5);
    float h1 = height(2.0*sp);
    float gcc = dot(gp, gp);
    float gcx = exp(-(abs(3.0*(gp.x))));
    float gcy = exp(-abs(10.0*(gp.y)));
    float gh = gcy*gcx;
    float cf = smoothstep(0.05, -0.2, -h1);
    vec3 col = vec3(0.0);
    col += blackbody(mix(300.0, 1500.0, gcx*gcy))*gcy*gcx;
    col += hsv2rgb(vec3(0.6, 0.5, 0.00125/gcc));
    col *= mix(mix(0.15, 1.0, gcy*gcx), 1.0, cf);
    sf = gh*cf;
    return col;
  }

  vec3 grid(vec3 ro, vec3 rd, vec2 sp) {
    const vec2 dim = vec2(1.0/8.0*PI);
    vec2 pp = sp;
    vec2 np = mod2(pp, dim);
    vec3 col = vec3(0.0);
    float y = sin(sp.x);
    float d = min(abs(pp.x), abs(pp.y*y));
    float aa = 2.0/RESOLUTION.y;
    col += 2.0*vec3(0.5, 0.5, 1.0)*exp(-2000.0*max(d-0.00025, 0.0));
    return 0.25*tanh(col);
  }

  vec3 renderBackground(vec3 ro, vec3 rd, vec3 lp, vec4 md) {
    vec2 sp = toSpherical(rd.xzy).yz;
    float sf = 0.0;
    float cf = 0.0;
    vec3 col = vec3(0.0);
    vec4 mcol = moon(ro, rd, sp, lp, md);
    col += stars(ro, rd, sp, sf)*(1.0-tanh_approx(2.0*cf));
    col += galaxy(ro, rd, sp, sf);
    col = mix(col, mcol.xyz, mcol.w);
    col += sky(ro, rd, sp, lp, cf);
    col += grid(ro, rd, sp);
    
    // Debug: Add a bright line to see where the skyline should be
    if (abs(sp.x + 2.5) < 0.1) {
        col += vec3(1.0, 0.0, 0.0); // Bright red line to show position
    }
    
    if (rd.y < 0.0) {
        col = vec3(0.0);
    }
    
    // Dynamic dark blue tint with movement
    vec3 darkBlue = vec3(0.02, 0.04, 0.08);
    float blueWave = sin(TIME * 0.1 + rd.x * 1.0) * 0.5 + 0.5;
    darkBlue *= 1.0 + blueWave * 0.3;
    
    // Camera effects - much slower flash timing
    float baseFlash = exp(-mod(TIME * 0.4, 25.0)) * 0.5; // Much slower flash frequency
    
    // Camera streak effects
    float streaks = 0.0;
    for(float i = 0.0; i < 3.0; i++) {
        // Diagonal streaks
        vec2 streakUV = rd.xy * ROT(PI * 0.25 + i * PI * 0.2);
        float streak = exp(-abs(streakUV.x * 20.0)) * 
                      smoothstep(0.0, 0.1, streakUV.y) * 
                      smoothstep(0.8, 0.4, streakUV.y);
        
        // Animate streak intensity - much slower
        float streakTime = mod(TIME * 0.15 + i * 0.2, 25.0); // Slower streak timing
        streak *= exp(-streakTime * 1.0); // Slower fade
        
        // Add some variation to each streak - slower
        streak *= 0.5 + 0.5 * sin(streakUV.y * 50.0 + TIME * 2.0);
        
        streaks += streak;
    }
    
    float flash = baseFlash + streaks * 0.5;
    float scanline = sin(gl_FragCoord.y * 0.1 + TIME * 0.25) * 0.05; // Slower scanlines
    float vignette = 1.0 - length(rd.xy) * 0.5;
    
    // Afterburn effect - slower
    float afterburn = 0.0;
    for(float i = 0.0; i < 5.0; i++) {
        float t = TIME * (0.15 + i * 0.04); // Slower afterburn movement
        vec2 burn_uv = rd.xy + vec2(sin(t), cos(t)) * 0.1;
        afterburn += exp(-length(burn_uv) * (5.0 + i));
    }
    
    // Combine effects
    col = mix(darkBlue, col, 0.6 + scanline);
    col *= 0.5 * vignette;
    col += afterburn * vec3(0.1, 0.2, 0.4) * 0.2;
    col += flash * vec3(0.2, 0.3, 0.5);
    col += streaks * vec3(1.0) * 0.5;
    
    // Add subtle pulsing - slower
    float pulse = sin(TIME * 0.15) * 0.5 + 0.5; // Slower pulse
    col *= 0.8 + pulse * 0.2;
    
    return col;
  }

  void main() {
    vec2 q = gl_FragCoord.xy / iResolution.xy;
    vec2 p = -1.0 + 2.0 * q;
    p.x *= RESOLUTION.x / RESOLUTION.y;

    // Setup camera and scene for background
    vec3 ro = vec3(0.0, 0.0, 0.0);
    vec3 lp = 500.0 * vec3(1.0, -0.25, 0.0);
    vec4 md = 50.0 * vec4(vec3(1.0, 1.0, -0.6), 0.5);
    vec3 la = vec3(1.0, 0.5, 0.0);
    vec3 up = vec3(0.0, 1.0, 0.0);
    la.xz *= ROT(TTIME / 60.0 - PI / 2.0);
    
    vec3 ww = normalize(la - ro);
    vec3 uu = normalize(cross(up, ww));
    vec3 vv = normalize(cross(ww, uu));
    vec3 rd = normalize(p.x * uu + p.y * vv + 2.0 * ww);
    
    // Render background
    vec3 backgroundColor = renderBackground(ro, rd, lp, md);
    backgroundColor *= smoothstep(0.0, 4.0, TIME) * smoothstep(30.0, 26.0, TIME);
    backgroundColor = aces_approx(backgroundColor);
    backgroundColor = sRGB(backgroundColor);
    
	  vec2 p1 = (gl_FragCoord.xy / iResolution.xy)*10.;

    float col = 10.0;
    for (int i = 1; i < MAX_DEPTH; i++) {
        float depth = float(i);
		    float step = floor(100. * p.x / depth + 50. * depth + iTime);
        if (p1.y < noise2(vec2(step)) - depth * 0.05) {
            col = depth / 10.0; //strength of color
        }
    }
    
    vec2 r = iResolution.xy;
    vec2 I = gl_FragCoord.xy;
    vec2 circuitP = (I + I - r) / r.y * mat2(4.0, -3.0, 3.0, 4.0);
    
    float t = iTime;
    float T = t + 0.1 * circuitP.x;
    float i;
    
    vec4 O = vec4(0.0);
    
    for (i = 0.0; i < 50.0; i += 1.0) {
        // Calculate fade factor based on position
        float fadeFactor = smoothstep(0.05, 0.2, gl_FragCoord.y / iResolution.y);
        
        vec4 particleColor = (cos(sin(i) * vec4(1.0, 2.0, 3.0, 0.0)) + 1.0);
        float brightness = exp(sin(i + 0.1 * i * T)) * fadeFactor; // Apply fade factor
        float noise = texture(iChannel0, circuitP / exp(sin(i) + 5.0) + vec2(t, i) / 8.0).r;
        vec2 scaledP = circuitP / vec2(noise * 40.0, 2.0);
        float attenuation = 1.0 / length(max(circuitP, scaledP));
        circuitP += 2.0 * cos(i * vec2(11.0, 9.0) + i * i + T * 0.2);
        O += particleColor * brightness * attenuation;
    }
    
    O = tanh(0.01 * circuitP.y * vec4(0.0, 1.0, 2.0, 3.0) + O * O / 1e4);
    
    // Blend in the city
    vec4 cityColor = col >= 1.0 ? vec4(0.2, 0.2, 0.2, 0.0) : vec4(vec3(1.0) * col, 1.0); // Keep original building color

    // Blend the orange circuits with the background
    vec4 circuitColor = vec4(mix(backgroundColor, O.rgb, O.a), 1.0);

    // Create a step function to blend the city at the bottom 20% of the image
    float cityBlendFactor = step(1.0, gl_FragCoord.y / iResolution.y); // City appears in the bottom 20%

    // First, blend the city with the background at the bottom
    vec4 cityBackgroundBlend = mix(cityColor, vec4(backgroundColor, 1.0), cityBlendFactor);

    // Then, blend the orange circuits on top of the city-background blend
    fragColor = mix(cityBackgroundBlend, circuitColor, 0.5); // Adjust blend factor as needed
  }
`; 