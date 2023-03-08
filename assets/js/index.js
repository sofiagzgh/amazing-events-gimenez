// CURRENT DATE

const currentDateContainer = document.getElementById('current-date-p');
const currentDateElement = new Date(currentDate + "T00:00:00.000-05:00").toDateString();
currentDateContainer.innerHTML = currentDateElement;



// HOME CARDS

const indexContainer = document.getElementById('home-container');

// sort data by name (in ascending order)
events.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    return 0;
});

const createCardsHome = (arrayData) => {
    let cardsUE = '';
    let cardsPE = '';

    arrayData.forEach((event) => {
        if (event.date >= currentDate) {
            cardsUE += `
                <div class="col">
                    <div class="card ue-card h-100 text-bg-light">
                        <img src="${event.image}" class="card-img-top" alt="${event.name}">
                        <div class="card-body text-start pt-1">
                            <p class="card-text fs-6 p-0 mb-1 text-muted">${event.category}</p>
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text card-descr fs-6">${event.description}</p>
                        </div>
                        <div class="card-footer pt-3 pb-3 d-flex justify-content-around align-items-center align-items-xl-baseline">
                            <p class="mb-0 d-flex flex-row flex-md-column flex-xl-row">
                                <span>
                                    <i class="bi bi-tag"></i>
                                    Price:&nbsp;
                                </span>
                                $${event.price}
                            </p>
                            <a class="details-btn" href="details.html?id=${event.id}"><span>Details</span></a>
                        </div>
                    </div>
                </div>`
        } else {
            cardsPE += `
                    <div class="col">
                        <div class="card pe-card h-100 text-bg-secondary border-danger">
                            <img src="${event.image}" alt="${event.name}">
                            <div class="card-header bg-dark text-danger bg-gradient">
                                Past Event
                            </div>
                            <div class="card-body pt-1 text-start">
                                <p class="card-text fs-6 p-0 mb-1 text-white-50">${event.category}</p>
                                <h5 class="card-title">${event.name}</h5>
                                <p class="card-text card-descr fs-6">${event.description}</p>
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
        }
    });

    indexContainer.innerHTML = cardsUE + cardsPE
}

createCardsHome(events)



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
                <input type="checkbox" class="custom-checkbox" checked="checked" name="category" value="${cat}" id="${cat}" onclick="arrCategorySelected()">
                <span>${cat}</span>
            </label>
            `
    });

    categoryContainer.innerHTML = categories
}

const arrCategories = filterCategories(events);
createCategories(arrCategories);



// CATEGORY FILTER

let ultimateArr = events

const filterEventsByCategory = (arrayCategories, arrayEvents = events) => {
    let filteredEvents = []
    arrayCategories.forEach(categor => {
        arrayEvents.forEach(event => {
            if (event.category == categor) {
                filteredEvents.push(event)
            }
        })
    })
    return filteredEvents
}

const arrCategorySelected = (() => {
    searchInput.value = ''
    let selection = []

    arrCategories.forEach(category => {
        let selector = document.getElementById(category);
        if (selector.checked) {
            selection.push(category)
        }
    })

    if (selection.length != 0) {
        createCardsHome(filterEventsByCategory(selection))
    } else {
        indexContainer.innerHTML = ''
    }

    let checkedForSearch = filterEventsByCategory(selection)
    ultimateArr = checkedForSearch.map(event => event)

    // NO RESULTS (CATEGORY) MESSAGE
    if (indexContainer.innerHTML === '') {
        noResultsMessage.innerHTML = `
            <div class="travolta-container">
                <img src="./assets/img/no-results.gif" alt="No results found">
            </div>
            <h3>We're sorry</h3>
            <h6>but there are no results for the selected category/s.</h6>
        `
    } else {
        noResultsMessage.innerHTML = '';
    }
})



// SEARCH FILTER

const searchInput = document.getElementById('mySearch')
const noResultsMessage = document.getElementById('no-results-message')

searchInput.addEventListener("keyup", () => {
    let filteredCardsCategory = ultimateArr.filter((event) => event.name.toLowerCase().includes(searchInput.value.trim().toLowerCase()))

    createCardsHome(filteredCardsCategory)

    // NO RESULTS MESSAGE
    if (Object.keys(filteredCardsCategory).length === 0) {
        noResultsMessage.innerHTML = `
            <div class="travolta-container">
                <img src="./assets/img/no-results.gif" alt="No results found" class="p-0">
            </div>
            <h3>We're sorry</h3>
            <h6>but there are no results for your search "${searchInput.value}"</h6>`
    } else {
        noResultsMessage.innerHTML = '';
    }
})

