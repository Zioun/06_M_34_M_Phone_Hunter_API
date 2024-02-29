const loadPhone = async (searchValue) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones);
}

const displayPhones = phones => {
    const cardArea = document.getElementById("card-area");
    // btn show and hide
    const showBtn = document.getElementById("show-all");
    if(phones.length > 12){
        showBtn.classList.remove("hidden")
    }else{
        showBtn.classList.add("hidden");
    }
    // slich
    const slicePhn = phones.slice(0,12);
    // clear data 
    cardArea.textContent = "";
    slicePhn.forEach(phone => {
        const div = document.createElement("div");
        div.classList.add("card", "card-compact", "w-96", "bg-base-100", "shadow-xl", "border", "pt-5");
        div.innerHTML = `
            <figure><img src="${phone.image}" alt="Phone" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>${phone.slug}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
        cardArea.appendChild(div);
    });
}

const searchBtn = () =>{
    const searchValue = document.getElementById("search_input").value;
    loadPhone(searchValue);
}




