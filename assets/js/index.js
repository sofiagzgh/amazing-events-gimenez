let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function bringData() {
    try {
        const response = await fetch(urlApi)
        const data = await response.json();

        const currentDateContainer = document.getElementById('current-date-p');
        const currentDateElement = new Date(data.currentDate + "T00:00:00.000-05:00").toDateString();
        currentDateContainer.innerHTML = currentDateElement;

        createCardsHome(data.events, data.currentDate)

        const arrCategoriesUnique = filterCategories(data.events);
        createCategories(arrCategoriesUnique);

        checkUncheck(data.events, data.currentDate)
        arrCategorySelected(arrCategoriesUnique, data.events, data.currentDate)

        searchFilter(data.events, data.currentDate)
    }
    catch (error) {
        console.log(error);
    }
}

bringData();

// HOME CARDS

const createCardsHome = (arrayEvents, currentDate) => {
    const indexContainer = document.getElementById('home-container');
    let cardsUE = '';
    let cardsPE = '';

    arrayEvents.forEach((event) => {
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



// CATEGORIES

const filterCategories = (arrayEvents) => {
    let categoriesUnique = [];

    arrayEvents.forEach(event => {
        if (!categoriesUnique.includes(event.category)) {
            categoriesUnique.push(event.category);
        }
    });

    return categoriesUnique.sort();
}

const createCategories = (arrayCat) => {
    const categoryContainer = document.getElementById('category-container');
    let categories = '';

    arrayCat.forEach(cat => {
        categories += `
            <label class="d-flex align-items-center">
                <input type="checkbox" class="custom-checkbox categories" checked="checked" name="category" value="${cat}" id="${cat}">
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

function checkUncheck(arrayEvents, currentDate) {
    const checkBox = document.getElementById('all');

    checkBox.addEventListener("change", () => {
        const searchInput = document.getElementById('mySearch');
        const get = document.getElementsByName('category');
        const indexContainer = document.getElementById('home-container');
        const noResultsMessage = document.getElementById('no-results-message');

        searchInput.value = ''

        for (var i = 0; i < get.length; i++) {
            get[i].checked = checkBox.checked;
        }

        if (checkBox.checked) {
            createCardsHome(arrayEvents, currentDate)
        } else {
            indexContainer.innerHTML = ''
        }

        // NO RESULTS (CATEGORY) MESSAGE
        if (indexContainer.innerHTML === '') {
            noResultsMessage.innerHTML = `
                <div class="travolta-container">
                    <img src="./assets/img/no-results.gif" alt="No results found">
                </div>
                <h3>We're sorry</h3>
                <h6>but there are no results for the selected category/s.</h6>
                <a href="javascript:document.getElementById('mySearch').focus()">
                    <p>⇪ Try searching by event name ⇪</p>
                </a>
            `
        } else {
            noResultsMessage.innerHTML = '';
        }
    })
}



// CATEGORY FILTER

function arrCategorySelected(arrayCategories, arrayEvents, currentDate) {
    const categoriesContainer = document.getElementById('category-container')

    categoriesContainer.addEventListener("change", () => {
        const searchInput = document.getElementById('mySearch');
        const checkBoxAll = document.getElementById('all');
        const indexContainer = document.getElementById('home-container');
        const noResultsMessage = document.getElementById('no-results-message');
        let selection = []

        searchInput.value = ''

        arrayCategories.forEach(category => {
            let selector = document.getElementById(category);
            if (selector.checked) {
                selection.push(category)
            }
        })

        let filteredEvents = []

        selection.forEach(categor => {
            arrayEvents.forEach(event => {
                if (event.category == categor) {
                    filteredEvents.push(event)
                }
            })
        })

        if (selection.length != 0 && selection.length != arrayCategories.length) {
            createCardsHome(filteredEvents, currentDate)
            checkBoxAll.checked = false;
            searchFilter(filteredEvents, currentDate)
        } else if (selection.length == arrayCategories.length) {
            checkBoxAll.checked = true;
        } else {
            indexContainer.innerHTML = '';
        }

        // NO RESULTS (CATEGORY) MESSAGE
        if (indexContainer.innerHTML === '') {
            noResultsMessage.innerHTML = `
                <div class="travolta-container">
                    <img src="./assets/img/no-results.gif" alt="No results found">
                </div>
                <h3>We're sorry</h3>
                <h6>but there are no results for the selected category/s.</h6>
                <a href="#banner" onclick="javascript:document.getElementById('mySearch').focus()">
                    <p>⇪ Try searching by event name ⇪</p>
                </a>
                `
        } else {
            noResultsMessage.innerHTML = '';
        }

    })
}



// SEARCH FILTER

function searchFilter(arrayEvents, currentDate) {
    const searchInput = document.getElementById('mySearch')
    const noResultsMessage = document.getElementById('no-results-message')

    searchInput.addEventListener("keyup", () => {
        let filteredCardsCategory = arrayEvents.filter((event) => event.name.toLowerCase().includes(searchInput.value.trim().toLowerCase()))

        createCardsHome(filteredCardsCategory, currentDate)

        // NO RESULTS MESSAGE
        if (Object.keys(filteredCardsCategory).length === 0) {
            noResultsMessage.innerHTML = `
                <div class="travolta-container">
                    <img src="./assets/img/no-results.gif" alt="No results found" class="p-0">
                </div>
                <h3>We're sorry</h3>
                <h6>but there are no results for your search "${searchInput.value}"</h6>
                <a href="#banner">
                    <p>⇪ Try searching by event category ⇪</p>
                </a>
                `
        } else {
            noResultsMessage.innerHTML = '';
        }
    })

}

