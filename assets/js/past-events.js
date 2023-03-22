let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function bringData() {
    try {
        const response = await fetch(urlApi)
        const data = await response.json();

        const currentDateContainer = document.getElementById('current-date-p');
        const currentDateElement = new Date(data.currentDate + "T00:00:00.000-05:00").toDateString();
        currentDateContainer.innerHTML = currentDateElement;

        const arrPE = filterEvents(data.events, data.currentDate);
        createCardsPE(arrPE)

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

// PE CARDS

const filterEvents = (arrayEvents, currentDate) => {
    let pe = arrayEvents.filter(event => event.date < currentDate);
    return pe;
}

const createCardsPE = (arrayEvents) => {
    const peContainer = document.getElementById('past-container');
    let cards = '';

    arrayEvents.forEach((event) => {
        cards += `
                <div class="col">
                    <div class="card pe-card h-100 text-bg-light">
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

    peContainer.innerHTML = cards
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
        const searchInputPE = document.getElementById('my-search-pe');
        const get = document.getElementsByName('category');
        const peContainer = document.getElementById('past-container');
        const noResultsMessagePE = document.getElementById('no-results-message-pe');

        searchInputPE.value = ''

        for (var i = 0; i < get.length; i++) {
            get[i].checked = checkBox.checked;
        }

        if (checkBox.checked) {
            createCardsPE(arrayEvents, currentDate)
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
                <a href="javascript:document.getElementById('mySearch').focus()">
                    <p>⇪ Try searching by event name ⇪</p>
                </a>
            `
        } else {
            noResultsMessagePE.innerHTML = '';
        }
    })
}


// CATEGORY FILTER

function arrCategorySelected(arrayCategories, arrayEvents, currentDate) {
    const categoriesContainer = document.getElementById('category-container')

    categoriesContainer.addEventListener("change", () => {
        const searchInputPE = document.getElementById('my-search-pe');
        const checkBoxAll = document.getElementById('all');
        const peContainer = document.getElementById('past-container');
        const noResultsMessagePE = document.getElementById('no-results-message-pe');
        let selection = []

        searchInputPE.value = ''

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
            createCardsPE(filteredEvents, currentDate)
            checkBoxAll.checked = false;
        } else if (selection.length == arrayCategories.length) {
            checkBoxAll.checked = true;
        } else {
            peContainer.innerHTML = '';
        }

        // NO RESULTS (CATEGORY) MESSAGE
        if (peContainer.innerHTML === '') {
            noResultsMessagePE.innerHTML = `
                <div class="travolta-container">
                    <img src="./assets/img/no-results.gif" alt="No results found">
                </div>
                <h3>We're sorry</h3>
                <h6>but there are no results for the selected category/s.</h6>
                <a href="#banner" id="try-name">
                    <p>⇪ Try searching by event name ⇪</p>
                </a>
                `
        } else {
            noResultsMessagePE.innerHTML = '';
        }

    })
}

// SEARCH FILTER

function searchFilter(arrayEvents, currentDate) {
    const searchInputPE = document.getElementById('my-search-pe')
    const noResultsMessagePE = document.getElementById('no-results-message-pe')

    searchInputPE.addEventListener("keyup", () => {
        let filteredCardsCategory = arrayEvents.filter((event) => event.name.toLowerCase().includes(searchInputPE.value.trim().toLowerCase()))

        createCardsPE(filteredCardsCategory, currentDate)

        // NO RESULTS MESSAGE
        if (Object.keys(filteredCardsCategory).length === 0) {
            noResultsMessagePE.innerHTML = `
                <div class="travolta-container">
                    <img src="./assets/img/no-results.gif" alt="No results found" class="p-0">
                </div>
                <h3>We're sorry</h3>
                <h6>but there are no results for your search "${searchInputPE.value}"</h6>
                <a href="#banner">
                    <p>⇪ Try searching by event category ⇪</p>
                </a>
                `
        } else {
            noResultsMessagePE.innerHTML = '';
        }
    })
}