precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 center;
uniform vec2 resolution;
uniform float strength;


void main() {

  vec4 sum = vec4( 0.0 );

  vec2 toCenter = center - vTextureCoord * resolution;
  vec2 inc = toCenter * strength / resolution;

  inc = strength * (center / resolution - vTextureCoord);
  
  sum += texture2D( uSampler, ( vTextureCoord - inc * 4.0 ) ) * 0.051;
  sum += texture2D( uSampler, ( vTextureCoord - inc * 3.0 ) ) * 0.0918;
  sum += texture2D( uSampler, ( vTextureCoord - inc * 2.0 ) ) * 0.12245;
  sum += texture2D( uSampler, ( vTextureCoord - inc * 1.0 ) ) * 0.1531;
  sum += texture2D( uSampler, ( vTextureCoord + inc * 0.0 ) ) * 0.1633;
  sum += texture2D( uSampler, ( vTextureCoord + inc * 1.0 ) ) * 0.1531;
  sum += texture2D( uSampler, ( vTextureCoord + inc * 2.0 ) ) * 0.12245;
  sum += texture2D( uSampler, ( vTextureCoord + inc * 3.0 ) ) * 0.0918;
  sum += texture2D( uSampler, ( vTextureCoord + inc * 4.0 ) ) * 0.051;

  gl_FragColor = sum;

}