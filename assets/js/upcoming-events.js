// CURRENT DATE

const currentDateContainer = document.getElementById('current-date-p');
const currentDateElement = new Date(currentDate + "T00:00:00.000-05:00").toDateString();
currentDateContainer.innerHTML = currentDateElement;



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
                <input type="checkbox" class="custom-checkbox" checked="checked" name="category" value="${cat}" id="${cat}" onclick="arrCategorySelected()">
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
    let filteredCardsCategoryUE = ultimateArrUE.filter((event) => event.name.toLowerCase().includes(searchInputUE.value.trim().toLowerCase()));

    createCardsUE(filteredCardsCategoryUE)

    if ((Object.keys(filteredCardsCategoryUE).length === 0) || (ueContainer.innerHTML === '')) {
        noResultsMessageUE.innerHTML = `
            <div class="travolta-container">
                <img src="./assets/img/no-results.gif" alt="No results found">
            </div>
            <h3>We're sorry</h3>
            <h6>but there are no results for your search "${searchInputUE.value}"</h6>
        `
    } else {
        noResultsMessageUE.innerHTML = '';
    }
})



// CATEGORY FILTER

let ultimateArrUE = arrUE

const filterEventsByCategory = (arrayCategories, arrayEvents = arrUE) => {
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
    searchInputUE.value = ''
    let selection = []

    arrCategories.forEach(category => {
        let selector = document.getElementById(category)
        if (selector.checked) {
            selection.push(category)
        }
    })

    if (selection.length != 0) {
        createCardsUE(filterEventsByCategory(selection))
    } else {
        ueContainer.innerHTML = ''
    }

    let checkedForSearch = filterEventsByCategory(selection)
    ultimateArrUE = checkedForSearch.map(event => event)

    // NO RESULTS (CATEGORY) MESSAGE
    if (ueContainer.innerHTML === '') {
        noResultsMessageUE.innerHTML = `
            <div class="travolta-container">
                <img src="./assets/img/no-results.gif" alt="No results found">
            </div>
            <h3>We're sorry</h3>
            <h6>but there are no results for the selected category/s.</h6>
        `
    } else {
        noResultsMessageUE.innerHTML = '';
    }
})
