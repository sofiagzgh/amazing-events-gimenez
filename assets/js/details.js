const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id")

const uniqueEvent = events.find(event => event.id == id);

const detailsContainer = document.getElementById('details-container')

console.log(uniqueEvent)

detailsContainer.innerHTML = `
                            <div class="card mb-3 col-12 col-lg-10 shadow">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${uniqueEvent.image}" class="img-fluid rounded" alt="Details image">
                                    </div>
                                    <div class="col-md-8 d-flex flex-column flex-sm-row">
                                        <div class="card-body text-sm-end">
                                            <h5 class="card-title p-3">${uniqueEvent.name}</h5>
                                            <p class="card-text p-3">${uniqueEvent.description}</p>
                                            <button class="back-btn" onclick="history.back()"><span>↺</span> Go Back </button>
                                        </div>

                                        <div class="card-footer p-3">
                                            <ul class="list-group list-group-flush d-flex flex-col justify-content-start">
                                                <li class="list-group-item rounded-pill d-flex align-items-center">
                                                    <i class="bi bi-grid"></i>
                                                    <span>Category:&nbsp;</span> ${uniqueEvent.category}
                                                </li>
                                                <li class="list-group-item rounded-pill d-flex align-items-center">
                                                    <i class="bi bi-calendar-date"></i>
                                                    <span>Date:&nbsp;</span>${uniqueEvent.date}
                                                </li>
                                                <li class="list-group-item rounded-pill d-flex align-items-center">
                                                    <i class="bi bi-geo-alt-fill"></i>
                                                    <span>Place:&nbsp;</span>${uniqueEvent.place}
                                                </li>
                                                <li class="list-group-item rounded-pill d-flex align-items-center">
                                                    <i class="bi bi-tag"></i>
                                                    <span>Price:&nbsp;</span>$${uniqueEvent.price}
                                                </li>
                                                <li class="list-group-item rounded-pill d-flex align-items-center">
                                                    <i class="bi bi-door-closed"></i>
                                                    <span>Capacity:&nbsp;</span>${uniqueEvent.capacity}
                                                </li>
                                                <li class="list-group-item rounded-pill d-flex align-items-center">
                                                    <i class="bi bi-people-fill"></i>
                                                    <span>Assistances:&nbsp;</span>${uniqueEvent.assistance || uniqueEvent.estimate}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>`