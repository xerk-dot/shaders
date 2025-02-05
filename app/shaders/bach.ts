export const vertexShader = `#version 300 es
precision highp float;

in vec2 position;

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const fragmentShader = `#version 300 es
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform sampler2D iChannel0;
  out vec4 fragColor;

#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 iMouse;
uniform int iFrame;

#define iterations 12
#define formuparam 0.53

#define volsteps 20
#define stepsize 0.1

#define zoom   0.800
#define tile   0.850
#define speed  0.000 

#define brightness 0.0015
#define darkmatter 0.300
#define distfading 0.730
#define saturation 0.850
mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

#define oct 5
#define pi  3.14159265

float random(vec2 p) {
    return fract( sin( dot( p, vec2(12., 90.)))* 1e5 );
}

float noise(vec3 p) {
    vec2 i = floor(p.yz);
    vec2 f = fract(p.yz);
    float a = random(i + vec2(0.,0.));
    float b = random(i + vec2(1.,0.));
    float c = random(i + vec2(0.,1.));
    float d = random(i + vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    
    return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
}

mat3 rxz(float an){
    float cc=cos(an),ss=sin(an);
    return mat3(cc,0.,-ss,
                0.,1.,0.,
                ss,0.,cc);                
}
mat3 ryz(float an){
    float cc=cos(an),ss=sin(an);
    return mat3(1.,0.,0.,
                0.,cc,-ss,
                0.,ss,cc);
}   

float fbm3d(vec3 p) {
    float v = 0.;
    float a = .5;
    vec3 shift = length(p.yz)*vec3(.5);
    float angle = pi/5.; 
    for (int i=0; i<oct; i++) {
        v += a * noise(p);
        p = rxz(-angle) * p * 2. + shift;
        a *= .65;
    }
    return v;
}

vec3 get_color(vec3 p) {
    vec3 q;
    q.x = fbm3d(p);
    q.y = fbm3d(p.yzx);
    q.z = fbm3d(p.zxy);

    float f = fbm3d(p + q);
    
    return q*f;
}
void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 ro, in vec3 rd )
{
	vec3 dir=rd;
	vec3 from=ro;
	
	float s=0.1,fade=1.;
	vec3 v=vec3(0.);
	for (int r=0; r<volsteps; r++) {
		vec3 p=from+s*dir*.5;
		p = abs(vec3(tile)-mod(p,vec3(tile*2.)));
		float pa,a=pa=0.;
		for (int i=0; i<iterations; i++) { 
			p=abs(p)/dot(p,p)-formuparam;
            p.xy*=rot(iTime*0.01);
			a+=abs(length(p)-pa);
			pa=length(p);
		}
		float dm=max(0.,darkmatter-a*a*.001);
		a*=a*a;
		if (r>6) fade*=1.2-dm;
		v+=fade;
		v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade;
		fade*=distfading;
		s+=stepsize;
	}
	v=mix(vec3(length(v)),v,saturation);
	fragColor = vec4(v*.02,1.);	
}

float velocity = 0.04, seed = 100., strength = 0.051;
float dcount = 199.;

vec3 palette( in float t) {
    vec3 a = vec3(0.532, 0.570, 0.550),
         b = vec3(0.694, 0.549, 0.163),
         c = vec3(1.381, 0.346, 1.207),
         d = vec3(5.239, 4.040, 3.822);
       
    return a + b*cos(6.28318 *(c*t+d));
}

vec2 travelPath(float t, float i) {
    float ni = i + seed;

    float rand1 = texture(iChannel0, vec2(ni, 0.3)).x;
    float rand2 = texture(iChannel0, vec2(ni, 0.6)).x;

    vec2 newPos = vec2(
        fract((2. * rand1 - 1.) * t),
        fract((2. * rand2 - 1.) * t)
    );
   
    newPos = (newPos - 0.5) *3.1;
   
    return newPos;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv=fragCoord.xy/iResolution.xy-.5;
	uv.y*=iResolution.y/iResolution.x;
	vec3 dir=vec3(uv*zoom,1.);
	float time=iTime*speed+.25;

	 float tt = mod(iTime / 8.,20.);
    vec2 uv2 = (2.*fragCoord-iResolution.xy)/iResolution.y;
    vec2 mm = (2.*iMouse.xy-iResolution.xy)/iResolution.y;

    vec3 rd = normalize( vec3(uv2, -2.) );  
    vec3 ro = vec3(0.,0.,0.);
    
    float delta = 2.*pi/30.;
    float initm = -.5 * delta;
    mat3 rot = rxz(-mm.x*delta) * ryz(-mm.y*delta);
    
    ro -= rot[2]*iTime/8.;
    vec2 pos = (fragCoord * 2. - iResolution.xy) / iResolution.x;
   
    float c = 0., obsStr = strength * inversesqrt(dcount);
   
    vec3 col = vec3(0,0,0);
   
    for (float i=0.;i<dcount;i++) {
        float f = i / dcount,
              t = iTime * velocity + seed;
   
        vec2 k = travelPath(t, f);
       
        float power = pow(cos(1.0*t + i) + 0.07*cos(iTime*10.), 2.) * obsStr / length(k - pos);
       
        c += power;
        col += power * palette(i * seed);
    }
  
    rd = rot * rd;
    
    vec3 p = ro + rd;
    
    vec3 cc = vec3(0.);

    float stepsize2 = .4;
    float totdist = stepsize2;
    
    for (int i=0; i<6; i++) {
       vec3 cx = get_color(p);
       p += stepsize*rd;
       cc += exp(-totdist/1.2)* cx;
       totdist += stepsize2;
       rd = ryz(.1)*rd;
    }
    
    cc = 3.*cc*cc*(3.-2.*cc);

    fragColor = vec4(cc,1.0);
    
    fragColor = iResolution.x/2.*fwidth(fragColor*fragColor/100.);

	vec3 from=vec3(1.,.5,0.5)*fragColor.xyz;
	
	mainVR(fragColor, fragCoord, from, dir);
    fragColor*= vec4(cc*(col+c)*1.1,1.0);
}

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}
`; 