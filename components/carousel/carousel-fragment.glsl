varying vec2 vUv;
uniform sampler2D currentImage;
uniform sampler2D nextImage;
uniform float dispFactor;
uniform float direction;
uniform bool reduceMotion;
uniform bool fadeBottom;
uniform vec4 themeBackground;
uniform float initialFade;

void main() {
  vec4 _currentImage;
  vec4 _nextImage;
  
  if (reduceMotion) {
    _currentImage = texture2D(currentImage, vUv);
    _nextImage = texture2D(nextImage, vUv);
  } else {
    vec2 uv = vUv;
    vec4 orig1 = texture2D(currentImage, uv);
    vec4 orig2 = texture2D(nextImage, uv);
    
    vec2 distortedPosition = vec2(
      uv.x + direction * (dispFactor * (orig2.r * 0.6)),
      uv.y + direction * (dispFactor * (orig2 * 0.6))
    );
    
    vec2 distortedPosition2 = vec2(
      uv.x - direction * ((1.0 - dispFactor) * (orig1.r * 0.6)),
      uv.y - direction * ((1.0 - dispFactor) * (orig1 * 0.6))
    );
    
    _currentImage = texture2D(currentImage, distortedPosition);
    _nextImage = texture2D(nextImage, distortedPosition2);
  }
  
  vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
  if (fadeBottom) {
    finalTexture.rgb = mix(themeBackground.rgb, finalTexture.rgb, vUv.y);
  }
  finalTexture.a *= initialFade;
  gl_FragColor = finalTexture;
}
