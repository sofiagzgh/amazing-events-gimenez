const UEContainer = document.getElementById('ue-container');

function createCardsUE(arrayData) {
    let cards = '';
    for (const event of arrayData) {
        if (parseInt(event.date) >= parseInt(currentDate)) {
            cards += `
                <div class="col">
                    <div class="card h-100 text-bg-light">
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
                            <a class="details-btn" href="details.html"><span>Details</span></a>
                        </div>
                    </div>
                </div>`
        }
    }
    return cards
}

let elementsCardsUE = createCardsUE(events)

UEContainer.innerHTML = elementsCardsUE


// CATEGORIES

const categoryContainer = document.getElementById('category-container');

function createCategories(arrayData) {
    let categories = '';
    arrayData.forEach(event => {
        if (!categories.includes(event.category)) {
            categories += `
            <label><input type="checkbox"> ${event.category}</label>
            `
        }
    });
    return categories
}

let uniqueCategories = createCategories(events);

categoryContainer.innerHTML = uniqueCategories;