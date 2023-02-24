const currentDate = "2022-01-01";
const events = [
    {
        "id": 1,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas7.jpg",
        "name": "Collectivities Party",
        "date": "2021-12-12",
        "description": "Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
        "category": "Food Fair",
        "place": "Room A",
        "capacity": 45000,
        "assistance": 42756,
        "price": 5
    },
    {
        "id": 2,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas2.jpg",
        "name": "Korean style",
        "date": "2022-08-12",
        "description": "Enjoy the best Korean dishes, with international chefs and awesome events.",
        "category": "Food Fair",
        "place": "Room A",
        "capacity": 45000,
        "assistance": 42756,
        "price": 10
    },
    {
        "id": 3,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo5.jpg",
        "name": "Jurassic Park",
        "date": "2021-11-02",
        "description": "Let's go meet the biggest dinosaurs in the paleontology museum.",
        "category": "Museum",
        "place": "Field",
        "capacity": 82000,
        "assistance": 65892,
        "price": 15
    },
    {
        "id": 4,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo1.jpg",
        "name": "Parisian Museum",
        "date": "2022-11-02",
        "description": "A unique tour in the city of lights, get to know one of the most iconic places.",
        "category": "Museum",
        "place": "Paris",
        "capacity": 8200,
        "estimate": 8200,
        "price": 3500
    },
    {
        "id": 5,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces2.jpg",
        "name": "Comicon",
        "date": "2021-02-12",
        "description": "For comic lovers, all your favourite characters gathered in one place.",
        "category": "Costume Party",
        "place": "Room C",
        "capacity": 120000,
        "assistance": 110000,
        "price": 54
    },
    {
        "id": 6,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces1.jpg",
        "name": "Halloween Night",
        "date": "2022-02-12",
        "description": "Come with your scariest costume and win incredible prizes.",
        "category": "Costume Party",
        "place": "Room C",
        "capacity": 12000,
        "estimate": 9000,
        "price": 12
    },
    {
        "id": 7,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica1.jpg",
        "name": "Metallica in concert",
        "date": "2022-01-22",
        "description": "The only concert of the most emblematic band in the world.",
        "category": "Music Concert",
        "place": "Room A"
        , "capacity": 138000,
        "estimate": 138000,
        "price": 150
    },
    {
        "id": 8,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica2.jpg",
        "name": "Electronic Fest",
        "date": "2021-01-22",
        "description": "The best national and international DJs gathered in one place.",
        "category": "Music Concert",
        "place": "Room A",
        "capacity": 138000,
        "assistance": 110300,
        "price": 250
    },
    {
        "id": 9,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Maraton3.jpg",
        "name": "10K for life",
        "date": "2021-03-01",
        "description": "Come and exercise, improve your health and lifestyle.",
        "category": "Race",
        "place": "Soccer field",
        "capacity": 30000,
        "assistance": 25698,
        "price": 3
    },
    {
        "id": 10,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Maraton1.jpg",
        "name": "15K NY",
        "date": "2022-03-01",
        "description": "We'll be raising funds for hospitals and medical care in this unique event held in The Big Apple.",
        "category": "Race",
        "place": "New York",
        "capacity": 3000000,
        "assistance": 2569800,
        "price": 3
    },
    {
        "id": 11,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Libros7.jpg",
        "name": "School's book fair",
        "date": "2022-10-15",
        "description": "Bring your unused school book and take the one you need.",
        "category": "Book Exchange",
        "place": "Room D1",
        "capacity": 150000,
        "estimate": 123286,
        "price": 1
    },
    {
        "id": 12,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Libros3.jpg",
        "name": "Just for your kitchen",
        "date": "2021-11-09",
        "description": "If you're a gastronomy lover come get the cookbook that best suits your taste and your family's.",
        "category": "Book Exchange",
        "place": "Room D6",
        "capacity": 130000,
        "assistance": 90000,
        "price": 100
    },
    {
        "id": 13,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Cine3.jpg",
        "name": "Batman",
        "date": "2021-3-11",
        "description": "Come see Batman fight crime in Gotham City.",
        "category": "Cinema",
        "place": "Room D1",
        "capacity": 11000,
        "assistance": 9300,
        "price": 225
    },
    {
        "id": 14,
        "image": "https://amazingeventsapi.herokuapp.com/api/img/Cine7.jpg",
        "name": "Avengers",
        "date": "2022-10-15",
        "description": "Marvel's Avengers Premier in 3d, the start of an epic saga with your favourite superheroes.",
        "category": "Cinema",
        "place": "Room D1",
        "capacity": 9000,
        "estimate": 9000,
        "price": 250
    }
];



const indexContainer = document.getElementById('ue-container');

function createCards(arrayData) {
    let cards = '';
    for (const event of arrayData) {
        if (parseInt(event.date) >= parseInt(currentDate)) {
            cards += `
                <div class="col">
                    <div class="card h-100 text-bg-light">
                        <img src="./assets/img/Cinema.jpg" class="card-img-top" alt="Cinema">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                        </div>
                        <div class="card-footer pt-3 d-flex justify-content-around align-items-center align-items-xl-baseline">
                            <p class="d-flex flex-row flex-md-column flex-xl-row">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-tag" viewBox="0 0 16 16">
                                        <path
                                            d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                                        <path
                                            d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z" />
                                    </svg>
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

    return cards
}

let elementsCards = createCards(events)

indexContainer.innerHTML = elementsCards