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

// Simple noise function for float input
float noise(float x) {
    return fract(sin(x * 12.9898) * 43758.5453);
}

// Simple noise function for vec2 input
float noise(vec2 p) {
    return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

// Function a(x, y) implementation
vec2 a(float x, float y) {
    // Calculate noise-based offsets
    float k = x - 400.0 * noise(iTime); // Offset in x direction
    float e = y - 400.0 * noise(vec2(iTime, 9.0)); // Offset in y direction

    // Calculate distance based on noise
    float d = exp(length(vec2(k, e)) / 20.0 - 3.0 * noise(vec2(floor(x / 19.0), floor(y / 19.0))));

    // Return new coordinates adjusted by the calculated offsets and distance
    return vec2(x + k / d, y + e / d);
}

// Function to calculate distance from a point to a line segment
float distanceToTriangleEdge(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    vec2 ap = p - a;
    float t = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
    vec2 closestPoint = a + t * ab;
    return length(p - closestPoint);
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
    if ((gl_FragCoord.x < squarePos.x + 1.0 || gl_FragCoord.x > squarePos.x + squareSize - 1.0 ||
         gl_FragCoord.y < squarePos.y + 1.0 || gl_FragCoord.y > squarePos.y + squareSize - 1.0) &&
        (gl_FragCoord.x >= squarePos.x && gl_FragCoord.x <= squarePos.x + squareSize &&
         gl_FragCoord.y >= squarePos.y && gl_FragCoord.y <= squarePos.y + squareSize)) {
        fragColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue border
    }

    // Define triangle vertices for each position in a grid
    vec2 vertices[3]; // Array to hold vertices for a single triangle
    for (int i = 0; i < numTrianglesPerSide; i++) { // Loop for rows
        for (int j = 0; j < numTrianglesPerSide; j++) { // Loop for columns
            // Calculate the position for the current triangle
            float offsetX = float(j) * (squareSize / float(numTrianglesPerSide)); // X offset for columns
            float offsetY = float(i) * (squareSize / float(numTrianglesPerSide)); // Y offset for rows

            // Define triangle vertices for the current position
            vertices[0] = squarePos + vec2(offsetX, offsetY); // Lower-left corner
            vertices[1] = squarePos + vec2(offsetX + (squareSize / float(numTrianglesPerSide)), offsetY); // Lower-right corner
            vertices[2] = squarePos + vec2(offsetX, offsetY + (squareSize / float(numTrianglesPerSide))); // Upper-left corner

            // Check if the current fragment is inside the triangle
            float area = 0.5 * (-vertices[1].y * vertices[2].x + vertices[0].y * (-vertices[1].x + vertices[2].x) + vertices[0].x * (vertices[1].y - vertices[2].y) + vertices[1].x * vertices[2].y);
            float s = 1.0 / (2.0 * area) * (vertices[0].y * vertices[2].x - vertices[0].x * vertices[2].y + (vertices[2].y - vertices[0].y) * gl_FragCoord.x + (vertices[0].x - vertices[2].x) * gl_FragCoord.y);
            float t = 1.0 / (2.0 * area) * (vertices[0].x * vertices[1].y - vertices[0].y * vertices[1].x + (vertices[1].y - vertices[0].y) * gl_FragCoord.x + (vertices[1].x - vertices[0].x) * gl_FragCoord.y);

            // If inside triangle, set color
            if (s >= 0.0 && t >= 0.0 && (s + t) <= 1.0) {
                fragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green fill for triangle
                
                // Draw triangle border with a thicker border
                float borderThickness = 3.0; // Adjust thickness as needed
                if (distanceToTriangleEdge(gl_FragCoord.xy, vertices[0], vertices[1]) < borderThickness || 
                    distanceToTriangleEdge(gl_FragCoord.xy, vertices[1], vertices[2]) < borderThickness || 
                    distanceToTriangleEdge(gl_FragCoord.xy, vertices[2], vertices[0]) < borderThickness) {
                    fragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red border
                }
                break; // Exit loop if a triangle is filled
            }
        }
    }
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