const loadPhone = async (searchValue, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const cardArea = document.getElementById("card-area");
    // btn show and hide
    const showBtn = document.getElementById("show-all");
    if(phones.length > 12 && !isShowAll){
        showBtn.classList.remove("hidden")
    }else{
        showBtn.classList.add("hidden");
    }
    // slich
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    // clear data 
    cardArea.textContent = "";
    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("card", "card-compact", "w-96", "bg-base-100", "shadow-xl", "border", "pt-5");
        div.innerHTML = `
            <figure><img src="${phone.image}" alt="Phone" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        cardArea.appendChild(div);
    });
    preLoader(false);
}

// search button
const searchBtn = (isShowAll) =>{
    const searchValue = document.getElementById("search_input").value;
    loadPhone(searchValue ,isShowAll);
    preLoader(true);
}


// preloader

const preLoader = (loaderIcon) =>{
    const preLoaderIcon = document.getElementById("pre-loder");
    if(loaderIcon){
        preLoaderIcon.classList.remove("hidden");
    }else{
        preLoaderIcon.classList.add("hidden");
    }
}

// show all 

const showAll = () => {
    searchBtn(true);
}

