const canvas = document.querySelector('canvas');



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;





const c = canvas.getContext('2d');


let mouse = {
  x: undefined,
  y: undefined
}
//パラメーター化できそうなものはここに追加する！！
//色も追加したい
let speed = 10;
let maxRedius = 40;
let minRadius = 2;
let distance = 10;
let numberOfCircle = 300;
let expand = 30;
let contract = 2;
let colorArray = [
  '#00FF72',
  '#00E89F',
  '#00FFED',
  '#00C4E8',
  '#0092EB'
];


document.querySelector('.complete').addEventListener('click', function () {
  $('.modal-circle').fadeOut();
  numberOfCircle = parseInt($(".get-number").val());
  speed = parseInt($(".get-speed").val());
  distance = parseInt($(".get-distance").val());
  localStorage.setItem('number', numberOfCircle);
  localStorage.setItem('speed', speed);
  localStorage.setItem('distance', distance);
  let color1 = $(".get-color1").val();
  let color2 = $(".get-color2").val();
  let color3 = $(".get-color3").val();
  let color4 = $(".get-color4").val();
  let color5 = $(".get-color5").val();
  localStorage.setItem('color1', color1);
  localStorage.setItem('color2', color2);
  localStorage.setItem('color3', color3);
  localStorage.setItem('color4', color4);
  localStorage.setItem('color5', color5);
})

function getLocalstrageParameters() {
  numberOfCircle = localStorage.getItem('number') || 300;
  speed = localStorage.getItem('speed') || 10;
  distance = localStorage.getItem('distance') || 0.8;
  color1 = localStorage.getItem('color1') || '0092EB';
  color2 = localStorage.getItem('color2') || '00C4E8';
  color3 = localStorage.getItem('color3') || '00FFED';
  color4 = localStorage.getItem('color4') || '00E89F';
  color5 = localStorage.getItem('color5') || '00FF72';

  colorArray = [
      "#" + color1,
      "#" + color2,
      "#" + color3,
      "#" + color4,
      "#" + color5
    ];
}

getLocalstrageParameters();


window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
})

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill(); // color
  }

  this.update = function () {
    //ウインドの端に当たったら反転 玉の座標は中心なので半径を加味する
    if (this.x + this.radius > innerWidth || this.x - radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    // condition = マウスの座標から50px以内だと1pxずつ大きくなる
    if (mouse.x - this.x < distance && mouse.x - this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
      if (this.radius < maxRedius) //40pxまで大きくなる
        this.radius += expand;
    } else if (this.radius > minRadius) { // 2pxまで小さくなる
      this.radius -= contract;
    }


    this.draw();
  }
}

function effectDistance() {
  // interactivity
  // condition = マウスの座標から50px以内だと1pxずつ大きくなる
  if (mouse.x - this.x < distance && mouse.x - this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
    if (this.radius < maxRedius) //40pxまで大きくなる
      this.radius += expand;
  } else if (this.radius > minRadius) { // 2pxまで小さくなる
    this.radius -= contract;
  }
}




let circleArray = [];

for (let i = 0; i < numberOfCircle; i++) {
  let radius = Math.random() * 3; // 円の大きさ
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius + 2) + radius;
  let dx = (Math.random() - 0.5) * speed; // dx = たてのspeed
  let dy = (Math.random() - 0.5) * speed; // dx = よこのspeed
  circleArray.push(new Circle(x, y, dx, dy, radius));
}
console.log(circleArray);


//ひたすら動かせる
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
//呼び出し
animate();

document.querySelector('.modal-open').addEventListener('click', function () {
  $('.modal-circle').fadeIn();
})

window.addEventListener('click', function () {
  getLocalstrageParameters();
  for (let i = 0; i < numberOfCircle; i++) {
    speed1 = Math.random() * 15 + 15;
    speed2 = Math.random() * 15 + 15;
    let radius = Math.random() * 2; // 円の大きさ
    let x = mouse.x
    let y = mouse.y
    let dx = (Math.random() - 0.5) * speed1; // dx = たてのspeed
    let dy = (Math.random() - 0.5) * speed2; // dx = よこのspeed
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
});


//エンターで削除
// window.addEventListener("keyup", function (event) {
//   if(window.event.keyCode==13) {
//     for (let i = 0; i < numberOfCircle; i++) {
//       circleArray.splice((Math.random() * circleArray.length), 1);
//       let radius = Math.random() * 50 + 1; // 円の大きさ
//   }
//   console.log(1);
//   }
// });
window.addEventListener('keydown',this.check,false);
function check(e) {
  let code = e.keyCode;
  if (code == 13) {
    for (let i = 0; i < numberOfCircle; i++) {
            circleArray.splice((Math.random() * circleArray.length), 1);
            let radius = Math.random() * 50 + 1; // 円の大きさ
        }
        console.log(1);
  }
}


// function animate() {

//   requestAnimationFrame(animate);
//   c.clearRect(0,0, innerWidth, innerHeight);



//   x = Math.random()* window.innerWidth
//   y = Math.random()* window.innerHeight
//   num = Math.random()*50
//   c.beginPath();
//   c.arc(x,y,num,0,Math.PI * 2, false);
//   c.strokeStyle = 'blue';
//   c.stroke();
// ;}

// animate();
