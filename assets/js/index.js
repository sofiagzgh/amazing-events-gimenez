const indexContainer = document.getElementById('home-container');

function createCards(arrayData) {
    let cardsUE = '';
    let cardsPE = '';
    for (const event of arrayData) {
        if (parseInt(event.date) >= parseInt(currentDate)) {
            cardsUE += `
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
                            <a class="details-btn" href="details.html">Details</a>
                        </div>
                    </div>
                </div>`
        }
        else {
            cardsPE += `
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
                            <a class="details-btn" href="details.html">Details</a>
                        </div>
                    </div>
                </div>`
        }
    }

    return (cardsUE + cardsPE)
}

let elementsCards = createCards(events)

indexContainer.innerHTML = elementsCards