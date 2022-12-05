const loadPhone = async(search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const resposnse = await fetch(url);
    const data = await resposnse.json();
    displayData(data.data);
}
const displayData = (allData) => {
    allData = allData.slice(0, 9);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const notFoundMsg = document.getElementById('not-found-msg');
    if(allData.length == 0){
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
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
        console.log(data);
    })

    toggoleSpenner(false);
}
const search = () =>{
    toggoleSpenner(true);
    const searchBtn = document.getElementById('search-btn');
    const searchFild = document.getElementById('search-fild');
    const searchResult = searchFild.value;
    searchFild.value = '';
    loadPhone(searchResult);
}
const toggoleSpenner = (isLoading) => {
    const loaderElement = document.getElementById('loader');
    if(isLoading === true){
        loaderElement.classList.remove('d-none');
    }else{
        loaderElement.classList.add('d-none');
    }
}