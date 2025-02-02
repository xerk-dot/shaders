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
out vec4 fragColor;

uniform vec4 iMouse;

const float PI = radians(180.);

struct Camera {
  float fov, aspect;
  vec3 origin, target, up;
  mat3 vMat, mMat;
  float factor;
  vec3 forward, right, position, coord;
  mat3 pMat, uMat;
};

struct Object {
  float distance;
  float id;
  vec3 position;
};

struct Ray {
  vec3 origin;
  vec3 direction;
  float near;
  float far;
  float epsilon;
  float steps;
  float swing;
  float distance;
  vec3 position;
  vec3 normal;
  bool hit;
  Object object;
};

Ray lookAt(in vec2 uv, inout Camera cam) {
  cam.factor = 1.0 / tan(radians(cam.fov / 2.0));
  cam.forward = normalize(cam.target - cam.origin);
  cam.right = normalize(cross(cam.up, cam.forward));
  cam.up = cross(cam.forward, cam.right);
  cam.position = cam.origin + cam.factor * cam.forward;
  cam.coord = cam.position + uv.x * cam.right * cam.aspect + uv.y * cam.up;
  cam.pMat = mat3(cam.right, cam.up, cam.forward);

  Ray ray;
  ray.origin = cam.mMat * cam.origin;
  ray.direction = cam.mMat * normalize(cam.pMat * cam.vMat * vec3(uv.x * cam.aspect, uv.y, cam.factor));
  ray.near = 0.01;
  ray.far = 100.0;
  ray.epsilon = 0.001;
  ray.swing = 1.0;
  ray.steps = 200.0;

  return ray;
}

float EPS = 0.01;

#define TF_ROUND(d, R) (length(max(d, 0.0)) - (R))
#define TF_BOX_ROUND(p, S, R) TF_ROUND(abs(p) - (S), R)
#define TF_BOX_ROUND1(p, S, R) TF_ROUND(abs(p) - (S) + R, R)
#define TF_BOX(p, S) TF_BOX_ROUND(p, S, 0.0)
#define TF_BOX1(p, S) TF_BOX_ROUND(p, S, EPS)
#define TF_BOXE(p, S) TF_BOX_ROUND(p, S - EPS, EPS)
#define TF_BOX3D(p, S) max(abs((p).x) - vec3(S).x, max(abs((p).y) - vec3(S).y, abs((p).z) - vec3(S).z))
#define TF_BOX2D(p, S) max(abs((p).x) - vec2(S).x, abs((p).y) - vec2(S).y)
#define TF_BOX3D_SD(p, S) TF_BOX(p, S) + min(TF_BOX3D(p, S), 0.0)
#define TF_BOX2D_SD(p, S) TF_BOX(p, S) + min(TF_BOX2D(p, S), 0.0)

#define TF_ROUND_MIN(d, R) (-length(min(d, 0.0)) + (R))
#define TF_CROSS_ROUND(p, S, R) TF_ROUND_MIN(abs(p) - (S), R)
#define TF_CROSS(p, S) TF_CROSS_ROUND(p, S, 0.0)
#define TF_CROSS3D(p, S) min(abs((p).x) - vec3(S).x, min(abs((p).y) - vec3(S).y, abs((p).z) - vec3(S).z))
#define TF_CROSS2D(p, S) min(abs((p).x) - vec2(S).x, abs((p).y) - vec2(S).y)
#define TF_CROSS3D_SD(p, S) TF_CROSS(p, S) + max(TF_CROSS3D(p, S), 0.0)
#define TF_CROSS2D_SD(p, S) TF_CROSS(p, S) + max(TF_CROSS2D(p, S), 0.0)

#define TF_BALL(p, R) TF_ROUND(abs(p), R)
#define TF_ELLIPSE3D(p, r) min((r).x, min((r).y, (r).z)) * TF_BALL((p) / (r), 1.0)
#define TF_ELLIPSE2D(p, r) min((r).x, (r).y) * TF_BALL((p) / (r), 1.0)
#define TF_SEGMENT(p, a, b, r) TF_BALL((p) - (a) - ((b) - (a)) * clamp(dot((p) - (a), (b) - (a)) / dot((b) - (a), (b) - (a)), 0.0, 1.0), r)

#define TF_BEFORE(p, p1) (p - (p1))
#define TF_BEFORE_EPS(p, p1) TF_ROUND(p - (p1) + EPS, EPS)
#define TF_BEFORE_PLANE(p, normal, off) dot(p, normal) - (off)
#define TF_BEFORE_ROTATE(p, ang, off) dot((p).xy, cos((ang) + vec2(0, 0.5 * PI))) - (off)

#define TF_AFTER(p, p1) (-p + (p1))
#define TF_AFTER_EPS(p, p1) TF_ROUND(-p + (p1) + EPS, EPS)
#define TF_AFTER_PLANE(p, normal, off) dot(-p, normal) + (off)
#define TF_AFTER_ROTATE(p, ang, off) dot((-p).xy, cos((ang) + vec2(0, 0.5 * PI))) + (off)

#define TF_BETWEEN(p, p1) (abs(p) - (p1))
#define TF_BETWEEN_EPS(p, p1) TF_ROUND(abs(p) - (p1) + EPS, EPS)
#define TF_BETWEEN2(p, p1, p2) (abs(p - 0.5 * ((p1) + (p2))) - 0.5 * ((p2) - (p1)))
#define TF_BETWEEN_PLANE(p, normal, off) AND(TF_AFTER_PLANE(p, normal, -off), TF_BEFORE_PLANE(p, normal, off))
#define TF_BETWEEN_ROTATE(p, ang, off) AND(TF_AFTER_ROTATE((p).xy, ang, -0.5 * off), TF_BEFORE_ROTATE((p).xy, ang, 0.5 * off))

#define TF_TRANSLATE(p, d) p -= d;
#define TF_SCALE(p, s) p /= s

#if 0
  #define TF_CYL(p, R, n) p = vec2((R) * atan(p.x, p.y), TF_BALL(p.xy, R))
#else
  #define TF_CYL(p, R, n) p = vec2((R) * atan(p.x, p.y), pow(length(pow(p.xy, vec2(n))), 1.0 / float(n)) - (R))
#endif

#if 0
  #define TF_ROTATE(p, a) p = mat2(cos(a), sin(a), -sin(a), cos(a)) * p
#else
  #define TF_ROTATE(p, a) p = p.xy * cos(a) * vec2(1.0, 1.0) + p.yx * sin(a) * vec2(-1.0, 1.0)
#endif

#define TF_ROTATE_MAT2(a) mat2(cos(a), sin(a), -sin(a), cos(a))
#define TF_ROTATE_X(a) mat3(1.0, 0.0, 0.0, 0.0, cos(a), -sin(a), 0.0, sin(a), cos(a))
#define TF_ROTATE_Y(a) mat3(cos(a), 0.0, -sin(a), 0.0, 1.0, 0.0, sin(a), 0.0, cos(a))
#define TF_ROTATE_Z(a) mat3(cos(a), -sin(a), 0.0, sin(a), cos(a), 0.0, 0.0, 0.0, 1.0)
#define TF_ROTATE_X_90(p) p.xyz = p.xzy
#define TF_ROTATE_Y_90(p) p.xyz = p.zyx
#define TF_ROTATE_Z_90(p) p.xyz = p.yxz
#define TF_MIRROR(p, d) p = abs(p) - (d)

#define TF_REPLICA(p, d) \
  floor((p) / (d) + 0.5); \
  p = mod((p) + 0.5 * (d), d) - 0.5 * (d)

#define TF_REPLICA_LIMIT(p, d, ida, idb) \
  floor((p) / (d) + 0.5); \
  p = p - (d) * clamp(floor((p) / (d) + 0.5), ida, idb)

#define TF_REPLICA_LIMIT_MIRROR(p, d, id) \
  floor((p = p - 0.5 * (d)) / (d) + 0.5); \
  p = p - (d) * clamp(floor((p) / (d) + 0.5), -id, id - 1.0)

#define TF_REPLICA_ANGLE_POLAR(p, n, off) \
  floor(mod(atan(p.x, p.y) + off + PI / (n), 2.0 * PI) / (2.0 * PI / (n))); \
  p = vec2(atan(p.x, p.y) + off, length(p.xy)); \
  p.x = mod(p.x + 0.5 * (2.0 * PI / (n)), (2.0 * PI / (n))) - 0.5 * (2.0 * PI / (n))

#if 1
  #define TF_REPLICA_ANGLE(p, n, off) \
    floor(mod(atan(p.x, p.y) + off + PI / (n), 2.0 * PI) / (2.0 * PI / (n))); \
    TF_ROTATE(p.xy, -off + (2.0 * PI / (n)) * floor(mod(atan(p.x, p.y) + off + PI / (n), 2.0 * PI) / (2.0 * PI / (n))))
#else
  #define TF_REPLICA_ANGLE(p, n, off) \
    TF_REPLICA_ANGLE_POLAR(p, n, off); \
    p = p.y * vec2(sin(p.x), cos(p.x))
#endif

#if 1
  #define TF_HELIX_Y(p, N, R, Step, Nrot) \
    TF_CYL(p.xz, R, 1.0); \
    { \
      float a = floor(N) * p.x / (2.0 * PI * (R)); \
      TF_TRANSLATE(p.y, (Step) * a); \
      TF_REPLICA(p.y, (Step)); \
      TF_ROTATE(p.yz, (Nrot) * PI * a); \
    } \
    p = p.zxy
#else
  #define TF_HELIX_Y(p, N, R, Step, Nrot) \
    TF_CYL(p.xz, R, 1.0); \
    { \
      float a = floor(N) * p.x / (2.0 * PI * (R)); \
      TF_TRANSLATE(p.y, (Step) * a); \
      float id = TF_REPLICA(p.y, (Step)); \
      p.x -= -id * (2.0 * PI * R) / floor(N); \
      TF_ROTATE(p.yz, (Nrot) * PI * a); \
    } \
    p = p.zxy
#endif

#define TF_TORUS_XZ(p, R, r) \
  TF_CYL(p.xz, R, 1.0); \
  TF_CYL(p.yz, r, 1.0); \
  p = p.xzy

#define TF_REPLICA_SPIN_Y(p, n, R, step, sect) \
  { \
    float a = atan(p.x, p.z) / (2.0 * PI); \
    p.y -= a * (n) * (step); \
    TF_REPLICA(p.y, step); \
    TF_REPLICA_ANGLE(p.xz, sect, 0.0); \
    p.z -= R; \
  } \
  p = p.zxy;

#define TF_REPLICA_SPIN(p1, p2, n, step) \
  p1 -= (atan((p2).x, (p2).y) / (2.0 * PI)) * (n) * (step); \
  TF_REPLICA(p1, (step))

#define TF_REPLICA_SPIN_LIMIT(p1, p2, n, step, ida, idb) \
  p1 -= (atan((p2).x, (p2).y) / (2.0 * PI)) * (n) * (step); \
  TF_REPLICA_LIMIT(p1, (step), ida, idb)

#if 1
  #define TF_SPIRAL(p, n, k) \
    length(p.xy); \
    { \
      vec2 p0 = p.xy; \
      p.y = atan(p.x, p.y) * (n) / (2.0 * PI); \
      p.x = p.y - (k) * length(p0.xy); \
      p.x += -floor(p.x + 0.5); \
    }
#else
  #if 1
    #define TF_SPIRAL(p, n) \
      p.x = atan(p.x, p.y) * (n) / (2.0 * PI) - length(p.xy) - 0.5; \
      p.x -= 1.0 * floor(p.x / 1.0 + 0.5)
  #else
    #define TF_SPIRAL(p, n) \
      p.xy = vec2(atan(p.x, p.y), length(p.xy)); \
      p.x = p.x * (n) / (2.0 * PI) - p.y - 0.5; \
      p.x -= 1.0 * floor(p.x / 1.0 + 0.5)
  #endif
#endif
  #if 1
    #define TF_SPIRAL_LIMIT(p, n, k, ida, idb)\
      length(p.xy);\
      {\
        vec2 p0 = p.xy;\
        p.y = atan(p.x,p.y)*(n)/(2.*PI);\
        p.x = p.y - (k) * length(p0.xy);\
        p.x += clamp(-floor(p.x + 0.5), ida, idb);\
      }
  #else
    #if 1
      #define TF_SPIRAL_LIMIT(p, n, ida, idb)\
        p.x = atan(p.x,p.y)*(n)/(2.*PI) - length(p.xy) - 0.5;\
        p.x -= 1. * clamp(floor(p.x/1. + 0.5), ida, idb);
    #else
      #define TF_SPIRAL_LIMIT(p, n, ida, idb)\
        p.xy = vec2(atan(p.x,p.y), length(p.xy));\
        p.x = p.x*(n)/(2.*PI) - p.y - 0.5;\
        p.x -= 1. * clamp(floor(p.x/1. + 0.5), ida, idb);
    #endif
  #endif
  #if 1
    #define TF_SPIRAL_LOG(p, n, k)\
      length(p.xy);\
      {\
        vec2 p0 = p.xy;\
        p.y = atan(p.x,p.y)*(n)/(2.*PI);\
        p.x = p.y - (k) * log(length(p0.xy));\
        p.x += -floor(p.x + 0.5);\
      }
  #else
    #if 1
      #define TF_SPIRAL_LOG(p, n)\
        length(p.xy);\
        p.x = atan(p.x,p.y)*(n)/(2.*PI) - log(length(p.xy)) - 0.5;\
        p.x -= 1. * floor(p.x/1. + 0.5)
    #else
      #define TF_SPIRAL_LOG(p, n)\
        length(p.xy);\
        p.xy = vec2(atan(p.x,p.y), length(p.xy));\
        p.y = log(p.y);\
        p.x = p.x*(n)/(2.*PI) - p.y - 0.5;\
        p.x -= 1. * floor(p.x/1. + 0.5)
    #endif
  #endif
  #if 1
    #define TF_SPIRAL_LOG_LIMIT(p, n, k, ida, idb)\
      length(p.xy);\
      {\
        vec2 p0 = p.xy;\
        p.y = atan(p.x,p.y)*(n)/(2.*PI);\
        p.x = p.y - (k) * log(length(p0.xy));\
        p.x += clamp(-floor(p.x + 0.5), ida, idb);\
      }
  #else
    #if 1
      #define TF_SPIRAL_LOG_LIMIT(p, n, ida, idb)\
        length(p.xy);\
        p.x = atan(p.x,p.y)*(n)/(2.*PI) - log(length(p.xy)) - 0.5;\
        p.x -= 1. * clamp(floor(p.x/1. + 0.5), ida, idb);
    #else
      #define TF_SPIRAL_LOG_LIMIT(p, n, ida, idb)\
        length(p.xy);\
        p.xy = vec2(atan(p.x,p.y), length(p.xy));\
        p.y = log(p.y);\
        p.x = p.x*(n)/(2.*PI) - p.y - 0.5;\
        p.x -= 1. * clamp(floor(p.x/1. + 0.5), ida, idb);
    #endif
  #endif

  #define TF_REPLICA_ANGLE_SPHERIC(p, nx, nz, id)\
    p = vec3( atan (p.x, p.z)*(nx)/(2. * PI), length (p), asin (p.y / length (p))*(nz)/PI );\
    if (mod(nz, 2.)==0.) p.z -= 0.5;\
    id = TF_REPLICA(p.xz, 1.)

  #define TF_STEP_AFTER(p, a) step(a, p)
  #define TF_STEP_BEFORE(p, a) step(p, a)
  #define TF_STEP_BETWEEN(p, a) TF_STEP_BEFORE(abs(p), a)
  #define TF_STEP_BETWEEN2(p, a, b) TF_STEP_AFTER(p, a)*TF_STEP_BEFORE(p, b)

  #define TF_SMOOTHSTEP_AFTER_EPS(p, a, eps) smoothstep(a-0.5*eps, a+0.5*eps, p)
  #define TF_SMOOTHSTEP_AFTER(p, a, b) smoothstep(a, b, p)
  #define TF_SMOOTHSTEP_BEFORE_EPS(p, a, eps) (1.-smoothstep(a-0.5*eps, a+0.5*eps, p))
  #define TF_SMOOTHSTEP_BEFORE(p, a, b) (1.-smoothstep(a, b, p))

  #define TF_SMOOTHSTEP_BETWEEN_EPS(p, a, eps) TF_SMOOTHSTEP_BEFORE_EPS(abs(p), a, eps)
  #define TF_SMOOTHSTEP_BETWEEN(p, a, b) TF_SMOOTHSTEP_BEFORE(abs(p), a, b)
  #define TF_SMOOTHSTEP_BETWEEN2_EPS(p, a, b, eps) TF_SMOOTHSTEP_AFTER_EPS(p, a, eps)*TF_SMOOTHSTEP_BEFORE_EPS(p, b, eps)
  #define TF_SMOOTHSTEP_BETWEEN2(p, a1, b1, a2, b2) TF_SMOOTHSTEP_AFTER(p, a1, b1)*TF_SMOOTHSTEP_BEFORE(p, a2, b2)

  #define TF_TIMER(iTime, intervalCount, intervalDuration, intervalId) \
    mod(iTime, intervalDuration*intervalCount)/(intervalDuration*intervalCount);\
    intervalId = mod(floor(iTime/(intervalDuration)), (intervalCount))
  #define TF_TIMER_VIEW(col, pix, uv0_value) \
    {\
      vec2 uv0 = gl_FragCoord.xy/iResolution.xy;\
      if (uv0.y<pix/iResolution.y && uv0.x<uv0_value) col = vec3(1,0,0);\
    }

  float OR(float distA, float distB) {
    return min(distA, distB);
  }
  float AND(float distA, float distB) {
    return max(distA, distB);
  }
  float OR( float distA, float distB, float k ) {
    float h = clamp( 0.5 + 0.5*(distB-distA)/k, 0., 1. );
    return mix( distB, distA, h ) - k*h*(1.-h);
  }
  #if 0
    float AND( float distA, float distB, float k ) {
      float h = clamp( 0.5 - 0.5*(distB-distA)/k, 0., 1. );
      return mix( distB, distA, h ) + k*h*(1.-h);
    }
  #else
    float AND( float distA, float distB, float k ) {
      return - OR (- distA, - distB, k);
    }
  #endif
  float NOT(float dist) {
    return -dist;
  }

  Object OR(Object objectA, Object objectB) {
    if (objectB.distance<objectA.distance) return objectB;
    return objectA;
  }
  Object OR(Object objectA, Object objectB, float k) {
    Object object = objectA;
    if (objectB.distance<objectA.distance) object = objectB;
    if (k!=0.) object.distance = OR(objectA.distance, objectB.distance, k);
    return object;
  }
  Object AND(Object objectA, Object objectB) {
    if (objectB.distance>objectA.distance) return objectB;
    return objectA;
  }
  Object AND(Object objectA, Object objectB, float k) {
    Object object = objectA;
    if (objectB.distance>objectA.distance) object = objectB;
    if (k!=0.) object.distance = AND(objectA.distance, objectB.distance, k);
    return object;
  }
  Object NOT(Object object) {
    object.distance = -object.distance;
    return object;
  }

  const int NUM_STEPS = 8;
  const float EPSILON = 1e-3;

  

  float time;
#define FAR 100.
#define ID_NONE -1.

#define ID_FLOOR 0.
#define ID_PATH 1.
#define ID_GRID_SPH_LON 2.
#define ID_GRID_SPH_LAT 3.
#define ID_GRID_TRUCHET_LINE 4.
#define ID_GRID_TRUCHET_MOVE 5.
#define ID_HELIX 6.

vec2 TF_TRUCHET(inout vec3 pp, float CSIZE, out vec3 ppp, out float dir0, out float dir) {
	vec2 CID = TF_REPLICA(pp.xz, CSIZE);
	dir = mod(CID.x+CID.y, 2.)==0. ? -1. : 1.;
	float rnd = fract(sin(dot(CID + vec2(111, 73), vec2(7.63, 157.31)))*4832.3234);
	dir0 = rnd<0.5 ? -1. : 1.;
	if (dir0==-1.){
		#if 0
			TF_ROTATE(pp.xz, 0.5*PI);
		#else
			pp.xz = vec2(pp.z, -pp.x);
		#endif
	}
	vec3 ppp1 = pp;
	ppp1.xz -= 0.5*CSIZE;
	TF_CYL(ppp1.xz, 0.5*CSIZE, 1.);
	vec3 ppp2 = pp;
	ppp2.xz -= -0.5*CSIZE;
	TF_CYL(ppp2.xz, 0.5*CSIZE, 1.);
	ppp = ppp1.z < ppp2.z ? ppp1 : ppp2;

	return CID;
}

Object LonLatEllipseGrid(vec3 p, float n, vec3 S, float r_lon, float r_lat) {
	vec3 q;
	float d;
	
	Object object = Object(FAR, ID_NONE, p);

	float maxS = max(S.x, max(S.y, S.z));
	float minS = min(S.x, min(S.y, S.z));
	r_lon /= maxS;
	r_lat /= maxS;
	
	Object OBJ1 = Object(FAR, ID_GRID_SPH_LON, p);
	{
		q = p;
		q /= S;
		TF_REPLICA_ANGLE(q.xz, n, 0.);
		TF_CYL(q.yz, 1., 1.);
		d = TF_BALL(q.xz, r_lon);
		OBJ1.distance = d;
		OBJ1.position = q;
	}
	object = OR(object, OBJ1);
	
	Object OBJ2 = Object(FAR, ID_GRID_SPH_LAT, p);
	{
		q = p;
		q /= S;
		TF_CYL(q.xz, 0., 1.);
		TF_REPLICA_ANGLE(q.yz, n, 0.);
		TF_TRANSLATE(q.z, 1.);
		d = TF_BALL(q.yz, r_lat);
		OBJ2.distance = d;
		OBJ2.position = q;
	}
	object = OR(object, OBJ2);
	
	if (object.id!=ID_NONE) object.distance *= minS;
	
	return object;
}

float period_ID;

float map(vec3 p, inout Object object){
	vec3 q, pp, ppp;
	float d, d_cut, dir0, dir;

	object = Object(FAR, ID_NONE, p);

	float CSIZE = 3.;

	p.y -= -1.;

	float CID_Y = TF_REPLICA(p.y, 2.);
	p.xz -= CID_Y*CSIZE;
	
	Object OBJ1 = Object(FAR, ID_FLOOR, p);
	{
		q = p;
		q.x -= CSIZE;
		q.z -= 0.5*CSIZE;
		TF_REPLICA(q.xz, CSIZE);
		d = AND(TF_BALL(q.xz, 0.2), TF_BETWEEN(q.y, 2.));
		OBJ1.distance = d;
	}
	object = OR(object, OBJ1);
		
	
	float r_tube = 0.2*CSIZE;
	float r_sph = 0.18*CSIZE;

	pp = p;
	
	pp.x -= 0.5*CSIZE;
	vec2 CID = TF_TRUCHET(pp, CSIZE, ppp, dir0, dir);
	
	Object OBJ2 = Object(FAR, ID_PATH, p);
	{
		q = ppp;
		q.y -= -(r_tube + 0.025);
		d = TF_BOX(q.yz, vec2(0.025, 0.2));
		OBJ2.distance = d;
	}
	object = OR(object, OBJ2);
	
	if (period_ID>0. && period_ID!=3.) {
		Object OBJ2a = Object(FAR, ID_HELIX, p);
		{
			float R = r_tube-0.03;
			float Step = 2.*PI*0.5*CSIZE/32.;
			q = ppp;
			q.x -= Step*0.25;
			q.x -= 0.6*time*dir*dir0;
			q = q.yxz;
			TF_HELIX_Y(q, 1., R,  Step, 0.);
			d = TF_BALL(q.xz, 0.03);
			OBJ2a.distance = d;
		}
		object = OR(object, OBJ2a);
	}
	
	if (period_ID>1.) {
		q = ppp;
		q.x -= -0.7*time*dir*dir0;
		TF_REPLICA(q.x, (2.*PI*0.5*CSIZE)/4. );
		TF_ROTATE(q.xy, -time*dir*dir0);
		object = OR(object, LonLatEllipseGrid(q, 15., vec3(r_sph), 0.01, 0.01));
	}
	
	if (period_ID>2.) {
		pp = ppp;
		TF_CYL(pp.zy, r_tube, 1.);
		
		CSIZE = (2.*PI*0.5*CSIZE)/70.;
		pp.x -= dir*0.5*CSIZE;
		CID = TF_TRUCHET(pp, CSIZE, ppp, dir0, dir);
	
		Object OBJ3 = Object(FAR, ID_GRID_TRUCHET_LINE, p);
		{
			q = ppp;
			d = TF_BALL(q.yz, 0.0060);
			q.x -= 0.08*time*dir*dir0;
			float nFigs = 4.;
			TF_REPLICA(q.x, 2.*PI*CSIZE*0.5/nFigs);
			d_cut = TF_BALL(q.xy, 0.020);
			d = AND(d, -d_cut);
			OBJ3.distance = d;
		}
		object = OR(object, OBJ3);
	
		Object OBJ4 = Object(FAR, ID_GRID_TRUCHET_MOVE, p);
		{
			TF_TORUS_XZ(q, 0.015, 0.005);
			d = TF_BEFORE(q.y, 0.);
			OBJ4.distance = d;
			OBJ4.position = q;
		}
		object = OR(object, OBJ4);
	}
	
	if (object.id!=ID_NONE) object.distance = min(object.distance, 0.3);
	
    return object.distance;
}

float map ( in vec3 p ) {
	Object object;
	return map (p, object);
}

vec3 mapNormal (vec3 p, float eps) {
	vec2 e = vec2 (eps, -eps);
	vec4 v = vec4 (
		map (p + e.xxx), 
		map (p + e.xyy),
	 	map (p + e.yxy), 
		map (p + e.yyx)
	);
	return normalize (vec3 (v.x - v.y - v.z - v.w) + 2. * vec3 (v.y, v.z, v.w));
}

float rayMarch(inout Ray ray) {
	ray.distance = ray.near;
	float steps;
	for (float i = 0.; i < 200.; ++i) {
		ray.position = ray.origin + ray.direction * ray.distance;
		ray.object.distance = map(ray.position, ray.object);
		ray.hit = abs(ray.object.distance) < ray.epsilon;
		if (ray.hit) break;
		ray.distance += ray.object.distance*ray.swing;
		if (ray.distance>ray.far) break;
		steps = i + 1.;
		if (steps>ray.steps) break;
	}
	return steps;
}

float softShadow( Ray ray, float k ) {
    float shade = 1.0;
    ray.distance = ray.near;    
	float steps = 1.;
    for ( int i = 0; i < 50; i++ ) {
		ray.position = ray.origin + ray.direction * ray.distance;
        ray.object.distance = map(ray.position);
        shade = min( shade, smoothstep( 0.0, 1.0, k * ray.object.distance / ray.distance)); 
		ray.hit = ray.object.distance < ray.epsilon;
		if (ray.hit) break;
        ray.distance += min( ray.object.distance, ray.far / ray.steps * 2. ); 
        if (ray.distance > ray.far ) break; 
		steps++;
		if (steps>ray.steps) break;
    }
	#if 0
		return shade;
	#else
    	return min( max( shade, 0.0 ) + 0.5, 1.0 ); 
	#endif
}

vec3 SkyCol (vec3 rd) {
	return mix(vec3 (0.5, 0.75, 1.), vec3(1.0), (0.5-rd.y));
}

vec4 getMaterial(Ray ray) {

	vec3 mCol = vec3(1);
	float mSpec = 0.5;
	vec3 p = ray.position;
	vec3 q = ray.object.position;
	if(ray.object.id==ID_FLOOR) {
		mCol = vec3(0.5,0.75,1);
		mSpec = 0.1;
	} else if(ray.object.id==ID_PATH) {
		mCol = vec3(0, 0.5, 0);
	} else if(ray.object.id==ID_GRID_SPH_LON) {
		mCol = vec3(1,0,0);
	} else if(ray.object.id==ID_GRID_SPH_LAT) {
		mCol = vec3(1,0,0);
	} else if(ray.object.id==ID_GRID_TRUCHET_LINE) {
		mCol = vec3(0.5, 0.75, 1.);
	} else if(ray.object.id==ID_GRID_TRUCHET_MOVE) {
		mCol = vec3(1.);
		q.x -= 0.1*time;
		float id = TF_REPLICA(q.x, 2.*PI*0.015/4.);
		if (mod(id, 2.)==1.) mCol = vec3(0.4);
		mSpec = 1.;
	} else if(ray.object.id==ID_HELIX) {
		mCol = vec3(0.8);
	}
	return vec4(mCol, mSpec);
}

vec3 lighting(Ray ray, vec3 ltDir, vec4 mat) {
    float sh = 1.0;
    #ifdef SOFT_SHADOW
    Ray ray1 = ray;
    ray1.origin = ray.position;
    ray1.direction = ltDir;
    sh = softShadow(ray1, 240.);
    #endif
    float diff = clamp(dot(ray.normal, ltDir), 0., 1.);
    float spec = pow(max(dot(ray.direction, reflect(ltDir, ray.normal)), 0.), 64.);
    return mat.rgb * (0.1 + 0.9 * diff * sh) + spec * mat.a * sh;
}

vec3 render(Ray ray) {
    vec3 col;
    vec3 bg = SkyCol(ray.direction);
    rayMarch(ray);
    if (ray.distance < FAR) {
        ray.normal = mapNormal(ray.position, 0.001);
        vec4 mat = getMaterial(ray);
        #if 0
        vec3 ltPos = ray.origin + vec3(0, 2., 0);
        vec3 ltDir = normalize(ltPos - ray.position);
        float ltDist = length(ltPos - ray.position);
        float att = 1. / pow(ltDist, 0.1);
        #else
        vec3 ltDir = -ray.direction;
        float att = 1.;
        #endif
        col = lighting(ray, ltDir, mat) * att;
        float fogStart = 6.;
        vec3 fogColor = bg;
        col = mix(col, fogColor, 1. - exp(-pow(ray.distance / fogStart, 3.)));
    } else {
        col = bg;
    }
    col = clamp(col, 0., 1.);
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    time = iTime + 41.;
    float aspect = iResolution.x / iResolution.y;
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv = 2. * uv - 1.;
    vec2 mouse = iMouse.xy / iResolution.xy - 0.5;
    if (iMouse.xy == vec2(0)) mouse = vec2(0);
    vec2 ori = vec2(
        iMouse.z == 0. ? radians(-5.) : radians(-5.) + mouse.y * PI * 2.,
        iMouse.z == 0. ? radians(-5.) : radians(-5.) + mouse.x * PI * 2.
    );
    #if 1
    ori.x = clamp(ori.x, -PI / 2., PI / 2.);
    #else
    ori.x = clamp(ori.x, -radians(20.), radians(20.));
    #endif
    Camera cam;
    {
        cam.fov = 60.;
        cam.aspect = aspect;
        
        // Move the camera along the +X, -Y, and +Z axes
        cam.origin = vec3(1.5 + 1.1 * time, 0, 0);
        
        cam.target = cam.origin + vec3(0, 0, 1);
        cam.up = vec3(0, 1, 0);
        
        // Apply a fixed tilt to the positive X and negative Y axes
        mat3 fixedTilt = TF_ROTATE_X(radians(5.0)) * TF_ROTATE_Y(radians(125.0));
        
        // Combine fixed tilt with dynamic tilt
        cam.vMat = fixedTilt * TF_ROTATE_Y(ori.y) * TF_ROTATE_X(ori.x);
        
        cam.mMat = mat3(1);
    }
    Ray ray = lookAt(uv, cam);
    {
        ray.near = 0.01;
        ray.far = FAR;
        ray.epsilon = 0.001;
        ray.swing = 1.;
        ray.steps = 200.;
    }
    vec3 ro = ray.origin;
    vec3 rd = ray.direction;
    float uv0_value = TF_TIMER(time, 5., 20., period_ID);
    vec3 col = render(ray);
    col = pow(col, vec3(.4545));
    TF_TIMER_VIEW(col, 5., uv0_value);
    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}`;