document.addEventListener('DOMContentLoaded', function(){
  fetchImg();
  fetchBreeds();  
})

function fetchImg(){
  fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(response => response.json())
  .then(json => addImg(json));
}


function addImg(dataUrl){
  dataUrl.message.forEach(imgUrl =>{
  let div = document.getElementById('dog-image-container');
  let img = document.createElement('img');
  img.src=imgUrl;
  div.appendChild(img);
  })    
}

let arrBreeds = [];

function fetchBreeds(){
  fetch("https://dog.ceo/api/breeds/list/all")
  .then(response => response.json())
  .then(json => {
    arrBreeds=Object.keys(json.message);
    BreedListener();
    updateBreed(arrBreeds);
  });
  
}

function BreedListener() {
  let Dropdown = document.getElementById('breed-dropdown');
  Dropdown.addEventListener('change', function (e) {
    breedLetter(e.target.value);
  });
}

function updateBreed(breeds) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(element => addBreeds(element))
}

function addBreeds(data){  
  let ul = document.getElementById('dog-breeds');
  let li = document.createElement('li');
  li.innerHTML = data;
  ul.appendChild(li);
  li.addEventListener('click', function(e){
  e.target.style.color = 'lightgreen';})
}

function breedLetter(letter) {
  updateBreed(arrBreeds.filter(b => b.startsWith(letter)));
}

function removeChildren(ulElement) {
  let child = ulElement.lastElementChild;
  while (child) {
    ulElement.removeChild(child);
    child = ulElement.lastElementChild;
  }
}


