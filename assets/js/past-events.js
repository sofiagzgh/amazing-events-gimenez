// CARDS
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
                    <div class="card h-100 text-bg-secondary border-danger">
                        <div class="card-header">
                            Past Event
                        </div>
                        <img src="${event.image}" alt="${event.name}">
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
                            <a class="details-btn" href="details.html?id=${event.id}"><span>Details</span></a>
                        </div>
                    </div>
                </div>`
        }
    );

    peContainer.innerHTML = cards
}

const arrPE = filterEventsPE(events);
createCardsPE(arrPE);


// CATEGORIES

const categoryContainer = document.getElementById('category-container');

const createCategories = (arrayData) => {
    let categories = '';

    arrayData.forEach(event => {
        if (!categories.includes(event.category)) {
            categories += `
            <label class="d-flex align-items-center">
                <input type="checkbox" class="custom-checkbox" name="category" value="${event.category.toLowerCase()}">
                <span>${event.category}</span>
            </label>
            `
        }
    });

    categoryContainer.innerHTML = categories
}

createCategories(events)


// SEARCH

const searchInputPE = document.getElementById('my-search-pe')
const noResultsMessagePE = document.getElementById('no-results-message-pe')

searchInputPE.addEventListener("keyup", () => {
    let filteredCardsPE = arrPE.filter((event) => event.name.toLowerCase().includes(searchInputPE.value.toLowerCase()))

    createCardsPE(filteredCardsPE)

    if (Object.keys(filteredCardsPE).length === 0) {
        noResultsMessagePE.innerHTML = `
        <img src="./assets/img/no-results.gif" alt="No results found">
        <h3>We're sorry</h3>
        <h6>but there are no results for your search "${searchInputPE.value}"</h6>`
    } else {
        noResultsMessagePE.innerHTML = '';
    }
})