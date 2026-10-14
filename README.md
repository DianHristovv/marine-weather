# Marine Weather

Live sea conditions and a wave forecast for ports on the Bulgarian Black Sea coast. Built by a navigation student, for quickly checking the sea before going out.

**Live demo:** https://dianhristovv.github.io/marine-weather/

## Features

- **Choose a port**: Varna, Balchik, Burgas or Sozopol, from a dropdown
- **Current conditions**: wave height, sea temperature, and wind speed in knots
- **Wind direction as a compass point**, the way a navigator reads it: "12 kn from SSW (210°)"
- **Wave forecast** for the day, every 3 hours, in local time
- **Sea warning**: green when the sea is calm, orange with the times when waves go over 1 m
- **Error handling**: a clear message instead of an endless "loading..." if the data can't be loaded
- **Mobile-friendly design** with cards that rearrange on small screens

## Built with

- HTML
- CSS (Flexbox, responsive layout)
- JavaScript (no frameworks or libraries)
- [Open-Meteo](https://open-meteo.com/) Marine and Weather APIs

## What I learned

This was my first project working with data from the internet. While building it, I learned:

- Getting live data from an API with `fetch`, `async` and `await`
- Reading nested JSON data and checking units and time zones
- Handling errors with `try / catch`
- Turning wind degrees into compass points with an array, `Math.round` and `%`
- Working with parallel arrays, then reshaping them into objects with `map`
- Finding rough-sea hours with `filter`, and building text with `join`
- Storing ports as objects and building the dropdown from data
- Building API addresses from the chosen port's coordinates
- Flexbox, responsive layouts and state classes switched by JavaScript

## How it works

1. Pick a port from the dropdown
2. The app requests that port's data from two Open-Meteo APIs
3. Current conditions, the forecast and the sea warning update on the page

## Ideas for the future

- More ports, or the user's own position
- Wind forecast next to the wave forecast
- A multi-day forecast

## Credits

Weather and marine data by [Open-Meteo.com](https://open-meteo.com/), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
