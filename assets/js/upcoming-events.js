// CARDS

const ueContainer = document.getElementById('ue-container');


const filterEventsUE = (arrayData) => {
    let ue = arrayData.filter(event => event.date >= currentDate);
    return ue;
}

const createCardsUE = (arrayData) => {
    let cards = '';

    arrayData.forEach((event) => {
            cards += `
                <div class="col">
                    <div class="card ue-card h-100 text-bg-light">
                        <img src="${event.image}" class="card-img-top" alt="${event.name}">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                        </div>
                        <div class="card-footer pt-3 pb-3 d-flex justify-content-around align-items-center align-items-xl-baseline">
                            <p class="mb-0 d-flex flex-row flex-md-column flex-xl-row">
                                <span>
                                    <i class="bi bi-tag"></i>
                                    Price:&nbsp;
                                </span>
                                $${event.price}
                            </p>
                            <a class="details-btn" href="./details.html?id=${event.id}"><span>Details</span></a>
                        </div>
                    </div>
                </div>`
    });

    ueContainer.innerHTML = cards
}

const arrUE = filterEventsUE(events);
createCardsUE(arrUE)



// CATEGORIES

const categoryContainer = document.getElementById('category-container');

const filterCategories = (arrayData) => {
    let categoriesUnique = [];

    arrayData.forEach(event => {
        if (!categoriesUnique.includes(event.category)) {
            categoriesUnique.push(event.category);
        }
    });

    return categoriesUnique.sort();
}

const createCategories = (arrayCat) => {
    let categories = '';

    arrayCat.forEach(cat => {
        categories += `
            <label class="d-flex align-items-center">
                <input type="checkbox" class="custom-checkbox" name="category" value="${cat}">
                <span>${cat}</span>
            </label>
            `
    });

    categoryContainer.innerHTML = categories
}

const arrCategories = filterCategories(events);
createCategories(arrCategories);



// SEARCH

const searchInputUE = document.getElementById('my-search-ue')
const noResultsMessageUE = document.getElementById('no-results-message-ue')

searchInputUE.addEventListener("keyup", () => {
    let filteredCardsUE = arrUE.filter((event) => event.name.toLowerCase().includes(searchInputUE.value.trim().toLowerCase()));

    createCardsUE(filteredCardsUE)
    
    if (Object.keys(filteredCardsUE).length === 0) {
        noResultsMessageUE.innerHTML = `
            <img src="./assets/img/no-results.gif" alt="No results found">
            <h3>We're sorry</h3>
            <h6>but there are no results for your search "${searchInputUE.value}"</h6>
        `
    } else {
        noResultsMessageUE.innerHTML = '';
    }
})