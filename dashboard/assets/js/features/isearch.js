import LatLon from 'https://cdn.jsdelivr.net/npm/geodesy@2.2.1/latlon-spherical.min.js';

// ISearch by location
var myVar;
var iSearchResult;
var iSearchResultNo;
function LocationResults() { //Function to render Search Result
    iSearchResult="";
    myVar = setTimeout(function(){ 
        if (locationuser == null || locationuser == undefined || locationuser ==""){
            iSearchResult+= 
            `<h3>Oops, No User found near you. Try searching by typing location above.</h3>`
            document.getElementById("iSearch-result").innerHTML = `${iSearchResult}`;
        }
        else {
            if (locationuser.length === 1) {
                iSearchResultNo= 
            `<h3>${locationuser.length} User Found</h3>`
            } else {
                iSearchResultNo= 
                `<h3>${locationuser.length} Users Found</h3>`
            }
            document.getElementById("iSearch-result").innerHTML = `${iSearchResultNo}`;
            for( let i=0; i<locationuser.length; i++) {
                if(locationuser[i]!=null || locationuser[i]!=undefined )
                {   
                    iSearchResult+= `
                    <div class="iSearchResults"> 
                        <div class="iSearchInfo">
                            <img src= "${locationuser[i].img}">
                        </div>
                        <div class="iSearch-container">
                            <h2>${locationuser[i].fullName}</h2><br>
                            <p>${locationuser[i].location}</p>
                            <p>${(locationuser[i].distance/1000)} km Away</p>
                        </div>
                        <button class="btn pos">View Profile</button> &nbsp; <button onclick="newChats(this)" data-localname="${locationuser[i].userName}" class="btn">Message</button>
                    </div>
                    `;
                }
            }
            document.getElementById("iSearch-result").innerHTML += `${iSearchResult}`;
        }
        
     }, 5000);
    
}

var locationuser = [];
const searchGeo = document.getElementById("isearch-geolocation");
searchGeo.addEventListener("click", function() {
    locationuser = [];
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sortResults, errorMessage);
        swal("Allow Location Access to Find Nearby", {
            buttons: false,
            timer: 3000,
          });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
    
})

var users = getUsers();
function sortResults(position) {
    // Grab current position
    var latlon = new LatLon(position.coords.latitude, position.coords.longitude);
    for (let i=0; i<users.length; i++) {
        var ilocation = users[i].latlong;
        var distance = latlon.distanceTo(new LatLon(Number(ilocation[0]),Number(ilocation[1])));
        var newDistance = parseInt(distance)
        if (distance < 200000) {
            locationuser[locationuser.length] = 
    {   "img" : users[i].img,
        "fullName" : users[i].fullName,
       "location" : users[i].location, 
       "latlong" : users[i].latlong,
       "userName": users[i].userName,
       "distance" : newDistance
     };
    }
    }
    locationuser.sort(function(a,b){
      var locA  = a.latlong;
      var locB  = b.latlong;                                                                 
      var distA = latlon.distanceTo(new LatLon(Number(locA[0]),Number(locA[1])));
      var distB = latlon.distanceTo(new LatLon(Number(locB[0]),Number(locB[1])));
      return distA - distB;
    });
    
    //Reorder the list
    document.getElementById("iSearch-result").innerHTML = `<img src="../../../../assets/img/isearch-loader.gif"><h3>Searching for users near you....</h3>`
    LocationResults()
 
};

function errorMessage(error) {
    if(error.code == 1) {
        swal("You denied Location Access", "Allow Location Access to Find Nearby Users", {
            buttons: false,
            timer: 5000,
            icon: "error",
          });
    } else if(error.code == 2) {
        alert("The network is down or the positioning service can't be reached.");
    } else if(error.code == 3) {
        alert("The attempt timed out before it could get the location data.");
    } else {
        alert("Geolocation failed due to unknown error.");
    }
}
//iSearch by keyword

function SearchResult() { //Function to render Search Result
    iSearchResult="";
    for( let i=0; i<Fusers.length; i++) {
        if(Fusers[i]!=null || Fusers[i]!=undefined )
        {
            iSearchResult+= `
            <div class="iSearchResults"> 
                <div class="iSearchInfo">
                    <img src= "${Fusers[i].img}">
                </div>
                <div class="iSearch-container">
                    <h2>${Fusers[i].fullName}</h2><br>
                    <p>${Fusers[i].location}</p>
                </div>
                <button class="btn pos">View Profile</button> &nbsp; <button onclick="newChat(this)" data-username="${Fusers[i].userName}" class="btn">Message</button>
            </div>
            `;
        }
    }
    document.getElementById("iSearch-result").innerHTML += `${iSearchResult}`;
}
var Fusers = [];
var foundLocation="";
var timeOut;
var searchForm = document.getElementById("iSearch-form")
searchForm.addEventListener("submit", function () {
    event.preventDefault();
    document.getElementById("iSearch-result").innerHTML = `<img src="../../../../assets/img/isearch-loader.gif"><h3>Searching for users...</h3>`
    timeOut = setTimeout(function() { 
    iSearchResultNo ="";
    iSearchResult="";
    foundLocation = (document.getElementById("iSearchInput").value).toLowerCase();
    Fusers = users.filter(x=>x.location.toLowerCase().includes(foundLocation));
        if (Fusers == null || Fusers == undefined || Fusers ==""){
            iSearchResult+= 
            `<h3>No User Found in ${foundLocation}`
            document.getElementById("iSearch-result").innerHTML = `${iSearchResult}`;
        }
        else {
            if (Fusers.length === 1) {
                iSearchResultNo+= 
            `<h3>${Fusers.length} User Found`
            } else {
                iSearchResultNo+= 
                `<h3>${Fusers.length} Users Found`
            }
            document.getElementById("iSearch-result").innerHTML = `${iSearchResultNo}`;
            SearchResult()
        }
     }, 5000);
})


