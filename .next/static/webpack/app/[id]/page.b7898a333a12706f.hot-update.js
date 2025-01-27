"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/[id]/page",{

/***/ "(app-pages-browser)/./app/shaders/dirty-notch.ts":
/*!************************************!*\
  !*** ./app/shaders/dirty-notch.ts ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fragmentShader: () => (/* binding */ fragmentShader),\n/* harmony export */   vertexShader: () => (/* binding */ vertexShader)\n/* harmony export */ });\nconst vertexShader = \"\\n  attribute vec4 position;\\n  void main() {\\n    gl_Position = position;\\n  }\\n\";\nconst fragmentShader = \"\\nfloat noise( in vec3 x )\\n{\\n    vec3 i = floor(x);\\n    vec3 f = fract(x);\\n\tf = f*f*(3.0-2.0*f);\\n\tvec2 uv = (i.xy+vec2(37.0,17.0)*i.z) + f.xy;\\n\tvec2 rg = textureLod( iChannel0, (uv+0.5)/256.0, 0.0 ).yx;\\n\treturn mix( rg.x, rg.y, f.z );\\n}\\n\\nfloat mapTerrain( vec3 p )\\n{\\n\tp *= 0.1; \\n\tp.xz *= 0.6;\\n\t\\n\tfloat time = 0.5 + 0.15*iTime;\\n\tfloat ft = fract( time );\\n\tfloat it = floor( time );\\n\tft = smoothstep( 0.7, 1.0, ft );\\n\ttime = it + ft;\\n\tfloat spe = 1.4;\\n\t\\n\tfloat f;\\n    f  = 0.5000*noise( p*1.00 + vec3(0.0,1.0,0.0)*spe*time );\\n    f += 0.2500*noise( p*2.02 + vec3(0.0,2.0,0.0)*spe*time );\\n    f += 0.1250*noise( p*4.01 );\\n\treturn 25.0*f-10.0;\\n}\\n\\nvec3 gro = vec3(0.0);\\n\\nfloat map(in vec3 c) \\n{\\n\tvec3 p = c + 0.5;\\n\t\\n\tfloat f = mapTerrain( p ) + 0.25*p.y;\\n\\n    f = mix( f, 1.0, step( length(gro-p), 5.0 ) );\\n\\n\treturn step( f, 0.5 );\\n}\\n\\nconst vec3 lig = normalize( vec3(-0.4,0.3,0.7) );\\n\\nfloat raycast( in vec3 ro, in vec3 rd, out vec3 oVos, out vec3 oDir )\\n{\\n\tvec3 pos = floor(ro);\\n\tvec3 ri = 1.0/rd;\\n\tvec3 rs = sign(rd);\\n\tvec3 dis = (pos-ro + 0.5 + rs*0.5) * ri;\\n\t\\n\tfloat res = -1.0;\\n\tvec3 mm = vec3(0.0);\\n\tfor( int i=0; i<128; i++ ) \\n\t{\\n\t\tif( map(pos)>0.5 ) { res=1.0; break; }\\n\t\tmm = step(dis.xyz, dis.yzx) * step(dis.xyz, dis.zxy);\\n\t\tdis += mm * rs * ri;\\n        pos += mm * rs;\\n\t}\\n\\n\tvec3 nor = -mm*rs;\\n\tvec3 vos = pos;\\n\t\\n    // intersect the cube\t\\n\tvec3 mini = (pos-ro + 0.5 - 0.5*vec3(rs))*ri;\\n\tfloat t = max ( mini.x, max ( mini.y, mini.z ) );\\n\t\\n\toDir = mm;\\n\toVos = vos;\\n\\n\treturn t*res;\\n}\\n\\nvec3 path( float t, float ya )\\n{\\n    vec2 p  = 100.0*sin( 0.02*t*vec2(1.0,1.2) + vec2(0.1,0.9) );\\n\t     p +=  50.0*sin( 0.04*t*vec2(1.3,1.0) + vec2(1.0,4.5) );\\n\t\\n\treturn vec3( p.x, 18.0 + ya*4.0*sin(0.05*t), p.y );\\n}\\n\\nmat3 setCamera( in vec3 ro, in vec3 ta, float cr )\\n{\\n\tvec3 cw = normalize(ta-ro);\\n\tvec3 cp = vec3(sin(cr), cos(cr),0.0);\\n\tvec3 cu = normalize( cross(cw,cp) );\\n\tvec3 cv = normalize( cross(cu,cw) );\\n    return mat3( cu, cv, -cw );\\n}\\n\\nfloat maxcomp( in vec4 v )\\n{\\n    return max( max(v.x,v.y), max(v.z,v.w) );\\n}\\n\\nfloat isEdge( in vec2 uv, vec4 va, vec4 vb, vec4 vc, vec4 vd )\\n{\\n    vec2 st = 1.0 - uv;\\n\\n    // edges\\n    vec4 wb = smoothstep( 0.85, 0.99, vec4(uv.x,\\n                                           st.x,\\n                                           uv.y,\\n                                           st.y) ) * ( 1.0 - va + va*vc );\\n    // corners\\n    vec4 wc = smoothstep( 0.85, 0.99, vec4(uv.x*uv.y,\\n                                           st.x*uv.y,\\n                                           st.x*st.y,\\n                                           uv.x*st.y) ) * ( 1.0 - vb + vd*vb );\\n    return maxcomp( max(wb,wc) );\\n}\\n\\n\\nvec3 render( in vec3 ro, in vec3 rd )\\n{\\n    vec3 col = vec3(0.0);\\n\t\\n    // raymarch\t\\n\tvec3 vos, dir;\\n\tfloat t = raycast( ro, rd, vos, dir );\\n\tif( t>0.0 )\\n\t{\\n        vec3 nor = -dir*sign(rd);\\n        vec3 pos = ro + rd*t;\\n        vec3 uvw = pos - vos;\\n\t\t\\n\t\tvec3 v1  = vos + nor + dir.yzx;\\n\t    vec3 v2  = vos + nor - dir.yzx;\\n\t    vec3 v3  = vos + nor + dir.zxy;\\n\t    vec3 v4  = vos + nor - dir.zxy;\\n\t\tvec3 v5  = vos + nor + dir.yzx + dir.zxy;\\n        vec3 v6  = vos + nor - dir.yzx + dir.zxy;\\n\t    vec3 v7  = vos + nor - dir.yzx - dir.zxy;\\n\t    vec3 v8  = vos + nor + dir.yzx - dir.zxy;\\n\t    vec3 v9  = vos + dir.yzx;\\n\t    vec3 v10 = vos - dir.yzx;\\n\t    vec3 v11 = vos + dir.zxy;\\n\t    vec3 v12 = vos - dir.zxy;\\n \t    vec3 v13 = vos + dir.yzx + dir.zxy; \\n\t    vec3 v14 = vos - dir.yzx + dir.zxy ;\\n\t    vec3 v15 = vos - dir.yzx - dir.zxy;\\n\t    vec3 v16 = vos + dir.yzx - dir.zxy;\\n\\n\t\tvec4 vc = vec4( map(v1),  map(v2),  map(v3),  map(v4)  );\\n\t    vec4 vd = vec4( map(v5),  map(v6),  map(v7),  map(v8)  );\\n\t    vec4 va = vec4( map(v9),  map(v10), map(v11), map(v12) );\\n\t    vec4 vb = vec4( map(v13), map(v14), map(v15), map(v16) );\\n\t\t\\n\t\tvec2 uv = vec2( dot(dir.yzx, uvw), dot(dir.zxy, uvw) );\\n\t\t\t\\n        // wireframe\\n        float www = 1.0 - isEdge( uv, va, vb, vc, vd );\\n        \\n        vec3 wir = smoothstep( 0.4, 0.5, abs(uvw-0.5) );\\n        float vvv = (1.0-wir.x*wir.y)*(1.0-wir.x*wir.z)*(1.0-wir.y*wir.z);\\n\\n        col = vec3(0.5);\\n        col += 0.8*vec3(0.1,0.3,0.4);\\n        col *= 1.0 - 0.75*(1.0-vvv)*www;\\n\t\t\\n        // lighting\\n        float dif = clamp( dot( nor, lig ), 0.0, 1.0 );\\n        float bac = clamp( dot( nor, normalize(lig*vec3(-1.0,0.0,-1.0)) ), 0.0, 1.0 );\\n        float sky = 0.5 + 0.5*nor.y;\\n        float amb = clamp(0.75 + pos.y/25.0,0.0,1.0);\\n        float occ = 1.0;\\n\t\\n        // ambient occlusion (https://iquilezles.org/articles/voxellines/)\\n        vec2 st = 1.0 - uv;\\n        // edges\\n        vec4 wa = vec4( uv.x, st.x, uv.y, st.y ) * vc;\\n        // corners\\n        vec4 wb = vec4(uv.x*uv.y,\\n                       st.x*uv.y,\\n                       st.x*st.y,\\n                       uv.x*st.y)*vd*(1.0-vc.xzyw)*(1.0-vc.zywx);\\n        occ = wa.x + wa.y + wa.z + wa.w +\\n              wb.x + wb.y + wb.z + wb.w;\\n           \\n           \\n        occ = 1.0 - occ/8.0;\\n        occ = occ*occ;\\n        occ = occ*occ;\\n        occ *= amb;\\n\\n        // lighting\\n        vec3 lin = vec3(0.0);\\n        lin += 2.5*dif*vec3(1.00,0.90,0.70)*(0.5+0.5*occ);\\n        lin += 0.5*bac*vec3(0.15,0.10,0.10)*occ;\\n        lin += 2.0*sky*vec3(0.40,0.30,0.15)*occ;\\n\\n        // line glow\t\\n        float lineglow = 0.0;\\n        lineglow += smoothstep( 0.4, 1.0,     uv.x )*(1.0-va.x*(1.0-vc.x));\\n        lineglow += smoothstep( 0.4, 1.0, 1.0-uv.x )*(1.0-va.y*(1.0-vc.y));\\n        lineglow += smoothstep( 0.4, 1.0,     uv.y )*(1.0-va.z*(1.0-vc.z));\\n        lineglow += smoothstep( 0.4, 1.0, 1.0-uv.y )*(1.0-va.w*(1.0-vc.w));\\n        lineglow += smoothstep( 0.4, 1.0,      uv.y*      uv.x )*(1.0-vb.x*(1.0-vd.x));\\n        lineglow += smoothstep( 0.4, 1.0,      uv.y* (1.0-uv.x))*(1.0-vb.y*(1.0-vd.y));\\n        lineglow += smoothstep( 0.4, 1.0, (1.0-uv.y)*(1.0-uv.x))*(1.0-vb.z*(1.0-vd.z));\\n        lineglow += smoothstep( 0.4, 1.0, (1.0-uv.y)*     uv.x )*(1.0-vb.w*(1.0-vd.w));\\n\t\t\\n        vec3 linCol = 2.0*vec3(5.0,0.6,0.0);\\n        linCol *= (0.5+0.5*occ)*0.5;\\n        lin += lineglow*linCol;\\n\t\t\\n        col = col*lin;\\n        col += 8.0*linCol*vec3(1.0,2.0,3.0)*(1.0-www);//*(0.5+1.0*sha);\\n        col += 0.1*lineglow*linCol;\\n        col *= min(0.1,exp( -0.07*t ));\\n\t\\n        // blend to black & white\t\t\\n        vec3 col2 = vec3(1.3)*(0.5+0.5*nor.y)*occ*exp( -0.04*t );;\\n        float mi = cos(-0.7+0.5*iTime);\\n        mi = smoothstep( 0.70, 0.75, mi );\\n        col = mix( col, col2, mi );\\n\t}\\n\\n\t// gamma\t\\n\tcol = pow( col, vec3(0.45) );\\n\\n    return col;\\n}\\n\\nvoid mainImage( out vec4 fragColor, in vec2 fragCoord )\\n{\\n    // inputs\t\\n    vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;\\n    vec2 mo = iMouse.xy / iResolution.xy;\\n    if( iMouse.z<=0.00001 ) mo=vec2(0.0);\\n\tfloat time = 2.0*iTime + 50.0*mo.x;\\n    \\n    // camera\\n\tfloat cr = 0.2*cos(0.1*iTime);\\n\tvec3 ro = path( time+0.0, 1.0 );\\n\tvec3 ta = path( time+5.0, 1.0 ) - vec3(0.0,6.0,0.0);\\n\tgro = ro;\\n\\n    mat3 cam = setCamera( ro, ta, cr );\\n\t\\n\t// build ray\\n    float r2 = p.x*p.x*0.32 + p.y*p.y;\\n    p *= (7.0-sqrt(37.5-11.5*r2))/(r2+1.0);\\n    vec3 rd = normalize( cam * vec3(p.xy,-2.5) );\\n\\n    vec3 col = render( ro, rd );\\n    \\n\t// vignetting\t\\n\tvec2 q = fragCoord / iResolution.xy;\\n\tcol *= 0.5 + 0.5*pow( 16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y), 0.1 );\\n\t\\n\tfragColor = vec4( col, 1.0 );\\n}\\n\\nvoid mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )\\n{\\n\tfloat time = 1.0*iTime;\\n\\n    float cr = 0.0;\\n\tvec3 ro = path( time+0.0, 0.0 ) + vec3(0.0,0.7,0.0);\\n\tvec3 ta = path( time+2.5, 0.0 ) + vec3(0.0,0.7,0.0);\\n\\n    mat3 cam = setCamera( ro, ta, cr );\\n\\n    vec3 col = render( ro + cam*fragRayOri, cam*fragRayDir );\\n    \\n    fragColor = vec4( col, 1.0 );\\n}\\n\";\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9zaGFkZXJzL2RpcnR5LW5vdGNoLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sTUFBTUEsZUFBZ0Isb0ZBSzNCO0FBRUssTUFBTUMsaUJBQWtCLGl4UEE4UTdCIiwic291cmNlcyI6WyIvVXNlcnMvamVyZW15ai9Eb2N1bWVudHMvc291cmNlL3JlcG9zL3NoYWRlcnMvYXBwL3NoYWRlcnMvZGlydHktbm90Y2gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHZlcnRleFNoYWRlciA9IGBcbiAgYXR0cmlidXRlIHZlYzQgcG9zaXRpb247XG4gIHZvaWQgbWFpbigpIHtcbiAgICBnbF9Qb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgZnJhZ21lbnRTaGFkZXIgPSBgXG5mbG9hdCBub2lzZSggaW4gdmVjMyB4IClcbntcbiAgICB2ZWMzIGkgPSBmbG9vcih4KTtcbiAgICB2ZWMzIGYgPSBmcmFjdCh4KTtcblx0ZiA9IGYqZiooMy4wLTIuMCpmKTtcblx0dmVjMiB1diA9IChpLnh5K3ZlYzIoMzcuMCwxNy4wKSppLnopICsgZi54eTtcblx0dmVjMiByZyA9IHRleHR1cmVMb2QoIGlDaGFubmVsMCwgKHV2KzAuNSkvMjU2LjAsIDAuMCApLnl4O1xuXHRyZXR1cm4gbWl4KCByZy54LCByZy55LCBmLnogKTtcbn1cblxuZmxvYXQgbWFwVGVycmFpbiggdmVjMyBwIClcbntcblx0cCAqPSAwLjE7IFxuXHRwLnh6ICo9IDAuNjtcblx0XG5cdGZsb2F0IHRpbWUgPSAwLjUgKyAwLjE1KmlUaW1lO1xuXHRmbG9hdCBmdCA9IGZyYWN0KCB0aW1lICk7XG5cdGZsb2F0IGl0ID0gZmxvb3IoIHRpbWUgKTtcblx0ZnQgPSBzbW9vdGhzdGVwKCAwLjcsIDEuMCwgZnQgKTtcblx0dGltZSA9IGl0ICsgZnQ7XG5cdGZsb2F0IHNwZSA9IDEuNDtcblx0XG5cdGZsb2F0IGY7XG4gICAgZiAgPSAwLjUwMDAqbm9pc2UoIHAqMS4wMCArIHZlYzMoMC4wLDEuMCwwLjApKnNwZSp0aW1lICk7XG4gICAgZiArPSAwLjI1MDAqbm9pc2UoIHAqMi4wMiArIHZlYzMoMC4wLDIuMCwwLjApKnNwZSp0aW1lICk7XG4gICAgZiArPSAwLjEyNTAqbm9pc2UoIHAqNC4wMSApO1xuXHRyZXR1cm4gMjUuMCpmLTEwLjA7XG59XG5cbnZlYzMgZ3JvID0gdmVjMygwLjApO1xuXG5mbG9hdCBtYXAoaW4gdmVjMyBjKSBcbntcblx0dmVjMyBwID0gYyArIDAuNTtcblx0XG5cdGZsb2F0IGYgPSBtYXBUZXJyYWluKCBwICkgKyAwLjI1KnAueTtcblxuICAgIGYgPSBtaXgoIGYsIDEuMCwgc3RlcCggbGVuZ3RoKGdyby1wKSwgNS4wICkgKTtcblxuXHRyZXR1cm4gc3RlcCggZiwgMC41ICk7XG59XG5cbmNvbnN0IHZlYzMgbGlnID0gbm9ybWFsaXplKCB2ZWMzKC0wLjQsMC4zLDAuNykgKTtcblxuZmxvYXQgcmF5Y2FzdCggaW4gdmVjMyBybywgaW4gdmVjMyByZCwgb3V0IHZlYzMgb1Zvcywgb3V0IHZlYzMgb0RpciApXG57XG5cdHZlYzMgcG9zID0gZmxvb3Iocm8pO1xuXHR2ZWMzIHJpID0gMS4wL3JkO1xuXHR2ZWMzIHJzID0gc2lnbihyZCk7XG5cdHZlYzMgZGlzID0gKHBvcy1ybyArIDAuNSArIHJzKjAuNSkgKiByaTtcblx0XG5cdGZsb2F0IHJlcyA9IC0xLjA7XG5cdHZlYzMgbW0gPSB2ZWMzKDAuMCk7XG5cdGZvciggaW50IGk9MDsgaTwxMjg7IGkrKyApIFxuXHR7XG5cdFx0aWYoIG1hcChwb3MpPjAuNSApIHsgcmVzPTEuMDsgYnJlYWs7IH1cblx0XHRtbSA9IHN0ZXAoZGlzLnh5eiwgZGlzLnl6eCkgKiBzdGVwKGRpcy54eXosIGRpcy56eHkpO1xuXHRcdGRpcyArPSBtbSAqIHJzICogcmk7XG4gICAgICAgIHBvcyArPSBtbSAqIHJzO1xuXHR9XG5cblx0dmVjMyBub3IgPSAtbW0qcnM7XG5cdHZlYzMgdm9zID0gcG9zO1xuXHRcbiAgICAvLyBpbnRlcnNlY3QgdGhlIGN1YmVcdFxuXHR2ZWMzIG1pbmkgPSAocG9zLXJvICsgMC41IC0gMC41KnZlYzMocnMpKSpyaTtcblx0ZmxvYXQgdCA9IG1heCAoIG1pbmkueCwgbWF4ICggbWluaS55LCBtaW5pLnogKSApO1xuXHRcblx0b0RpciA9IG1tO1xuXHRvVm9zID0gdm9zO1xuXG5cdHJldHVybiB0KnJlcztcbn1cblxudmVjMyBwYXRoKCBmbG9hdCB0LCBmbG9hdCB5YSApXG57XG4gICAgdmVjMiBwICA9IDEwMC4wKnNpbiggMC4wMip0KnZlYzIoMS4wLDEuMikgKyB2ZWMyKDAuMSwwLjkpICk7XG5cdCAgICAgcCArPSAgNTAuMCpzaW4oIDAuMDQqdCp2ZWMyKDEuMywxLjApICsgdmVjMigxLjAsNC41KSApO1xuXHRcblx0cmV0dXJuIHZlYzMoIHAueCwgMTguMCArIHlhKjQuMCpzaW4oMC4wNSp0KSwgcC55ICk7XG59XG5cbm1hdDMgc2V0Q2FtZXJhKCBpbiB2ZWMzIHJvLCBpbiB2ZWMzIHRhLCBmbG9hdCBjciApXG57XG5cdHZlYzMgY3cgPSBub3JtYWxpemUodGEtcm8pO1xuXHR2ZWMzIGNwID0gdmVjMyhzaW4oY3IpLCBjb3MoY3IpLDAuMCk7XG5cdHZlYzMgY3UgPSBub3JtYWxpemUoIGNyb3NzKGN3LGNwKSApO1xuXHR2ZWMzIGN2ID0gbm9ybWFsaXplKCBjcm9zcyhjdSxjdykgKTtcbiAgICByZXR1cm4gbWF0MyggY3UsIGN2LCAtY3cgKTtcbn1cblxuZmxvYXQgbWF4Y29tcCggaW4gdmVjNCB2IClcbntcbiAgICByZXR1cm4gbWF4KCBtYXgodi54LHYueSksIG1heCh2Lnosdi53KSApO1xufVxuXG5mbG9hdCBpc0VkZ2UoIGluIHZlYzIgdXYsIHZlYzQgdmEsIHZlYzQgdmIsIHZlYzQgdmMsIHZlYzQgdmQgKVxue1xuICAgIHZlYzIgc3QgPSAxLjAgLSB1djtcblxuICAgIC8vIGVkZ2VzXG4gICAgdmVjNCB3YiA9IHNtb290aHN0ZXAoIDAuODUsIDAuOTksIHZlYzQodXYueCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdC54LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV2LnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3QueSkgKSAqICggMS4wIC0gdmEgKyB2YSp2YyApO1xuICAgIC8vIGNvcm5lcnNcbiAgICB2ZWM0IHdjID0gc21vb3Roc3RlcCggMC44NSwgMC45OSwgdmVjNCh1di54KnV2LnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3QueCp1di55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0Lngqc3QueSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1di54KnN0LnkpICkgKiAoIDEuMCAtIHZiICsgdmQqdmIgKTtcbiAgICByZXR1cm4gbWF4Y29tcCggbWF4KHdiLHdjKSApO1xufVxuXG5cbnZlYzMgcmVuZGVyKCBpbiB2ZWMzIHJvLCBpbiB2ZWMzIHJkIClcbntcbiAgICB2ZWMzIGNvbCA9IHZlYzMoMC4wKTtcblx0XG4gICAgLy8gcmF5bWFyY2hcdFxuXHR2ZWMzIHZvcywgZGlyO1xuXHRmbG9hdCB0ID0gcmF5Y2FzdCggcm8sIHJkLCB2b3MsIGRpciApO1xuXHRpZiggdD4wLjAgKVxuXHR7XG4gICAgICAgIHZlYzMgbm9yID0gLWRpcipzaWduKHJkKTtcbiAgICAgICAgdmVjMyBwb3MgPSBybyArIHJkKnQ7XG4gICAgICAgIHZlYzMgdXZ3ID0gcG9zIC0gdm9zO1xuXHRcdFxuXHRcdHZlYzMgdjEgID0gdm9zICsgbm9yICsgZGlyLnl6eDtcblx0ICAgIHZlYzMgdjIgID0gdm9zICsgbm9yIC0gZGlyLnl6eDtcblx0ICAgIHZlYzMgdjMgID0gdm9zICsgbm9yICsgZGlyLnp4eTtcblx0ICAgIHZlYzMgdjQgID0gdm9zICsgbm9yIC0gZGlyLnp4eTtcblx0XHR2ZWMzIHY1ICA9IHZvcyArIG5vciArIGRpci55enggKyBkaXIuenh5O1xuICAgICAgICB2ZWMzIHY2ICA9IHZvcyArIG5vciAtIGRpci55enggKyBkaXIuenh5O1xuXHQgICAgdmVjMyB2NyAgPSB2b3MgKyBub3IgLSBkaXIueXp4IC0gZGlyLnp4eTtcblx0ICAgIHZlYzMgdjggID0gdm9zICsgbm9yICsgZGlyLnl6eCAtIGRpci56eHk7XG5cdCAgICB2ZWMzIHY5ICA9IHZvcyArIGRpci55eng7XG5cdCAgICB2ZWMzIHYxMCA9IHZvcyAtIGRpci55eng7XG5cdCAgICB2ZWMzIHYxMSA9IHZvcyArIGRpci56eHk7XG5cdCAgICB2ZWMzIHYxMiA9IHZvcyAtIGRpci56eHk7XG4gXHQgICAgdmVjMyB2MTMgPSB2b3MgKyBkaXIueXp4ICsgZGlyLnp4eTsgXG5cdCAgICB2ZWMzIHYxNCA9IHZvcyAtIGRpci55enggKyBkaXIuenh5IDtcblx0ICAgIHZlYzMgdjE1ID0gdm9zIC0gZGlyLnl6eCAtIGRpci56eHk7XG5cdCAgICB2ZWMzIHYxNiA9IHZvcyArIGRpci55enggLSBkaXIuenh5O1xuXG5cdFx0dmVjNCB2YyA9IHZlYzQoIG1hcCh2MSksICBtYXAodjIpLCAgbWFwKHYzKSwgIG1hcCh2NCkgICk7XG5cdCAgICB2ZWM0IHZkID0gdmVjNCggbWFwKHY1KSwgIG1hcCh2NiksICBtYXAodjcpLCAgbWFwKHY4KSAgKTtcblx0ICAgIHZlYzQgdmEgPSB2ZWM0KCBtYXAodjkpLCAgbWFwKHYxMCksIG1hcCh2MTEpLCBtYXAodjEyKSApO1xuXHQgICAgdmVjNCB2YiA9IHZlYzQoIG1hcCh2MTMpLCBtYXAodjE0KSwgbWFwKHYxNSksIG1hcCh2MTYpICk7XG5cdFx0XG5cdFx0dmVjMiB1diA9IHZlYzIoIGRvdChkaXIueXp4LCB1dncpLCBkb3QoZGlyLnp4eSwgdXZ3KSApO1xuXHRcdFx0XG4gICAgICAgIC8vIHdpcmVmcmFtZVxuICAgICAgICBmbG9hdCB3d3cgPSAxLjAgLSBpc0VkZ2UoIHV2LCB2YSwgdmIsIHZjLCB2ZCApO1xuICAgICAgICBcbiAgICAgICAgdmVjMyB3aXIgPSBzbW9vdGhzdGVwKCAwLjQsIDAuNSwgYWJzKHV2dy0wLjUpICk7XG4gICAgICAgIGZsb2F0IHZ2diA9ICgxLjAtd2lyLngqd2lyLnkpKigxLjAtd2lyLngqd2lyLnopKigxLjAtd2lyLnkqd2lyLnopO1xuXG4gICAgICAgIGNvbCA9IHZlYzMoMC41KTtcbiAgICAgICAgY29sICs9IDAuOCp2ZWMzKDAuMSwwLjMsMC40KTtcbiAgICAgICAgY29sICo9IDEuMCAtIDAuNzUqKDEuMC12dnYpKnd3dztcblx0XHRcbiAgICAgICAgLy8gbGlnaHRpbmdcbiAgICAgICAgZmxvYXQgZGlmID0gY2xhbXAoIGRvdCggbm9yLCBsaWcgKSwgMC4wLCAxLjAgKTtcbiAgICAgICAgZmxvYXQgYmFjID0gY2xhbXAoIGRvdCggbm9yLCBub3JtYWxpemUobGlnKnZlYzMoLTEuMCwwLjAsLTEuMCkpICksIDAuMCwgMS4wICk7XG4gICAgICAgIGZsb2F0IHNreSA9IDAuNSArIDAuNSpub3IueTtcbiAgICAgICAgZmxvYXQgYW1iID0gY2xhbXAoMC43NSArIHBvcy55LzI1LjAsMC4wLDEuMCk7XG4gICAgICAgIGZsb2F0IG9jYyA9IDEuMDtcblx0XG4gICAgICAgIC8vIGFtYmllbnQgb2NjbHVzaW9uIChodHRwczovL2lxdWlsZXpsZXMub3JnL2FydGljbGVzL3ZveGVsbGluZXMvKVxuICAgICAgICB2ZWMyIHN0ID0gMS4wIC0gdXY7XG4gICAgICAgIC8vIGVkZ2VzXG4gICAgICAgIHZlYzQgd2EgPSB2ZWM0KCB1di54LCBzdC54LCB1di55LCBzdC55ICkgKiB2YztcbiAgICAgICAgLy8gY29ybmVyc1xuICAgICAgICB2ZWM0IHdiID0gdmVjNCh1di54KnV2LnksXG4gICAgICAgICAgICAgICAgICAgICAgIHN0LngqdXYueSxcbiAgICAgICAgICAgICAgICAgICAgICAgc3QueCpzdC55LFxuICAgICAgICAgICAgICAgICAgICAgICB1di54KnN0LnkpKnZkKigxLjAtdmMueHp5dykqKDEuMC12Yy56eXd4KTtcbiAgICAgICAgb2NjID0gd2EueCArIHdhLnkgKyB3YS56ICsgd2EudyArXG4gICAgICAgICAgICAgIHdiLnggKyB3Yi55ICsgd2IueiArIHdiLnc7XG4gICAgICAgICAgIFxuICAgICAgICAgICBcbiAgICAgICAgb2NjID0gMS4wIC0gb2NjLzguMDtcbiAgICAgICAgb2NjID0gb2NjKm9jYztcbiAgICAgICAgb2NjID0gb2NjKm9jYztcbiAgICAgICAgb2NjICo9IGFtYjtcblxuICAgICAgICAvLyBsaWdodGluZ1xuICAgICAgICB2ZWMzIGxpbiA9IHZlYzMoMC4wKTtcbiAgICAgICAgbGluICs9IDIuNSpkaWYqdmVjMygxLjAwLDAuOTAsMC43MCkqKDAuNSswLjUqb2NjKTtcbiAgICAgICAgbGluICs9IDAuNSpiYWMqdmVjMygwLjE1LDAuMTAsMC4xMCkqb2NjO1xuICAgICAgICBsaW4gKz0gMi4wKnNreSp2ZWMzKDAuNDAsMC4zMCwwLjE1KSpvY2M7XG5cbiAgICAgICAgLy8gbGluZSBnbG93XHRcbiAgICAgICAgZmxvYXQgbGluZWdsb3cgPSAwLjA7XG4gICAgICAgIGxpbmVnbG93ICs9IHNtb290aHN0ZXAoIDAuNCwgMS4wLCAgICAgdXYueCApKigxLjAtdmEueCooMS4wLXZjLngpKTtcbiAgICAgICAgbGluZWdsb3cgKz0gc21vb3Roc3RlcCggMC40LCAxLjAsIDEuMC11di54ICkqKDEuMC12YS55KigxLjAtdmMueSkpO1xuICAgICAgICBsaW5lZ2xvdyArPSBzbW9vdGhzdGVwKCAwLjQsIDEuMCwgICAgIHV2LnkgKSooMS4wLXZhLnoqKDEuMC12Yy56KSk7XG4gICAgICAgIGxpbmVnbG93ICs9IHNtb290aHN0ZXAoIDAuNCwgMS4wLCAxLjAtdXYueSApKigxLjAtdmEudyooMS4wLXZjLncpKTtcbiAgICAgICAgbGluZWdsb3cgKz0gc21vb3Roc3RlcCggMC40LCAxLjAsICAgICAgdXYueSogICAgICB1di54ICkqKDEuMC12Yi54KigxLjAtdmQueCkpO1xuICAgICAgICBsaW5lZ2xvdyArPSBzbW9vdGhzdGVwKCAwLjQsIDEuMCwgICAgICB1di55KiAoMS4wLXV2LngpKSooMS4wLXZiLnkqKDEuMC12ZC55KSk7XG4gICAgICAgIGxpbmVnbG93ICs9IHNtb290aHN0ZXAoIDAuNCwgMS4wLCAoMS4wLXV2LnkpKigxLjAtdXYueCkpKigxLjAtdmIueiooMS4wLXZkLnopKTtcbiAgICAgICAgbGluZWdsb3cgKz0gc21vb3Roc3RlcCggMC40LCAxLjAsICgxLjAtdXYueSkqICAgICB1di54ICkqKDEuMC12Yi53KigxLjAtdmQudykpO1xuXHRcdFxuICAgICAgICB2ZWMzIGxpbkNvbCA9IDIuMCp2ZWMzKDUuMCwwLjYsMC4wKTtcbiAgICAgICAgbGluQ29sICo9ICgwLjUrMC41Km9jYykqMC41O1xuICAgICAgICBsaW4gKz0gbGluZWdsb3cqbGluQ29sO1xuXHRcdFxuICAgICAgICBjb2wgPSBjb2wqbGluO1xuICAgICAgICBjb2wgKz0gOC4wKmxpbkNvbCp2ZWMzKDEuMCwyLjAsMy4wKSooMS4wLXd3dyk7Ly8qKDAuNSsxLjAqc2hhKTtcbiAgICAgICAgY29sICs9IDAuMSpsaW5lZ2xvdypsaW5Db2w7XG4gICAgICAgIGNvbCAqPSBtaW4oMC4xLGV4cCggLTAuMDcqdCApKTtcblx0XG4gICAgICAgIC8vIGJsZW5kIHRvIGJsYWNrICYgd2hpdGVcdFx0XG4gICAgICAgIHZlYzMgY29sMiA9IHZlYzMoMS4zKSooMC41KzAuNSpub3IueSkqb2NjKmV4cCggLTAuMDQqdCApOztcbiAgICAgICAgZmxvYXQgbWkgPSBjb3MoLTAuNyswLjUqaVRpbWUpO1xuICAgICAgICBtaSA9IHNtb290aHN0ZXAoIDAuNzAsIDAuNzUsIG1pICk7XG4gICAgICAgIGNvbCA9IG1peCggY29sLCBjb2wyLCBtaSApO1xuXHR9XG5cblx0Ly8gZ2FtbWFcdFxuXHRjb2wgPSBwb3coIGNvbCwgdmVjMygwLjQ1KSApO1xuXG4gICAgcmV0dXJuIGNvbDtcbn1cblxudm9pZCBtYWluSW1hZ2UoIG91dCB2ZWM0IGZyYWdDb2xvciwgaW4gdmVjMiBmcmFnQ29vcmQgKVxue1xuICAgIC8vIGlucHV0c1x0XG4gICAgdmVjMiBwID0gKDIuMCpmcmFnQ29vcmQtaVJlc29sdXRpb24ueHkpL2lSZXNvbHV0aW9uLnk7XG4gICAgdmVjMiBtbyA9IGlNb3VzZS54eSAvIGlSZXNvbHV0aW9uLnh5O1xuICAgIGlmKCBpTW91c2Uuejw9MC4wMDAwMSApIG1vPXZlYzIoMC4wKTtcblx0ZmxvYXQgdGltZSA9IDIuMCppVGltZSArIDUwLjAqbW8ueDtcbiAgICBcbiAgICAvLyBjYW1lcmFcblx0ZmxvYXQgY3IgPSAwLjIqY29zKDAuMSppVGltZSk7XG5cdHZlYzMgcm8gPSBwYXRoKCB0aW1lKzAuMCwgMS4wICk7XG5cdHZlYzMgdGEgPSBwYXRoKCB0aW1lKzUuMCwgMS4wICkgLSB2ZWMzKDAuMCw2LjAsMC4wKTtcblx0Z3JvID0gcm87XG5cbiAgICBtYXQzIGNhbSA9IHNldENhbWVyYSggcm8sIHRhLCBjciApO1xuXHRcblx0Ly8gYnVpbGQgcmF5XG4gICAgZmxvYXQgcjIgPSBwLngqcC54KjAuMzIgKyBwLnkqcC55O1xuICAgIHAgKj0gKDcuMC1zcXJ0KDM3LjUtMTEuNSpyMikpLyhyMisxLjApO1xuICAgIHZlYzMgcmQgPSBub3JtYWxpemUoIGNhbSAqIHZlYzMocC54eSwtMi41KSApO1xuXG4gICAgdmVjMyBjb2wgPSByZW5kZXIoIHJvLCByZCApO1xuICAgIFxuXHQvLyB2aWduZXR0aW5nXHRcblx0dmVjMiBxID0gZnJhZ0Nvb3JkIC8gaVJlc29sdXRpb24ueHk7XG5cdGNvbCAqPSAwLjUgKyAwLjUqcG93KCAxNi4wKnEueCpxLnkqKDEuMC1xLngpKigxLjAtcS55KSwgMC4xICk7XG5cdFxuXHRmcmFnQ29sb3IgPSB2ZWM0KCBjb2wsIDEuMCApO1xufVxuXG52b2lkIG1haW5WUiggb3V0IHZlYzQgZnJhZ0NvbG9yLCBpbiB2ZWMyIGZyYWdDb29yZCwgaW4gdmVjMyBmcmFnUmF5T3JpLCBpbiB2ZWMzIGZyYWdSYXlEaXIgKVxue1xuXHRmbG9hdCB0aW1lID0gMS4wKmlUaW1lO1xuXG4gICAgZmxvYXQgY3IgPSAwLjA7XG5cdHZlYzMgcm8gPSBwYXRoKCB0aW1lKzAuMCwgMC4wICkgKyB2ZWMzKDAuMCwwLjcsMC4wKTtcblx0dmVjMyB0YSA9IHBhdGgoIHRpbWUrMi41LCAwLjAgKSArIHZlYzMoMC4wLDAuNywwLjApO1xuXG4gICAgbWF0MyBjYW0gPSBzZXRDYW1lcmEoIHJvLCB0YSwgY3IgKTtcblxuICAgIHZlYzMgY29sID0gcmVuZGVyKCBybyArIGNhbSpmcmFnUmF5T3JpLCBjYW0qZnJhZ1JheURpciApO1xuICAgIFxuICAgIGZyYWdDb2xvciA9IHZlYzQoIGNvbCwgMS4wICk7XG59XG5gOyAiXSwibmFtZXMiOlsidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/shaders/dirty-notch.ts\n"));

/***/ })

});