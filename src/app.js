const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('../public/js/geocode')
const forecast = require('../public/js/forecast')

// console.log(__dirname)
// console.log(__filename)

const app = express()

//Define path for express config
const PubDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const PartialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(PartialPath)

//Setup static directory to serve
app.use(express.static(PubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        Name: 'Rana Gorakh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        Name: 'Rana Gorakh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help text',
        Name: 'Rana Gorakh'
    })
})

app.get('/puzzle', (req, res) => {
    res.send({
        hi: "you are on localhost 1012 and client site js"
    })
})
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    geocode(req.query.address, (error, { Latitude, Longitude, location }) => {
        if (error) {
            return res.send((error))
        }
        forecast({ long: Longitude, lat: Longitude }, (error, ForecastData) => {
            if (error) {

                return res.send({ error })
            }
            res.send({
                ForecastData: ForecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send('404', {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        Name: 'Rana Gorakh',
        errorMessage: 'You Cross your limit, Please Cheack URL After Help.'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        Name: 'Rana Gorakh',
        errorMessage: 'You Cross your limit, Please Cheack URL After About.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        Name: 'Rana Gorakh',
        errorMessage: 'You Cross your limit, Please Enter Valid URL.'
    })
})

app.listen(1012, () => {
    console.log('Server is up on port 1012')
})