// CURRENT DATE

const currentDateContainer = document.getElementById('current-date-p');
const currentDateElement = new Date(currentDate + "T00:00:00.000-05:00").toDateString();
currentDateContainer.innerHTML = currentDateElement;



// DETAILS CARD

const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id")

const detailEvent = events.find(event => event.id == id);

const detailsContainer = document.getElementById('details-container')

const detailDateFormatted = new Date(detailEvent.date + "T00:00:00.000-05:00").toDateString();

if (detailEvent.date >= currentDate) {
    detailsContainer.innerHTML = `
        <div class="card mb-3 col-12 col-lg-12 shadow">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${detailEvent.image}" class="img-fluid" alt="Details image">
                </div>
                <div class="col-md-8 d-flex flex-column flex-sm-row">
                    <div class="card-body text-sm-end d-flex flex-column center flex-sm-row flex-sm-wrap align-content-sm-between justify-content-sm-end">
                        <div>
                            <h5 class="card-title p-2">${detailEvent.name}</h5>
                            <p class="card-text p-2">${detailEvent.description}</p>
                        </div>
                        <button class="back-btn mb-2 mt-4" onclick="history.back()"><span>↺</span> Go Back </button>
                    </div>

                    <div class="card-footer p-3">
                        <ul class="list-group list-group-flush d-flex flex-col justify-content-start">
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-grid"></i>
                                <span>Category:&nbsp;</span> ${detailEvent.category}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-calendar-date"></i>
                                <span>Date:&nbsp;</span><time datetime="${detailEvent.date}">${detailDateFormatted}</time>
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-geo-alt-fill"></i>
                                <span>Place:&nbsp;</span>${detailEvent.place}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-tag"></i>
                                <span>Price:&nbsp;</span>$${detailEvent.price}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-door-closed"></i>
                                <span>Capacity:&nbsp;</span>${detailEvent.capacity}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-people-fill"></i>
                                <span>Estimate:&nbsp;</span>${detailEvent.estimate}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`
} else {
    detailsContainer.innerHTML = `
        <div class="card mb-3 col-12 col-lg-12 text-bg-secondary border-dange shadow">
            <div class="row g-0">
                <div class="card-header bg-dark text-danger bg-gradient">
                    Past Event
                </div>
                <div class="col-md-4">
                    <img src="${detailEvent.image}" class="img-fluid rounded-top rounded-sm-left" alt="Details image">
                </div>
                <div class="col-md-8 d-flex flex-column flex-sm-row">
                    <div class="card-body text-sm-end d-flex flex-column center flex-sm-row flex-sm-wrap align-content-sm-between justify-content-sm-end">
                        <div>
                            <h5 class="card-title p-3">${detailEvent.name}</h5>
                            <p class="card-text p-1">${detailEvent.description}</p>
                        </div>
                        <button class="back-btn mb-2 mt-4" onclick="history.back()"><span>↺</span> Go Back </button>
                    </div>

                    <div class="card-footer p-3">
                        <ul class="list-group list-group-flush d-flex flex-col justify-content-start">
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-grid"></i>
                                <span>Category:&nbsp;</span> ${detailEvent.category}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-calendar-date"></i>
                                <span>Date:&nbsp;</span><time datetime="${detailEvent.date}">${detailDateFormatted}</time>
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-geo-alt-fill"></i>
                                <span>Place:&nbsp;</span>${detailEvent.place}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-tag"></i>
                                <span>Price:&nbsp;</span>$${detailEvent.price}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-door-closed"></i>
                                <span>Capacity:&nbsp;</span>${detailEvent.capacity}
                            </li>
                            <li class="list-group-item rounded-pill d-flex align-items-center">
                                <i class="bi bi-people-fill"></i>
                                <span>Assistance:&nbsp;</span>${detailEvent.assistance}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`
}