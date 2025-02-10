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
uniform vec4 iMouse;
uniform sampler2D iChannel0;
uniform bool iCheckerboard;
uniform sampler2D iBlockTexture;
uniform vec2 fragCoord;
out vec4 fragColor;

#define MAX_DIST 1000.
#define SURF_DIST .0001
#define EPS .0001
#define PI 3.141592
#define PI2 PI*2.
#define saturate(a) clamp(a,0.,1.)
#define S(a,b,t) smoothstep(a,b,t)
#define TS(a,b,c,d,t) smoothstep(a,b,t) * smoothstep(d,c,t)
#define REP(p,r) mod(p,r) - r * .5

float rand(vec2 co){
	return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

mat2 rot(float a) {
	float s = sin(a), c = cos(a);
	return mat2(c, -s, s, c);
}

float sdBox(vec3 p, vec3 b) {
	vec3 q = abs(p) - b;
	return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.);
}

float opUnion(float d1, float d2) {
	return min(d1, d2);
}

vec2 minMat(vec2 d1, vec2 d2) {
	return (d1.x < d2.x) ? d1 : d2;
}

float rep = .04;

float ss(float mi,float ma,float a)
{
    return (sin(a)+1.)*(ma-mi)*0.5+mi;
}
#define uTex2D iChannel0
float pn( in vec3 x ) // iq's noise
{
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
    vec2 rg = texture(uTex2D, (uv+ 0.5)/256.0, -100.0 ).yx;
    return -1.0+2.4*mix( rg.x, rg.y, f.z );
}
float df(vec3 p)
{
    
    //float pnNoise = pn(p*.26)*1.98 + pn(p*.26)*.62 + pn(p*1.17)*.39; // from aiekick -> https://www.shadertoy.com/view/ltBSzc 
    
    // Shane suggestions
    //float pnNoise = pn(p*.26)*2.6 + pn(p*1.17)*.39;
    float pnNoise = (pn(p/4.)*0.57 + pn(p/2.)*0.28 + pn(p)*0.15)*3.;
    
    return pnNoise;
}
float fig(vec3 ro, vec3 rd)
{
    float res=0.;
    float a = 0.;
    for ( int i = 0;
         i<60;
         i++)
    {
        vec3 p = ro + rd * a;
        float fbmp = df(p*8.);
        res = res + clamp(fbmp * 0.016,-0.5,1.)*p.y*1./abs(p.y*4.);
        res = mix( res, res+clamp(fbmp * 0.014,-0.5,1.), 0.5 );
        a += 0.1;
    }
    return res;
}
mat3 setCamera( in vec3 ro, in vec3 ta, float cr )
{
    vec3 cw = normalize(ta-ro);
    vec3 cp = vec3(sin(cr), cos(cr),0.0);
    vec3 cu = normalize( cross(cw,cp) );
    vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

vec2 scene(vec3 p) {
	vec2 d = vec2(100000., 0.);
	float mat = 0.;
	float t = iTime;
	vec2 m = iMouse.xy / iResolution.xy;
	vec3 q = p;
	vec3 spo = vec3(
		sin(t * 1.8) * .25,
		.32,
		cos(t * 2.2) * .3
	);
	vec3 sp = q - spo;
	vec2 id = floor(q.xz / rep);
	float hash = rand(id * .001);
	q.xz = mod(q.xz, rep) - rep * .5;
	vec3 bcp = vec3(0);
	bcp.xz = id * rep + rep * .5;
	float bsDist = length(spo.xz - bcp.xz);
	float s = smoothstep(0., .5, bsDist);
	q -= vec3(
		0.,
		.125 - (sin(hash * PI2 + t * (2. + bsDist * .015)) * .05) * (1. - pow(s, .9)),
		0.
	);
	d = minMat(
		d,
		vec2(sdBox(q, vec3(rep * .5, .1, rep * .5)), 1.)
	);
	return d;
}

vec3 getNormal(vec3 p) {
	vec2 e = vec2(EPS, 0);
	return normalize(
		vec3(
			scene(p + e.xyy).x - scene(p - e.xyy).x,
			scene(p + e.yxy).x - scene(p - e.yxy).x,
			scene(p + e.yyx).x - scene(p - e.yyx).x
		)
	);
}

vec2 raymarch(vec3 ro, vec3 rd, float side) {
	float accDist = 0.;
	float mat = 0.;

	for(int i = 0; i < 128; i++) {
		vec3 p = ro + rd * accDist;
		vec2 result = scene(p);
		float dist = result.x * side;
		vec3 rdi = 1. / rd;
		mat = result.y;
		if(abs(dist) < SURF_DIST || accDist > MAX_DIST) {
			break;
		}

		accDist += min(
			min(
				(step(0., rd.x) - mod(p.x, rep)) * rdi.x,
				(step(0., rd.z) - mod(p.z, rep)) * rdi.z
			) + .0001,
			dist
		);
	}

	return vec2(accDist, mat);
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
	vec3 forward = normalize(l - p);
	vec3 right = normalize(cross(forward, vec3(0., 1., 0.)));
	vec3 up = normalize(cross(right, forward));
	return normalize(right * uv.x + up * uv.y + forward * z);
}

mat3 camera(vec3 ro, vec3 ta, float cr )
{
	vec3 cw = normalize(ta - ro);
	vec3 cp = vec3(sin(cr), cos(cr),0.);
	vec3 cu = normalize( cross(cw,cp) );
	vec3 cv = normalize( cross(cu,cw) );
	return mat3( cu, cv, cw );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{


	float t = iTime;
	vec2 uv = (fragCoord.xy * 2. - iResolution.xy) / min(iResolution.x, iResolution.y);
	vec2 m = (iMouse.xy * 2. - iResolution.xy) / min(iResolution.x, iResolution.y);
	vec3 ro = vec3(
		m.x * 0. + 1.,
		m.y * 0. + 1.,
		1.2
	);
	vec3 ta = vec3(0., .2, 0.);
	vec3 rd = getRayDir(uv, ro, ta, 3.5);
	vec2 result = raymarch(ro, rd, 1.);
	float dist = result.x;
	float mat = result.y;
	vec3 col = vec3(0.);

	if(dist < MAX_DIST) {
		vec3 p = ro + rd * dist;
		vec3 l = normalize(vec3(1., 1., -1.));
		vec3 n = getNormal(p);
		vec3 r = reflect(rd, n);
		float diffuse = dot(l, n) * .5 + .5;
		vec3 diffuseColor = vec3(diffuse);

		if(mat < .5) {
			diffuseColor *= vec3(.3, 0., 0.);
		} else {
			diffuseColor *= vec3(0., 0., 0.);
			if(n.x > .5) {
				diffuseColor = diffuse * vec3(0., 0., 0.); //darkness
			}
			if(n.y > .5) {
				diffuseColor = diffuse * vec3(.1, .0, .0); //back
			}
			if(n.z > .5) {
				diffuseColor = diffuse * vec3(.6, 0., 0.); //left side
			}
		}

		col = diffuseColor;
	}

	col = pow(col, vec3(.4545));
	fragColor = vec4(col, 1.);
}

void main() {
	mainImage(fragColor, gl_FragCoord.xy);
}

`;