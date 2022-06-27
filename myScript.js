const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function animation(){
  requestAnimationFrame(animation);
  renderer.render(scene,camera);
}

//set up camera and scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.5,1000);
camera.position.z = 10;
camera.position.y = 10;
camera.position.x = 10;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//allows us to rotate around the cube
controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.target.set( -0.1, -0.1, -0.1 );
controls.enableZoom = false;

//cube
var geometry = new THREE.BoxGeometry(1,1,1);
var cubeMaterials = [
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('img/green.png'),side: THREE.DoubleSide}),//right side
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('img/blue.png'),side: THREE.DoubleSide}),//left side
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('img/yellow.jpg'),side: THREE.DoubleSide}),//head side
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('img/white.jpg'),side: THREE.DoubleSide}),//bottom side
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('img/red.png'),side: THREE.DoubleSide}),//front side
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('img/orange.webp'),side: THREE.DoubleSide})//back side
];
var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube_array=[];

//function to create the cubies
function cubes(){
  cube_array=[];
  var x =0;

  //these loops are what creates each individual cubie
  const bottom = new THREE.Group();
  // const right = new THREE.Group();
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.x = x;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x +=1.1;
  }
  var z = 1.1;
  x = 0;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.z = z;
      cube.position.x = x;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x+=1.1;
  }
  z = 2.2;
  x = 0;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.z = z;
      cube.position.x = x;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x+=1.1;
  }

  const middle = new THREE.Group();
  x = 0;
  y = 1.1;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.x = x;
      cube.position.y = y;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x +=1.1;
  }
  z = 1.1;
  x = 0;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.z = z;
      cube.position.x = x;
      cube.position.y = y;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x+=1.1;
  }
  z = 2.2;
  x = 0;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.z = z;
      cube.position.x = x;
      cube.position.y =y;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x+=1.1;
  }

  const head = new THREE.Group();
  y = 2.2;
  x = 0;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.x = x;
      cube.position.y = y;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x +=1.1;
  }
  z = 1.1;
  x =0;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.z = z;
      cube.position.x = x;
      cube.position.y = y;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x+=1.1;

  }
  z = 2.2;
  x =0;
  for(var i=0;i<3;i++){
      var cube = new THREE.Mesh(geometry,material);
      cube_array.push(cube);
      cube.position.z = z;
      cube.position.x = x;
      cube.position.y =y;
      cube.pos = cube.position.clone();
      scene.add(cube);
      x+=1.1;
}

//this helps the rotations however it causes interesting moves
//leaving it uncommented shows their real location
cube_array.forEach(function(cube) {
    cube.position.x -=1.1;
    cube.position.y -=1.1;
    cube.position.z -=1.1;
  });
}
//helper function for set
function nearlyEqual(a, b, d) {
 d = d || .0001;
 return Math.abs(a - b) <= d;
}

// var axesHelper = new THREE.AxesHelper( 10 );
// scene.add( axesHelper );

//chooses which axis to rotate
let caxis;
function set(axis){
var c = new THREE.Vector3();
active=[];
cube_array.forEach(function(cube) {
      if(nearlyEqual(cube.getWorldPosition()[caxis],axis)){
        active.push(cube);
      }
    });
}
var counting=false;

//rotates the x,y,z axis respectfully
var pivot = new THREE.Object3D();
var active = [];
async function turnz(cube,z,pos){
caxis= 'z';
set(z);
pivot.rotation.set(0,0,0);
pivot.updateMatrixWorld();
scene.attach(pivot);
for(var i in active){
  pivot.attach(active[i]);
}
var p = pivot.rotation.z;
if(Math.sign(pos) == 1){
  while(pivot.rotation.z<(p+Math.PI/pos)){
    pivot.rotation.z+=.01;
    await sleep(.05);
  }
}
else if(Math.sign(pos) == -1){
  while(pivot.rotation.z>(p+Math.PI/pos)){
    pivot.rotation.z-=.01;
    await sleep(.05);
  }
}
  pivot.rotation.z=Math.PI/pos;

pivot.updateMatrixWorld();
scene.remove(pivot);
for(var i in active){
  active[i].updateMatrixWorld();
  active[i].pos=active[i].position.clone();
  active[i].pos.applyMatrix4(pivot.matrixWorld);
  scene.attach(active[i]);
}
active=[];
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

async function turny(cube,y,pos){
caxis= 'y';
set(y);
pivot.rotation.set(0,0,0);
pivot.updateMatrixWorld();
scene.attach(pivot);
for(var i in active){
  pivot.add(active[i]);
}
var p = pivot.rotation.y;
if(Math.sign(pos) == 1){
  while(pivot.rotation.y<(p+Math.PI/pos)){
    pivot.rotation.y+=.01;
    await sleep(.05);
  }
}
else if(Math.sign(pos) == -1){
  while(pivot.rotation.y>(p+Math.PI/pos)){
    pivot.rotation.y-=.01;
    await sleep(.05);
  }
}
pivot.rotation.y=Math.PI/pos;
pivot.updateMatrixWorld();
scene.remove(pivot);
for(var i in active){
  active[i].updateMatrixWorld();
  active[i].pos=active[i].position.clone();
  active[i].pos.applyMatrix4(pivot.matrixWorld);
  scene.attach(active[i]);
}

active=[];
}

async function turnx(cube,x,pos){
caxis= 'x';
set(x);
pivot.rotation.set(0,0,0);
pivot.updateMatrixWorld();
scene.add(pivot);
for(var i in active){
  pivot.attach(active[i]);
}
var p = pivot.rotation.x;
if(Math.sign(pos) == 1){
  while(pivot.rotation.x<(p+Math.PI/pos)){
    pivot.rotation.x+=.01;
    await sleep(.05);
  }
}
else if(Math.sign(pos) == -1){
  while(pivot.rotation.x>(p+Math.PI/pos)){
    pivot.rotation.x-=.01;
    await sleep(.05);
  }
}
pivot.rotation.x=Math.PI/pos;
pivot.updateMatrixWorld();
scene.remove(pivot);
for(var i in active){
  active[i].updateMatrixWorld();
  active[i].pos=active[i].position.clone();
  active[i].pos.applyMatrix4(pivot.matrixWorld);
  scene.attach(active[i]);
}
active=[];
}

function shuffle(array) {
var currentIndex = array.length, temporaryValue, randomIndex;
while (0 !== currentIndex) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
}

return array;
}

async function rando(){
var arr = [0,1.1,-1.1];
arr=shuffle(arr);
var dir = [-2,2];
dir=shuffle(dir);
for(var i=0;i<10;i++){
  if(i%3==0){
    turnx(cube_array,arr[0],dir[1]);
    await sleep(900);
  }else if(i%3==1){
    turny(cube_array,arr[1],dir[0]);
    await sleep(900);
  }else if(i%3==2){
    turnz(cube_array,arr[2],dir[1]);
    await sleep(900);
  }
}
}



function reset(){
for(i in cube_array){
  scene.remove(cube_array[i]);
}
cubes();
clearInterval(g);
document.getElementById("seconds").innerText = "00";
document.getElementById("minutes").innerText = "00";
}





function disableCameraControl() {
 controls.enabled = false;

}

function enableCameraControl() {
   controls.enabled= true;
 }

var intersects;

function onMouseMove( event ){
mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
raycaster.setFromCamera( mouse, camera );
intersects = raycaster.intersectObjects( scene.children );
if(intersects.length > 0){
  disableCameraControl();
  return true;
}else {
  enableCameraControl();
  return false;
}

}

function onMouseDown( event ){
if(onMouseMove( event )==true){
  console.log(intersects[0].object.getWorldPosition());

}
}

window.addEventListener('mousemove',onMouseMove,false);
window.addEventListener('pointerdown',onMouseDown,false);

//moves via 1,2,3 keys right now will implement an intuative click thing
document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {

var keyCode = event.which;
if(keyCode==49){
caxis= 'y';
turny(cube_array,-1.1);
}
if(keyCode==50){
  caxis= 'x';
  turnx(cube_array,-1.1);
}
  if(keyCode==51){
    caxis= 'z';
    turnz(cube_array,1.1);
}
};


function counter(){
if(counting==false){
let s = document.getElementById("seconds").innerText;
let m =  document.getElementById("minutes").innerText;
window.g=setInterval(function (){
  document.getElementById("seconds").innerText = s.toString().padStart(2,'0');
  document.getElementById("minutes").innerText = m.toString().padStart(2,'0');
  if (s===59){
    m++;
    s=-1;
  }
  s++;
}, 1000);
}
}
function stop(){
clearInterval(g);
alert("Hey good job you finished with a time of "+document.getElementById("minutes").innerText+":"+document.getElementById("seconds").innerText);
}

cubes();

animation();
