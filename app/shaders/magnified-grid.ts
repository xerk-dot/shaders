export const vertexShader = `#version 300 es
in vec4 position;
void main() {
  gl_Position = position;
}
`;

export const fragmentShader = `#version 300 es
precision mediump float;

// Input vertex attribute
in vec4 position;

uniform vec2 iResolution; // Resolution of the canvas
uniform float iTime;      // Time variable
uniform vec2 iMouse;      // Mouse coordinates
out vec4 fragColor;      // Output color


// Hash function for random values
float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

// One-dimensional noise function
float noise(float x) {
    return hash(x);
}

// Two-dimensional noise function
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i.x + i.y * 57.0);
    float b = hash(i.x + 1.0 + (i.y * 57.0));
    float c = hash(i.x + (i.y + 1.0) * 57.0);
    float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);
    
    // Smooth interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec2 a(float x, float y, float squareSize) {
/*      if (mod(iTime, 0.005) < 0.0025) { // Frequent changes
        float k = x - squareSize * noise(iTime);
        float e = y - squareSize * noise(vec2(iTime, 9.0));
        float d = exp(length(vec2(k, e)) / 8.0 - 3.0 * noise(vec2(floor(x / 19.0), floor(y / 19.0))));
        return vec2(x + k / d, y + e / d);
    }  */
    return vec2(x, y);
}

// Function to calculate distance from a point to a line segment
float distanceToTriangleEdge(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    vec2 ap = p - a;
    float t = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
    vec2 closestPoint = a + t * ab;
    return length(p - closestPoint);
}

// Helper function to define triangle vertices
vec2[3] defineTriangleVertices(vec2 squarePos, float offsetX, float offsetY, float triangleSize) {
    vec2 vertices[3]; // Array to hold vertices for a single triangle
    vertices[0] = squarePos + vec2(offsetX, offsetY); // Lower-left corner
    vertices[1] = squarePos + vec2(offsetX + triangleSize, offsetY); // Lower-right corner
    vertices[2] = squarePos + vec2(offsetX, offsetY + triangleSize); // Upper-left corner
    return vertices;
}

// Helper function to check if a fragment is inside a triangle and set the color
void checkTriangleColor(vec2 fragCoord, vec2 vertices[3]) {
    float area = 0.5 * (-vertices[1].y * vertices[2].x + vertices[0].y * (-vertices[1].x + vertices[2].x) + vertices[0].x * (vertices[1].y - vertices[2].y) + vertices[1].x * vertices[2].y);
    
    if (area == 0.0) return; // Early exit for degenerate triangles

    float s = 1.0 / (2.0 * area) * (vertices[0].y * vertices[2].x - vertices[0].x * vertices[2].y + (vertices[2].y - vertices[0].y) * fragCoord.x + (vertices[0].x - vertices[2].x) * fragCoord.y);
    float t = 1.0 / (2.0 * area) * (vertices[0].x * vertices[1].y - vertices[0].y * vertices[1].x + (vertices[1].y - vertices[0].y) * fragCoord.x + (vertices[1].x - vertices[0].x) * fragCoord.y);

    // If inside triangle, set color
    if (s >= 0.0 && t >= 0.0 && (s + t) <= 1.0) {
        fragColor = vec4(1.0, 1.0, 1.0, 1.0); // White fill
        
        // Draw triangle border with a thinner border
        float borderThickness = 1.0; // Adjust thickness as needed
        if (distanceToTriangleEdge(fragCoord, vertices[0], vertices[1]) < borderThickness || 
            distanceToTriangleEdge(fragCoord, vertices[1], vertices[2]) < borderThickness || 
            distanceToTriangleEdge(fragCoord, vertices[2], vertices[0]) < borderThickness) {
            fragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black border
        }
    }
}

void drawTriangles(vec2 squarePos, float squareSize, int numTrianglesPerSide) {
    float triangleSize = squareSize / float(numTrianglesPerSide);
    for (int i = 0; i < numTrianglesPerSide; i++) {
        for (int j = 0; j < numTrianglesPerSide; j++) {
            float offsetX = float(j) * triangleSize;
            float offsetY = float(i) * triangleSize;
            vec2 vertices[3] = defineTriangleVertices(squarePos, offsetX, offsetY, triangleSize); 
            vec2 newCoords[3];
            for (int k = 0; k < 3; k++) {
                newCoords[k] = a(vertices[k].x, vertices[k].y, squareSize);
            }
            checkTriangleColor(gl_FragCoord.xy, newCoords);

        }
    }
}

void main() {
    // Number of triangles per side (adjust this variable to change the grid size)
    int numTrianglesPerSide = 50; // Change this value for nxn triangles

    // Define square dimensions
    float squareSize = 0.7 * min(iResolution.x, iResolution.y);
    vec2 squarePos = (iResolution.xy - vec2(squareSize)) / 2.0;

    // Set default color to white (for the background)
    fragColor = vec4(1.0, 1.0, 1.0, 1.0); // White fill

    // Draw the border of the square
/*  if ((gl_FragCoord.x < squarePos.x + 1.0 || gl_FragCoord.x > squarePos.x + squareSize - 1.0 ||
         gl_FragCoord.y < squarePos.y + 1.0 || gl_FragCoord.y > squarePos.y + squareSize - 1.0) &&
        (gl_FragCoord.x >= squarePos.x && gl_FragCoord.x <= squarePos.x + squareSize &&
         gl_FragCoord.y >= squarePos.y && gl_FragCoord.y <= squarePos.y + squareSize)) {
        fragColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue border
    } */

    drawTriangles(squarePos, squareSize, numTrianglesPerSide);
}






`;

/***
 * 
function a(x, y) {
    // Calculate noise-based offsets
    let k = x - 400 * noise(t); // Offset in x direction
    let e = y - 400 * noise(t, 9); // Offset in y direction

    // Calculate distance based on noise
    let d = exp(mag(k, e) / 20 - 3 * noise(floor(x / 19), floor(y / 19))); 

    // Return new coordinates adjusted by the calculated offsets and distance
    return [x + k / d, y + e / d];
}
s = 4,
t = 0,
draw = $ => { t ||
    createCanvas(400, 400);
    noFill(t += .01);
    background(248);
    for (let y = 100; y < 300; y += s) {
        for (let x = 100; x < 300; x += s) {
            // Calculate the three vertices of the triangle
            const vertex1 = a(x, y);           // First vertex
            const vertex2 = a(x, y + s);       // Second vertex
            const vertex3 = a(x + s, y);       // Third vertex

            // Flatten the vertices array and draw the triangle
            triangle(vertex1[0], vertex1[1], vertex2[0], vertex2[1], vertex3[0], vertex3[1]);
        }
    }
}
 * 
 */