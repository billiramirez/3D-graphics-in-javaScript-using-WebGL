var gl;
var shaderProgram;
var vertices;

initGL();
createShaders();
createVertices();
draw();

function initGL() {
  const canvas = document.getElementById("canvas");
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}
function createShaders() {
  const vs = `
  attribute vec4 coords;
  attribute float pointSize;

    void main (void) {
      gl_Position = coords;
      gl_PointSize = pointSize;
    }
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vs);
  gl.compileShader(vertexShader);

  const fs = `
    precision mediump float;
    uniform vec4 color;

    void main(void) {
      gl_FragColor = color;
    }
  `;

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fs);
  gl.compileShader(fragmentShader);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices() {
  vertices = [-0.9, -0.9, 0.0, 0.9, -0.9, 0.0, 0.0, 0.9, 0.0];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const coords = gl.getAttribLocation(shaderProgram, "coords");
  // gl.vertexAttrib3f(coords, 0.5, 0.5, 0);
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 20);

  const color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 1, 1, 0, 1);
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 3);
}
