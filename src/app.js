const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express();

// Define Paths For Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,  '../templates/partials')

// provide location of static html docs to serve them
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))
app.use('*/images',express.static(path.join(__dirname, '../public/images')))
app.use('*/js',express.static(path.join(__dirname, '../public/images')))


app.get('', (req, res) =>
    res.render('index', {
        title: 'Weather App Home',
        status: 'pimpin good',
        author: 'Quintin Sheridan'
    })
)

app.get('/about', (req, res) =>
    res.render('about', {
        title: 'What You Know About That?',
        status: 'I know all about that.',
        author: 'Quintin Sheridan'
    })
)

app.get('/help', (req, res) =>
    res.render('help', {
        title: 'Help Me Help Me?',
        status: 'Somebody Please.',
        author: 'Quintin Sheridan'
    })
)

app.get('/deeznuts', (req, res) => {
    console.log(req.query)
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
                 error: 'unable to complete request',
                 status: 400
        })
    }
    // geocode
    geocode.geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error) {
            return res.send({error})
        } else {
            console.log(lat, lon)
            //  get weatehr for the geocoded lat lon
            weather.getWeather(lat, lon, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        }
    });
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help Not Found',
        status: '404',
        author: 'Quintin Sheridan'
    })
})

app.get('*', (req, res) => {
    res.render('generic404', {
        title: 'Page Not Found',
        status: '404',
        author: 'Quintin Sheridan'
    })
})


// app.com/weather
app.get('/weather', (request, response) => {
    response.send({
        'location': 'here',
        'temp':60
    })
})


app.listen(3000, () => {
    console.log("server is up on port 3000.")
})