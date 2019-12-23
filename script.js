const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let myColor = 'black';
const colorButton = document.getElementById('colorselect');
const previousColor = document.getElementById('previouscolor');
const bucket = document.getElementById('bucket');
const pencil = document.getElementById('pencil');
const redcolor = document.getElementById('redcolor');
const bluecolor = document.getElementById('bluecolor');
const clear = document.getElementById('clean');
const colorArray = [];


function saveToLocal() {
  const dataURL = localStorage.getItem(canvas);
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
}

if (performance.navigation.type === 1) {
  saveToLocal();
}

clear.addEventListener('click', () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 512, 512);
});

colorButton.addEventListener('input', () => {
  myColor = colorButton.value;
  colorArray.push(myColor);
});

redcolor.addEventListener('click', () => {
  myColor = 'red';
  colorArray.push(myColor);
});

bluecolor.addEventListener('click', () => {
  myColor = 'blue';
  colorArray.push(myColor);
});

pencil.addEventListener('click', () => {
  pencil.classList.add('active');
});

previousColor.addEventListener('click', () => {
  myColor = colorArray[colorArray.length - 2];
});

bucket.addEventListener('click', () => {
  ctx.fillStyle = myColor;
  ctx.fillRect(0, 0, 512, 512);
});


let isDrawing = false;
let lastX = 0;
let lastY = 0;
let scale = 32;

canvas.width = scale;
canvas.height = scale;

scale = 512 / scale;

function draw(event) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.fillStyle = myColor;
  ctx.fillRect(Math.floor(lastX / scale), Math.floor(lastY / scale), 1, 1);
  lastX = event.offsetX;
  lastY = event.offsetY;

  localStorage.setItem(canvas, canvas.toDataURL());
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});
// eslint-disable-next-line no-return-assign
canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mouseout', () => isDrawing = false);
