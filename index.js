


/*  Widget calculation feature
var degrees2meters = function(lon,lat) {
    var x = lon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return [x, y]
}

x= -97.74306
y = 30.26715

console.log(degrees2meters(x,y))

// should result in: -10880707.67, 3537935.91
*/



function displayResults(data){
    console.log("displayResults function initiated")
    console.log(data)

    $('#results-section').removeClass('hidden');


    //for loop through trails object
    //dataOutput = [];

    //dataOutput.push()
    //push individuals items to app



   $('#results-section').append(


    
   )

}

//formating function to get parameters in proper format for fetch request 
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


//function to get data from Hiking Project API
function getResultsHike(geoCodeData, searchValue, sortValue){

    console.log("getResultsHike function initiated")

    let latitude = geoCodeData.results[0].geometry.location.lat

    let longitude = geoCodeData.results[0].geometry.location.lng

    console.log(latitude + " latitude")
    console.log(longitude + " longitude")


    baseURL= 'https://www.hikingproject.com/data/get-trails'
    apiKey= '200958935-abaae354b1d3cf74fb6a5086bfdc19c6'
   
     const params = {
      maxDistance: searchValue,
      sort: sortValue,
      lat: latitude,
      lon: longitude,
      key: apiKey
      };
  
    const queryString = formatQueryParams(params)
    const stringedURL = baseURL + '?' + queryString;

    fetch(stringedURL)
        .then(response => response.json())
        .then(data=> displayResults(data))
        .catch(console.error)

}

//Function to retrieve lat/long data from Google Geocode API
function getResultsGeoCode(cityValue, stateValue){
    console.log("getResultsGeoCode function initiated")

    baseURL= 'https://maps.googleapis.com/maps/api/geocode/json'

    apiKey= 'AIzaSyBHvASiW7Gdca_1RwhnK06222HwxxHhh4E'

    const params = {
        address: cityValue+","+stateValue,
        key: apiKey
    };

    const queryString = formatQueryParams(params)
    const stringedURL = baseURL + '?' + queryString;

    fetch(stringedURL)
        .then(response => response.json())
        .then(geoCodeData=> getResultsHike(geoCodeData))
        .catch(console.error)
}


function watchForm(){
    $('#submit-button').on('click', event=>{
    event.preventDefault();
    //declaring form input values
        //city input value
        let cityValue= $("#input-city").val();
        //state input value
        let stateValue= $("#input-state").val();
        //search distance parameter(miles) 
        let searchValue= $("#search-distance").val();
        //sort search option(distance or rating)
        let sortValue= $("input[name=sort]:checked").val();

    console.log("Watch Form function initiated");

    getResultsGeoCode(cityValue,stateValue);

    getResultsHike(sortValue,searchValue);
    });
}

watchForm();

