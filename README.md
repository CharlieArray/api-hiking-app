# api-hiking-app

## Summary: 
The Trail Finder hiking app allows users to retrieve hiking trail data based on a city/state search, and view a detailed map of the trail. 

### Link to view App:
https://charliearray.github.io/api-hiking-app/

### Technical Summary: 
This is an asynchronous web app that makes GET data requests to two API's and appends the results into the HTML using jQuery. 
### The API's used are: 
1. **Google Geocode API** - converts city/state data into a lat/long geographic coordinate position.

- [Google Geocode API](https://developers.google.com/maps/documentation/geocoding/overview)

2. **Hiking Project API** - lat/long data is used as a query parameter to find locations in proximity to lat/long position.

- [Hiking Project API](https://www.hikingproject.com/data)

### Tech Stack Used: 
JavaScript/jQuery/HTML/CSS

### Future Updates: 
1. Implement an Autocomplete feature in the City/State input form for faster searches and avoid location misspelling
   Possible API > Google API: Autocomplete for Addresses and Search Terms
2. Implement more robust image results of various locations.

![GitHub Logo](/images/trail-overview.JPG)

![GitHub Logo](/images/results-overview.JPG)

![GitHub Logo](/images/map-overview.JPG)


