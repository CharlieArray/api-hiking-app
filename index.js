
function displayResults(data){
    
    //Clears out previous results when user makes new search
    $('#results-section').empty();


    let cityValue= $("#input-city").val();
    let stateValue= $("#input-state").val();
    sortValue= $("input[name=sort]:checked").val();

    $('#results-section').removeClass('hidden');

    //console.log("displayResults function initiated");
    //console.log(data);

    dataOutput = [];

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
                <button type="button" name="widget-button" id="${data.trails[i].id}">See Trail Map 🧭</button>
                <br><br>
            </div>
            ` 
            );
            }
        };


    //Append hiking data results to App HTML
    $('#results-section').append(`<h3>Results for ${cityValue}, ${stateValue}🏕️:<br>${dataOutput.length} total hiking trails found</h3>`);

    $('#results-section').append(dataOutput);


    //Unhides footer nav at bottom of page
    $('.app-header-outer').removeClass("hidden");

    //Event Listener Function for button click on widget-button
    watchForTrailWidget();

}

//Formating function to get parameters in proper format for fetch request 
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }



//Function to get data from Hiking Project API
function getResultsHike(geoCodeData, searchValue, sortValue){
    //console.log("getResultsHike function initiated");

    //console.log(geoCodeData);

    //Define variables
    var latitude = geoCodeData.results[0].geometry.location.lat;
    var longitude = geoCodeData.results[0].geometry.location.lng;
    searchValue= $("#search-distance").val();
    sortValue= $("input[name=sort]:checked").val();


  /*FUNCTION NOT CURRENTLY NECESSARY, DO NOT REMOVE */
    function mapConversion(){
    // Formula to convert lat long to mercator for widget app
    //let xValue = longitude * 20037508.34 / 180;
    //let yValue = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);
    //yValue = yValue * 20037508.34 / 180;
    //console.log(xValue);
    //console.log(yValue);
    }
      /*FUNCTION NOT CURRENTLY NECESSARY, DO NOT REMOVE */
        function getWidgetData(xValue,yValue){
        //console.log("getWidgetData function initated")
        //console.log(latitude);
        //console.log(longitude);
    }
        
    //Hiking Project API URL and apiKey
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
    //console.log("getResultsGeoCode function initiated")

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


function displayWidget(targetWidgetID){
    $(".widget").removeClass('hidden');
    $("#trail-search").addClass('hidden');
    $(".results-section").addClass('hidden');
    $(".app-header-outer").addClass('hidden');
    $('#widget-map').empty();

    var mq = window.matchMedia( "(max-width: 600px)" );
        if (mq.matches) {
            // window width is less than 600px
            $('#widget-map').append(
                `<iframe style="width:100%; max-width:569px; max-height:310px; height:310px; flex-direction: row;" frameborder="0" scrolling="no" 
                src="https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=${targetWidgetID}&x=-10880707&y=3537936&z=6"></iframe>`
                );    
        }
        else {
            // window width is greater than 600px
            $('#widget-map').append(
                `<iframe style="width:100%; max-width:610px; max-height:410px; height:950px; flex-direction: row;" frameborder="0" scrolling="no" 
                src="https://www.hikingproject.com/widget?v=3&map=1&type=trail&id=${targetWidgetID}&x=-10880707&y=3537936&z=6"></iframe>`
                );    
        }

    watchForOtherTrails();
}


// Hides Widget Map and Unhides other HTML sections
function watchForOtherTrails(){
    $('#other-trails-button').on('click', event=>{
        event.preventDefault();
        $(".widget").addClass('hidden');
        $("#trail-search").removeClass('hidden');
        $(".results-section").removeClass('hidden');
        $(".app-header-outer").removeClass('hidden');
    });
}

//Event Listener Function for "See Trail Map" 
function watchForTrailWidget(){
    //console.log("watchTrail function ran");
    $("button[name = 'widget-button']").on('click', event=>{
        event.preventDefault();
        //console.log("map widget clicked");
        let targetWidgetID = $(event.target).attr("id")
        displayWidget(targetWidgetID);
    });
}


// Function to ensure input form submitted correctly
function formValidate(cityValue,stateValue){
    if(cityValue == "" || stateValue == ""){
    alertBanner();
    }
}


function alertBanner(){
    $('form').addClass('hidden');
    $('#trail-search').append(`
        <div id="dialog" style="text-align: center;" title="Input Form Information">
        <p>Oops! Please fill out the City and State to Search📝</p>
        <button type="button" id="alert-button">Okay 🍃
        </button><br><br>
        </div>
        `)
}

// Event Listener function for Alert Banner
function watchAlertBanner(){
    $('#alert-button').on('click', event=>{
        event.preventDefault();
        $('form').removeClass('hidden');
        $('#dialog').remove();
    });
}

// Event Listener function for Submit Button
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
        formValidate(cityValue,stateValue);
        watchAlertBanner();
        getResultsGeoCode(cityValue,stateValue);
        getResultsHike(sortValue,searchValue);
    });
}

watchForm();

