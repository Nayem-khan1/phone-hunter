const loadPhone = async(search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const resposnse = await fetch(url);
    const data = await resposnse.json();
    displayData(data.data, dataLimit);
}
const displayData = (allData, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //show all
    const showAll = document.getElementById('show-all');
    
    if(dataLimit && allData.length > 9){
        allData = allData.slice(0, 9);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    
    //display not found
    const notFoundMsg = document.getElementById('not-found-msg');
    if(allData.length === 0){
        notFoundMsg.classList.remove('d-none');
    }
    else{
        notFoundMsg.classList.add('d-none');
    }
    allData.forEach(data => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="phoneDetails('${data.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    })

    toggoleSpenner(false);
}
const search = (dataLimit) =>{
    toggoleSpenner(true);
    const searchFild = document.getElementById('search-fild');
    const searchResult = searchFild.value;
    loadPhone(searchResult, dataLimit);
} 
document.getElementById('search-btn').addEventListener('click', function(){
    search(10);
})
document.getElementById('search-fild').addEventListener('keypress', function(event){
    if(event.key == 'Enter'){
        search(10);
    }
})
const toggoleSpenner = (isLoading) => {
    const loaderElement = document.getElementById('loader');
    if(isLoading){
        loaderElement.classList.remove('d-none');
    }else{
        loaderElement.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    search();
})

const phoneDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
const displayPhoneDetails = data => {
    const phoneName = document.getElementById('phoneDetailModalLabel');
    const modalDiv = document.getElementById('modal-div');
    modalDiv.innerHTML = `
        <p>Release Date: ${data.releaseDate ? data.releaseDate : 'No Release Date Found'}</p>
        <p>Chip Set: ${data.mainFeatures.chipSet}</p>
        <p>Display Size: ${data.mainFeatures ? data.mainFeatures.displaySize : 'Not found'}</p>
        <p>Memory: ${data.mainFeatures.memory}</p>

    `
    phoneName.innerText = `${data.name}`;
    console.log(data);
}