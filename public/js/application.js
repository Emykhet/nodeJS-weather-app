const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const weatherDisplay = document.querySelector('.weather-display');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

messageOne.textContent = 'Loading..';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    const location = weatherInput.value;

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then((res) => {
            res.json()
                .then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error;
                    } else {
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                    }

                });
            weatherInput.value = "";
        });
    e.preventDefault();
});