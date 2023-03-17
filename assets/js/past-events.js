let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function bringData() {
    try {
        const response = await fetch(urlApi)
        const data = await response.json();

        const currentDateContainer = document.getElementById('current-date-p');
        const currentDateElement = new Date(data.currentDate + "T00:00:00.000-05:00").toDateString();
        currentDateContainer.innerHTML = currentDateElement;

        const arrPE = filterEventsPE(data);
        createCardsPE(arrPE);

        const arrCategories = filterCategories(data.events);
        createCategories(arrCategories)
        console.log(arrPE);
        console.log(arrCategories);

        arrCategorySelected(arrCategories, arrPE)

    }
    catch (error) {
        console.log(error);
    }
}

bringData();

// PE CARDS

const filterEventsPE = (arrayData) => {
    let pe = arrayData.events.filter(event => event.date < arrayData.currentDate);
    return pe;
}

const createCardsPE = (arrayData) => {
    const peContainer = document.getElementById('past-container');
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



// CATEGORIES

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
    const categoryContainer = document.getElementById('category-container');
    let categories = '';

    arrayCat.forEach(cat => {
        categories += `
            <label class="d-flex align-items-center">
                <input type="checkbox" class="custom-checkbox" checked="checked" name="category" value="${cat}" id="${cat}">
                <span>${cat}</span>
            </label>
            `
    });

    categoryContainer.innerHTML = categories
}


// CATEGORY FILTER
const filterEventsByCategory = (arrayCategories, arrayEvents) => {
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


const arrCategorySelected = ((array, arrPE) => {
    const noResultsMessagePE = document.getElementById('no-results-message-pe')
    const peContainer = document.getElementById('past-container');
    let selection = []

    console.log("hola");
    console.log(array);

    array.forEach(category => {
        let selector = document.getElementById(category)
        if (selector.checked) {
            selection.push(category)
        }
    })

    if (selection.length != 0) {
        createCardsPE(filterEventsByCategory(selection, arrPE))
    } else {
        peContainer.innerHTML = ''
    }

    let checkedForSearch = filterEventsByCategory(selection, arrPE)
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


