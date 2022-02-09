const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

let pixel = ''; 
let gridsize = 64;

const drawGrid = (screenSize) => {
  for(i = 0; i < screenSize ** 2; i++) {
    pixel = document.createElement('div')
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = 'white';
    screen.appendChild(pixel);
  }
  screen.style.gridTemplateColumns =  `repeat(${screenSize}, auto)`;
  screen.style.gridTemplateRows =  `repeat(${screenSize}, auto)`;
}

drawGrid(gridsize)

const clear = (request) => {
  if(request === 'resize'){
    gridsize = prompt('please enter a new grid size of not more than 100', 50);
    if(gridsize > 100 || gridsize === null){
    gridsize = 100;
  }
  }
  screen.innerHTML = '';
  drawGrid(gridsize);
  active();
}

const active = () => {
  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach(pxl => { 
    pxl.addEventListener('mouseover', (e) => {
      let crntClr = getComputedStyle(pxl, null).getPropertyValue('background-color');
      switch(currentMode){
        case 'black':
          e.target.style.backgroundColor = 'rgba(0,0,0)';
          break;
        case 'randomColors':
          e.target.style.backgroundColor = randomColor();
          break;
        case 'shading':
          e.target.style.backgroundColor = shading(crntClr);
      }
    });
  });
}
active();

let currentMode = 'black';
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.id === 'resize' || button.id === 'clear'){
      clear(button.id);
    }
    else{
      currentMode = button.id;
      clear(button.id);
    }
  });
});

let randomColor