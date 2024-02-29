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
        phones = phones.slice(0, 12);
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
                    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        cardArea.appendChild(div);
    });
    preLoader(false);
}

// show details
const showDetails = async (id) =>{
    const ref = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await ref.json();
    const phone = data.data;
    showPhoneDetails(phone);
    
    
}


// show phone details
const showPhoneDetails = (phone) =>{
    showDetails_modal.showModal()
    const detailsData = document.getElementById("modal-box");
    detailsData.innerHTML = `
    <h3 class="font-bold text-lg">${phone.brand}</h3>
    <img class="my-5 " src="${phone.image}" alt="">
    <p class="py-1"><span class="font-medium mr-5">Name</span>${phone.name}</p>
    <p class="py-1"><span class="font-medium mr-5">Relasese Date</span>${phone.releaseDate}</p>
    <p class="py-1"><span class="font-medium mr-5">Memory</span>${phone.mainFeatures.memory}</p>
    <p class="py-1"><span class="font-medium mr-5">Storage</span>${phone.mainFeatures.storage}</p>
    <p class="py-1"><span class="font-medium mr-5">Display Size</span>${phone.mainFeatures.displaySize}</p>
    <p class="py-1"><span class="font-medium mr-5">GPS</span>${phone.others?.GPS || "No GPS Available"}</p>
    <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-error text-white">Close</button>
        </form>
    </div>
    `;
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

