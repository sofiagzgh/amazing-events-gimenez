let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function bringData() {
    try {
        const response = await fetch(urlApi)
        const data = await response.json();

        const currentDateContainer = document.getElementById('current-date-p');
        const currentDateElement = new Date(data.currentDate + "T00:00:00.000-05:00").toDateString();
        currentDateContainer.innerHTML = currentDateElement;

        let arrPE = filterEvents(data,"past")
        let arrPE0 = filterEventsInfo1(arrPE)
        let PESorted = sortEventsByPercentage(arrPE0)
        createTop3Events(PESorted)

        let arrUE = filterEvents(data,"upcoming")
        let arrUE1 = filterEventsInfo2(arrUE)
        let UEGrouped = groupEventsByCategory(arrUE1)
        createCategoryTable(UEGrouped,"upcoming")

        let arrPE1 = filterEventsInfo2(arrPE)
        let PEGrouped = groupEventsByCategory(arrPE1)
        createCategoryTable(PEGrouped,"past")
    }
    catch (error) {
        console.log(error);
    }
}

bringData();



// TOP 3 STATISTICS

const filterEvents = (arrayData, time) => {
    let filteredArr = []
    if (time == "past") {
        filteredArr = arrayData.events.filter(event => event.date < arrayData.currentDate);
    } else if (time == "upcoming") {
        filteredArr = arrayData.events.filter(event => event.date >= arrayData.currentDate);
    }

    return filteredArr
}

const filterEventsInfo1 = (arrayData) => {
    let results = []

    arrayData.forEach(event => {
        let result = {};
        result.id = event._id
        result.name = event.name
        result.capacity = event.capacity
        result.percentage = (100 * event.assistance) / event.capacity;
        results.push(result)
    });

    return results
}

const sortEventsByPercentage = (arrayData) => {
    let sortedEvents = arrayData.sort(
        (e1, e2) => (e1.percentage < e2.percentage) ? 1 : (e1.percentage > e2.percentage) ? -1 : 0);

    return sortedEvents
}

const sortEventsByCapacity = (arrayData) => {
    let sortedEvents = arrayData.sort(
        (e1, e2) => (e1.capacity < e2.capacity) ? 1 : (e1.capacity > e2.capacity) ? -1 : 0);

    return sortedEvents
}

const createTop3Events = (arrayData) => {
    const haRows = document.querySelectorAll(".highest-assistance")
    const laRows = document.querySelectorAll(".lowest-assistance")
    const lcRows = document.querySelectorAll(".larger-capacity")

    for (let i = 0; i < 3; i++) {
        haRows[i].innerHTML = `
                            <a href="./details.html?id=${arrayData[i].id}">${arrayData[i].name} </a>
                            <span>(${(arrayData[i].percentage).toFixed(2)}%)</span>
                            `
    }

    arrayData.reverse()
    for (let i = 0; i < 3; i++) {
        laRows[i].innerHTML = `
                            <a href="./details.html?id=${arrayData[i].id}">${arrayData[i].name} </a>
                            <span>(${arrayData[i].percentage.toFixed(2)}%)</span>
                            `
    }

    const byC = sortEventsByCapacity(arrayData)
    for (let i = 0; i < 3; i++) {
        lcRows[i].innerHTML = `
                            <a href="./details.html?id=${byC[i].id}">${byC[i].name} </a>
                            <span>(${byC[i].capacity} people)</span>
                            `
    }
}


// STATISTICS BY CATEGORY

const filterEventsInfo2 = (arrayData) => {
    let results = []

    arrayData.forEach(event => {
        let result = {};
        result.category = event.category
        result.revenues = (event.price * event.estimate) || (event.price * event.assistance)
        result.percentage = (100 * event.estimate) / event.capacity || (100 * event.assistance) / event.capacity;
        results.push(result)
    });

    return results
}

const groupEventsByCategory = (arrayData) => {
    let categoriesUnique = []

    arrayData.forEach(event => {
        if (!categoriesUnique.includes(event.category)) {
            categoriesUnique.push(event.category);
        }
    })

    categoriesUnique.sort()

    let grouped = []
    categoriesUnique.forEach(categor => {
        let cat = {}
        cat.category = ''
        cat.revenues = 0
        cat.percentage = 0
        cat.events = 0

        arrayData.forEach(event => {
            if (event.category == categor) {
                cat.category = categor
                cat.revenues += event.revenues
                cat.percentage += event.percentage
                cat.events ++
            }
        })

        cat.percentage = cat.percentage/cat.events
        grouped.push(cat)
    })

    return grouped
}

const createCategoryTable = (arrayData, time) => {
    let id = ''

    if (time == "upcoming") {
        id = "ue-by-category-container"
    } else if (time == "past") {
        id = "pe-by-category-container"
    }
    const table = document.getElementById(id)

    arrayData.forEach(event => {
        table.innerHTML += `
                        <tr>
                            <td>${event.category}</td>
                            <td class="text-success">$ ${event.revenues}</td>
                            <td>
                                <div class="progress" role="progressbar" aria-valuenow="${event.percentage.toFixed(0)}" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-dark bg-gradient" style="width: ${event.percentage.toFixed(0)}%">${event.percentage.toFixed(2)} %</div>
                                </div>
                            </td>
                        </tr>
        `
    })
}