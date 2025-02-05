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

vec3 palette(float i) {
    int index = int(floor(i));
    if (index == 0) {
        return vec3(0.0, 0.0, 0.0);
    } else if (index == 1) {
        float avg = (1.0 + 3.0 + 31.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 2) {
        float avg = (1.0 + 3.0 + 53.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 3) {
        float avg = (28.0 + 2.0 + 78.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 4) {
        float avg = (80.0 + 2.0 + 110.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 5) {
        float avg = (143.0 + 3.0 + 133.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 6) {
        float avg = (181.0 + 3.0 + 103.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 7) {
        float avg = (229.0 + 3.0 + 46.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 8) {
        float avg = (252.0 + 73.0 + 31.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 9) {
        float avg = (253.0 + 173.0 + 81.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 10) {
        float avg = (254.0 + 244.0 + 139.0) / 3.0;
        return vec3(avg, avg, avg);
    } else if (index == 11) {
        float avg = (239.0 + 254.0 + 203.0) / 3.0;
        return vec3(avg, avg, avg);
    } else {
        float avg = (242.0 + 255.0 + 236.0) / 3.0;
        return vec3(avg, avg, avg);
    }
}
    
vec3 palette1(float i) {
    int index = int(floor(i));
    if (index == 0) {
        return vec3(0.0, 0.0, 0.0);
    } else if (index == 1) {
        return vec3(1.0, 3.0, 31.0);
    } else if (index == 2) {
        return vec3(1.0, 3.0, 53.0);
    } else if (index == 3) {
        return vec3(28.0, 2.0, 78.0);
    } else if (index == 4) {
        return vec3(80.0, 2.0, 110.0);
    } else if (index == 5) {
        return vec3(143.0, 3.0, 133.0);
    } else if (index == 6) {
        return vec3(181.0, 3.0, 103.0);
    } else if (index == 7) {
        return vec3(229.0, 3.0, 46.0);
    } else if (index == 8) {
        return vec3(252.0, 73.0, 31.0);
    } else if (index == 9) {
        return vec3(253.0, 173.0, 81.0);
    } else if (index == 10) {
        return vec3(254.0, 244.0, 139.0);
    } else if (index == 11) {
        return vec3(239.0, 254.0, 203.0);
    } else {
        return vec3(242.0, 255.0, 236.0);
    }
}

vec3 palette2(float i) {
    int index = int(floor(i));
    if (index == 0) {
        return vec3(0.0, 0.0, 0.0);
    } else if (index == 1) {
        return vec3(3.0, 31.0, 1.0);
    } else if (index == 2) {
        return vec3(3.0, 53.0, 1.0);
    } else if (index == 3) {
        return vec3(2.0, 78.0, 28.0);
    } else if (index == 4) {
        return vec3(2.0, 110.0, 80.0);
    } else if (index == 5) {
        return vec3(3.0, 133.0, 143.0);
    } else if (index == 6) {
        return vec3(3.0, 103.0, 181.0);
    } else if (index == 7) {
        return vec3(3.0, 46.0, 229.0);
    } else if (index == 8) {
        return vec3(73.0, 31.0, 252.0);
    } else if (index == 9) {
        return vec3(173.0, 81.0, 253.0);
    } else if (index == 10) {
        return vec3(244.0, 139.0, 254.0);
    } else if (index == 11) {
        return vec3(254.0, 203.0, 239.0);
    } else {
        return vec3(255.0, 236.0, 242.0);
    }
}

vec4 colour(float c) {
    c *= 12.0;
    float timeMod = mod(iTime,57.0);
    vec3 col1;
    vec3 col2;
    if (timeMod < 19.0) {
        col1 = palette(c) / 256.0;
        col2 = palette(c + 1.0) / 256.0;
    } else if (timeMod < 38.0) {
        col1 = palette1(c) / 256.0;
        col2 = palette1(c + 1.0) / 256.0;
    } else {
        col1 = palette2(c) / 256.0;
        col2 = palette2(c + 1.0) / 256.0;
    }
    return vec4(mix(col1, col2, c - floor(c)), 1.0);
}

float periodic(float x, float period, float dutycycle) {
    x /= period;
    x = abs(x - floor(x) - 0.5) - dutycycle * 0.5;
    return x * period;
}

float pcount(float x, float period) {
    return floor(x / period);
}

float distfunc(vec3 pos) {
    vec3 gridpos = pos - floor(pos) - 0.5;
    float r = length(pos.xy);
    float a = atan(pos.y, pos.x);
    a += iTime * 0.3 * sin(pcount(r, 3.0) + 1.0) * sin(pcount(pos.z, 1.0) * 13.73);
    return min(max(max(
        periodic(r, 3.0, 0.2),
        periodic(pos.z, 1.0, 0.7 + 0.3 * cos(iTime / 3.0))),
        periodic(a * r, 3.141592 * 2.0 / 6.0 * r, 0.7 + 0.3 * cos(iTime / 3.0))),
        0.25);
}

void mainVR(out vec4 fragColor, in vec2 fragCoord, in vec3 pos, in vec3 dir) {
    vec3 ray_dir = -dir;
    vec3 ray_pos = pos;

    float a = iTime * 0.165;
    ray_dir = ray_dir * mat3(
        cos(a), 0.0, sin(a),
        0.0, 1.0, 0.0,
        -sin(a), 0.0, cos(a)
    );

    float i = 192.0;
    for (int j = 0; j < 192; j++) {
        float dist = distfunc(ray_pos);
        ray_pos += dist * ray_dir;

        if (abs(dist) < 0.001) { 
            i = float(j); 
            break; 
        }
    }

    float c = i / 192.0;
    fragColor = colour(c);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 coords = (2.0 * fragCoord.xy - iResolution.xy) / max(iResolution.x, iResolution.y);

    vec3 ray_dir = normalize(vec3(coords, 1.0 + 0.0 * sqrt(coords.x * coords.x + coords.y * coords.y)));
    vec3 ray_pos = vec3(0.0, -1.0, iTime * 1.0);

    mainVR(fragColor, fragCoord, ray_pos, -ray_dir);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`; 