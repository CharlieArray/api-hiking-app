
function displayResults(data){
    
    //Clears out previous results when user makes new search
    $('#results-section').empty();

    let cityValue= $("#input-city").val();
    let stateValue= $("#input-state").val();
    sortValue= $("input[name=sort]:checked").val();

    $('#results-section').removeClass('hidden');

    console.log("displayResults function initiated");

    console.log(data);

    dataOutput = [];
    dataOutputNoPics = [] 

    //for loop through data object to get properties of trail and push to HTML
    for (let i = 0; i < data.trails.length; i++){
        //if statement to prevent pushing data with no trail photo or very short trails
        if(data.trails[i].imgSmallMed.length !== 0 && data.trails[i].length > 0.3){
            dataOutput.push(
            `  <div class="results-hiking-element">
                <b>Trail Name</b>: ${data.trails[i].name}<br>
                <img src=${data.trails[i].imgSmallMed} alt="Trail-Photo"><br>
                <b>Summary</b>📜: ${data.trails[i].summary}<br>
                <b>Trail Elevation</b>⛰️: ${data.trails[i].ascent} ft <br>
                <b>Trail Length</b>⏳: ${data.trails[i].length} miles <br>
                <b>Location</b>📍: ${data.trails[i].location}<br>
                <b>Rating</b>⭐⭐⭐: ${data.trails[i].stars} stars<br>
                <button type="button" id="widget-button">See Trail Map 🧭</button>
                <span class="trail-id hidden">${data.trails[i].id}</span>
                <br><br>
            </div>
            ` 
            );
            }
        };

    //Append hiking data results to App HTML
    $('#results-section').append(`<h3>Results for ${cityValue},${stateValue}🏕️:<br>${dataOutput.length} total hiking trails found</h3>`);

    $('#results-section').append(dataOutput);

    //Event Listner Function for button click on widget-button
    watchForTrailWidget();

}

//formating function to get parameters in proper format for fetch request 
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }


//Function for Hiking Widget
function getWidgetData(xValue, yValue){
    console.log(xValue);
    console.log(yValue);  
}


//Function to get data from Hiking Project API
function getResultsHike(geoCodeData, searchValue, sortValue){
    console.log("getResultsHike function initiated");

    //Define variables
    let latitude = geoCodeData.results[0].geometry.location.lat;
    let longitude = geoCodeData.results[0].geometry.location.lng;
    searchValue= $("#search-distance").val();
    sortValue= $("input[name=sort]:checked").val();

    console.log(latitude + " latitude")
    console.log(longitude + " longitude")

    // Formula to convert lat long to mercator for widget app
    let xValue = longitude * 20037508.34 / 180;
    let yValue = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
    yValue = yValue * 20037508.34 / 180;
    console.log(xValue);
    console.log(yValue);


    function getWidgetData(xValue,yValue){
        console.log("getWidgetData function initated")
        console.log(latitude);
        console.log(longitude);  
        }
        
        getWidgetData(xValue, yValue);

    baseURL= 'https://www.hikingproject.com/data/get-trails'
    apiKey= '200958935-abaae354b1d3cf74fb6a5086bfdc19c6'
   
     const params = {
      maxDistance: searchValue,
      maxResults: 20,
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


function watchForTrailWidget(){
    console.log("watchTrail function ran")
    $('#widget-button').on('click', event=>{
        event.preventDefault();
        console.log("map widget clicked");
    });
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

    getWidgetData(xValue, yValue)

    });
}

watchForm();

