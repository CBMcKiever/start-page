function displayTimeOfDay() {
    let time = new Date().getHours();
    if (time >= 0 && time <= 3) return 'evening';
    if (time >= 4 && time <= 11) return 'morning';
    if (time >= 12 && time <= 16) return 'afternoon';
    if (time >= 17 && time <= 24) return 'evening';
    console.log(time);
}

const greeting = document.getElementById('greeting');
greeting.textContent = `Good ${displayTimeOfDay()}, Cole.`;

fetch("https://quotes.rest/qod.json?category=inspire")
.then(response => {
    return response.json();
})
.then(json => {
    let qod = json.contents.quotes[0];
    const quoteBox = document.querySelector()
})