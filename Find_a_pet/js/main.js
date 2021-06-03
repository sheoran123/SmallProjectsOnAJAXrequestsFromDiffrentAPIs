import fetchJsonp from 'fetch-jsonp';
import {isValidZip} from './validate';


const petForm=document.querySelector('#pet-form');

petForm.addEventListener('submit',fetchAnimals);

// Fetch animals from api


function fetchAnimals(e){
    e.preventDefault();

    // Get user input

    const animal =document.querySelector('#animal').value;
    const zip =document.querySelector('#zip').value;

    // Validate zip
    if(!isValidZip(zip)){
        alert('Please enter a valid zip');
        return ;
    }


    // Fetch Pets
    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=ycx1kuvwTPm6tyJP3TPwtBTkRWRuOTc9EPEsKFAIZdErpxJycQ&animal=${animal}&location=${zip}&callback=callback`,{jsonpCallbackFunction:'callback'})
    .then(res=>res.json())
    .then(data=>showAnimals(data.petfinder.pets.pet))
    .catch(err=>console.log(err));
}


// Jsonp callback

function callback(data){
    console.log(data);
}

// Show listing of pets
function showAnimals(pets){
    const results=document.querySelector('#results');

    // Clear first

    results.innerHTML='';
    // Loop through pets
    pets.forEach((pet)=>{
        const div=document.createElement('div');
        div.classList.add('card','card-body','mb-3');
        div.innerHTML=`
        <div class="row">
            <div class="col-sm-6">
                <h4>${pet.name.$t} (${pet.age.$t})</h4>
                <p class="text-secondary">${pet.breeds.breed.$t}</p>
            </div>
            <div class="col-sm-6>

            </div>
        </div>
        `;

        results.appendChild(div);
    });
}