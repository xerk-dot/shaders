export const vertexShader = `
precision highp float;

attribute vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fragmentShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 iResolution;
uniform float iTime;
uniform vec4 iMouse;
uniform sampler2D iChannel0;
uniform int iFrame;

// Disable AA for static view, will be handled by resolution scaling
#define AA 0

const float period = 10.;
const float scale = 5.;

float alt(vec3 p) {
    return (sin(p.x / period) + sin(p.z / period)) * scale;
}

float sdSphere(vec3 p, float s) {
    return length(p)-s;
}

float map(vec3 p) {
    vec3 v = vec3(3,22,3);
    vec3 i = floor((p + v / 2.) / v);
    vec3 o = vec3(0, alt(i), 0);
    vec3 q = mod(p + o + v / 2., v) - v / 2.0;
    float r = step(abs(i.y), 1.5);
    return sdSphere(q, r * 1.1);
}

#define EPS 0.002  // Increased epsilon for faster normals calculation

vec3 calcNormal(vec3 pos) {
    vec2 e = vec2(EPS, 0);
    float d = map(pos);
    return normalize(vec3(
        map(pos + e.xyy) - d,
        map(pos + e.yxy) - d,
        map(pos + e.yyx) - d
    ));
}

void rayMarch(vec3 ro, vec3 rd, out float t, out float d, in float maxd) {
    t = 0.;
    d = 0.;
    vec3 cp = ro;
    // Reduced iterations for better performance
    for(int i=0; i<100; ++i) {
        d = map(cp);
        t += d;
        cp = ro+rd*t;
        if (d < .002 || d > maxd || abs(cp.y) > 35.)
            break;
    }
}

vec3 getSkyColor(vec3 rd) {
    // More dramatic sky for better reflections
    vec3 sunDir = normalize(vec3(0.2, 0.1, 0.3));
    float sunSpot = pow(max(dot(rd, sunDir), 0.0), 32.0);
    vec3 c1 = mix(vec3(0.01, 0.05, 0.1), vec3(0.2, 0.5, 0.8), (sign(rd.y) + 1.) / 2.);
    vec3 sky = mix(vec3(0.5, 0.7, 0.9), c1, abs(rd.y));
    return sky + vec3(1.0, 0.9, 0.7) * sunSpot;
}

vec3 refract2(vec3 I, vec3 N, float eta) {
    float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));
    if (k < 0.0) return vec3(0.0);
    return eta * I - (eta * dot(N, I) + sqrt(k)) * N;
}

// Glass-metal hybrid reflection chain
vec3 render(vec3 ro, vec3 rd) {
    float t, d;
    rayMarch(ro, rd, t, d, 50.);
    vec3 p = ro + rd * t;
    
    if (d < .002) {
        vec3 n = calcNormal(p);
        float ndotv = abs(dot(n, rd));
        float fresnel = pow(1.0 - ndotv, 5.0);  // Fresnel for both reflection and transparency
        
        // Metallic base color (more chrome-like)
        vec3 baseColor = vec3(0.8, 0.85, 0.9);
        
        // Enhanced metallic reflection
        vec3 ref = reflect(rd, n);
        vec3 skyColor = getSkyColor(ref);
        
        // Refraction
        float ior = 1.3;  // Index of refraction
        vec3 refr = refract2(rd, n * sign(dot(rd, n)), 1.0/ior);
        vec3 refrColor = getSkyColor(refr);
        
        // Multiple light sources
        vec3 light1 = normalize(vec3(1, 2, 3));
        vec3 light2 = normalize(vec3(-2, 1, -1));
        
        // Specular highlights
        float spec1 = pow(max(dot(ref, light1), 0.0), 32.0);
        float spec2 = pow(max(dot(ref, light2), 0.0), 24.0);
        
        // Blend reflection and refraction based on fresnel
        vec3 reflectColor = mix(baseColor * 0.2, skyColor, 0.9);
        vec3 color = mix(refrColor, reflectColor, fresnel * 0.8 + 0.2);
        
        // Add metallic highlights
        color += vec3(1.0, 0.9, 0.8) * spec1 * 0.5;
        color += vec3(0.8, 0.9, 1.0) * spec2 * 0.3;
        
        // Add chromatic aberration to refraction
        vec3 refrR = refract2(rd, n * sign(dot(rd, n)), 1.0/ior * 0.99);
        vec3 refrB = refract2(rd, n * sign(dot(rd, n)), 1.0/ior * 1.01);
        color.r = mix(color.r, getSkyColor(refrR).r, (1.0 - fresnel) * 0.5);
        color.b = mix(color.b, getSkyColor(refrB).b, (1.0 - fresnel) * 0.5);
        
        // Internal reflection glow
        float glow = pow(1.0 - ndotv, 8.0) * 0.5;
        color += baseColor * glow;
        
        // Very minimal fog
        float fogAmount = 1.0 - exp(-t * 0.02);
        return mix(color, getSkyColor(rd), fogAmount * 0.15);
    }
    
    return getSkyColor(rd);
}

mat3 buildLookAtMatrix(in vec3 ro, in vec3 ta) {
    vec3 cw = normalize(ta-ro);
    vec3 up = vec3(0, 1, 0);
    vec3 cu = normalize(cross(cw,up));
    vec3 cv = normalize(cross(cu,cw));
    return mat3(cu, cv, cw);
}

vec3 vignette(vec3 color, vec2 q, float v) {
    color *= 0.3 + 0.8 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), v);
    return color;
}

vec3 desaturate(in vec3 c, in float a) {
    float l = dot(c, vec3(1. / 3.));
    return mix(c, vec3(l), a);
}

void mainImage(out vec4 fragColor, vec2 fragCoord) {
    vec2 p = (-iResolution.xy + 2.0*fragCoord)/iResolution.y;
    
    float theta = radians(30.);
    float phi = radians(90.);
    vec3 ro = 2.7*vec3(sin(phi)*cos(theta),cos(phi),sin(phi)*sin(theta));
    vec3 ta = vec3(0, -0.2, 0);
    mat3 ca = buildLookAtMatrix(ro, ta);
    
    vec3 rd = ca*normalize(vec3(p,2.0));
    
    ro.z += iTime*4.;
    ro.x += 5.;  
    
    vec3 col = render(ro, rd);
    
    // Enhance contrast for more dramatic look
    col = pow(col, vec3(0.9));  // Slightly brighten
    col = desaturate(col, -0.2);  // Less desaturation to keep metallic color
    col = vignette(col, fragCoord / iResolution.xy, 0.3);
    
    fragColor = vec4(pow(col, vec3(1.5)), 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`; 