const locationForm = document.getElementById('location-form')
const location_input = document.querySelector('input')
const message1 = document.getElementById('message1')
const message2 = document.getElementById('message2')

locationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('hey there', location_input.value)

    message1.textContent ="Loading..."
    message2.content = ''

    fetch(`/weather?address=${location_input.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                message1.textContent = 'Unable to find location.  Please try again.'
                
            } else{

                console.log(data)
                message1.textContent = data['address'] + ' ' + data['forecast']['location']
                message2.textContent = `Current Temperature: ${data['forecast']['temperature']} C / ${data['forecast']['temperature']*1.8 +32} F Current Precipitation: ${data['forecast']['precipitation']}`
            }
        })
    })
})


