let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function bringData() {
    try {
        const response = await fetch(urlApi)
        const data = await response.json();

        const currentDateContainer = document.getElementById('current-date-p');
        const currentDateElement = new Date(data.currentDate + "T00:00:00.000-05:00").toDateString();
        currentDateContainer.innerHTML = currentDateElement;
    }
    catch (error) {
        console.log(error);
    }
}

bringData();

// PE CARDS

const peContainer = document.getElementById('past-container');

const filterEventsPE = (arrayData) => {
    let pe = arrayData.filter(event => event.date < currentDate);
    return pe;
}

const createCardsPE = (arrayData) => {
    let cards = '';

    arrayData.forEach((event) => {
        cards += `
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
            </div>
        `
    });

    peContainer.innerHTML = cards
}

const arrPE = filterEventsPE(events);
createCardsPE(arrPE);



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

    categoryContainer.innerHTML = `
        <label class="d-flex align-items-center">
            <input type="checkbox" class="custom-checkbox" checked="checked" name="category" value="all" id="all" onclick="checkUncheck(this)">
            <span><strong>Check all</strong></span>
        </label>
        ` + categories
}

const arrCategories = filterCategories(events);
createCategories(arrCategories);

function checkUncheck(checkBox) {
    get = document.getElementsByName('category');
    allcontainer = document.getElementById('all');

    for (var i = 0; i < get.length; i++) {
        get[i].checked = checkBox.checked;
    }

    if (all.checked) {
        createCardsPE(filterEventsByCategory(arrCategories))
    } else {
        peContainer.innerHTML = ''
    }

    // NO RESULTS (CATEGORY) MESSAGE
    if (peContainer.innerHTML === '') {
        noResultsMessagePE.innerHTML = `
            <div class="travolta-container">
                <img src="./assets/img/no-results.gif" alt="No results found">
            </div>
            <h3>We're sorry</h3>
            <h6>but there are no results for the selected category/s.</h6>
            <a href="javascript:document.getElementById('my-search-ue').focus()">
                <h6>Try searching by event name!</h6>
            </a>
        `
    } else {
        noResultsMessagePE.innerHTML = '';
    }
}

// CATEGORY FILTER

let ultimateArrPE = arrPE

const filterEventsByCategory = (arrayCategories, arrayEvents = arrPE) => {
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
    searchInputPE.value = ''
    let selection = []

    arrCategories.forEach(category => {
        let selector = document.getElementById(category)
        if (selector.checked) {
            selection.push(category)
        }
    })

    if (selection.length != 0) {
        createCardsPE(filterEventsByCategory(selection))
    } else {
        peContainer.innerHTML = ''
    }

    let checkedForSearch = filterEventsByCategory(selection)
    ultimateArrPE = checkedForSearch.map(event => event)

    // NO RESULTS (CATEGORY) MESSAGE
    if (peContainer.innerHTML === '') {
        noResultsMessagePE.innerHTML = `
            <div class="travolta-container">
                <img src="./assets/img/no-results.gif" alt="No results found">
            </div>
            <h3>We're sorry</h3>
            <h6>but there are no results for the selected category/s.</h6>
        `
    } else {
        noResultsMessagePE.innerHTML = '';
    }
})



// SEARCH FILTER

const searchInputPE = document.getElementById('my-search-pe')
const noResultsMessagePE = document.getElementById('no-results-message-pe')

searchInputPE.addEventListener("keyup", () => {
    let filteredCardsCategoryPE = ultimateArrPE.filter((event) => event.name.toLowerCase().includes(searchInputPE.value.trim().toLowerCase()))

    createCardsPE(filteredCardsCategoryPE)

    // NO RESULTS MESSAGE
    if (Object.keys(filteredCardsCategoryPE).length === 0) {
        noResultsMessagePE.innerHTML = `
            <div class="travolta-container">
                <img src="./assets/img/no-results.gif" alt="No results found">
            </div>
            <h3>We're sorry</h3>
            <h6>but there are no results for your search "${searchInputPE.value}"</h6>`
    } else {
        noResultsMessagePE.innerHTML = '';
    }
})