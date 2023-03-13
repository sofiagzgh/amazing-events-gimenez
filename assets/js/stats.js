let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

async function bringData() {
    try {
        const response = await fetch(urlApi)
        const data = await response.json();

        const currentDateContainer = document.getElementById('current-date-p');
        const currentDateElement = new Date(data.currentDate + "T00:00:00.000-05:00").toDateString();
        currentDateContainer.innerHTML = currentDateElement;

        let test0 = filterEventsPE(data)
        let test1 = filterEventsInfo(test0)
        let test2 = sortEventsByPercentage(test1)
        let test = createTop3Events(test2)
    }
    catch (error) {
        console.log(error);
    }
}

bringData();

const filterEventsPE = (arrayData) => {
    let pe = arrayData.events.filter(event => event.date < arrayData.currentDate);
    return pe;
}

const filterEventsInfo = (arrayData) => {
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
                            <span>(${(arrayData[i].percentage).toFixed(2)}%)</span>
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