// *OpenWeatherMap JS file used to manipulate DOM and retrieve API information, as well as make use of JqueryUI selectable method for City List*

// defining variables outside of ajaxCall and other functions to avoid scope issues
let cityLocation;
let weatherID;
let mainWeather;
let weatherDescription;
let temp;
let city;
let date;
let humidity;
let working;
let time;
let event;
let url;
var images;


// City array list we will use and loop through in our for loop to create list items and assign data-names
let cityArray = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

$(document).ready(function() {
  // function generates list items from cityArray and assigns them a data-name attr. matching their name, then appends them to the page
  function generateList() {
    for (var i = 0; i < cityArray.length; i++) {
      let list = $('<li>');
      list.addClass('ui-widget-content');
      list.attr('data-name', cityArray[i]);
      list.text(cityArray[i]);
      $('#selectable').append(list);
    }

    // On click function for each list item, uses data-name to assign to variable cityLocation to use inside queryURL when ajaxCall function is called inside this on click
    $('.ui-widget-content').on('click', function() {
      cityLocation = $(this).attr('data-name');
      ajaxCallOWM();
      ajaxCall();
      $('.hide-link').show();
      $('#events-div').show();
      $('#weatherInfo').css("background-color", "rgba(180, 172, 172, 0.699)").addClass("shadow6 rounded");
      

      // returns siblings to original position so only current city is animated to the right... sometimes buggy if clicking through links too quickly
      $(this).siblings().css({ transform: 'translatex(0)', transition: 'transform 200ms' });

      // messing with Anime.js to offset selected city
      anime({
        targets: this,
        translateX: '70%',
        scale: 2,
        easing: 'easeOutSine'
      });

      
    });
  }

  $('#submit').on('click', function(event) {
   
    cityLocation = $('#search')
      .val()
      .trim();

    if( $('#search').val() !== "") {
      event.preventDefault();
      console.log(cityLocation);
      ajaxCallOWM();
      ajaxCall();
      $('.hide-link').show();
      $('#events-div').show();
      $('#weatherInfo').css("background-color", "rgba(180, 172, 172, 0.699)").addClass("shadow6 rounded");
      
    } else { }
   
  });

  // Used to utilize jqueryUI selectable function
  $(function() {
    $('#selectable').selectable();
  });

  // Used to call generateList to create list items and assign data-names on page load
  generateList();

  // Function in which our ajax call is defined accessing OpenWeatherMap API data based on cityLocation [wrapped in function to call inside on click function]
  function ajaxCallOWM() {
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityLocation + '&units=imperial&APPID=9082a48918ffcc2e91530e4ffabb6e1e';

    // AJAX call to retrieve API data
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(responseData) {
      console.log(responseData);
      let RD = responseData;

      weatherID = RD.weather[0].id;
      console.log(weatherID);

      //main weather condition
      mainWeather = RD.weather[0].main;
      console.log(mainWeather);

      //brief description of weather
      weatherDescription = RD.weather[0].description;
      console.log(weatherDescription);

      //humidity
      humidity = RD.main.humidity;
      console.log(humidity);

      //temperature (in Fahrenheit because of units parameter in queryURL "imperial")
      temp = Math.ceil(RD.main.temp);
      console.log(temp);

      //city
      city = RD.name;
      console.log(city);

      // Used to manipulate DOM with API information
      $('#cityName').text(city);
      $('#temperature').html('Temp: ' + "<span>" + temp + "</span>" + ' &#x2109'); // has to be .html to get degrees fahrenheit symbol to show
      $("#humidity").text("Humidity: " + humidity + "%");
      $('#description').html('Weather Description: ' + '<br>' + weatherDescription);

      if (temp > 65) {
        $('span').css("color", "red");
      } else if (temp < 65 && temp > 32) {
        $('span').css("color", "lightblue");
      } else {
        $('span').css("color", "blue");
      };

      // Variables to compare API weather ID "weatherID" to for icon img
      let rainyArray = [500, 501, 502, 503, 504];
      let drizzleArray = [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531];
      let snowyArray = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622, 511];
      let atmosphereArray = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
      let stormyArray = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
      let clearSky = 800;
      let fewClouds = 801;
      let scatClouds = 802;
      let heavyCloudArray = [803, 804];

      // for loops to loop through each array, and compare "weatherID" to number from each array, conditional statement in each for loop to change img url to icon matching "weatherID".

      // rainyArray for img "10d"
      for (var a = 0; a < rainyArray.length; a++) {
        if (weatherID == rainyArray[a]) {
          $('#img').attr('src', 'https://openweathermap.org/img/wn/10d@2x.png');
        }
      }
      // drizzleArray for img "09d"
      for (var b = 0; b < drizzleArray.length; b++) {
        if (weatherID == drizzleArray[b]) {
          $('#img').attr('src', 'https://openweathermap.org/img/wn/09d@2x.png');
        }
      }
      // snowyArray for img "13d"
      for (var c = 0; c < snowyArray.length; c++) {
        if (weatherID == snowyArray[c]) {
          $('#img').attr('src', 'https://openweathermap.org/img/wn/13d@2x.png');
        }
      }
      // atmosphereArray for img "50d"
      for (var d = 0; d < atmosphereArray.length; d++) {
        if (weatherID == atmosphereArray[d]) {
          $('#img').attr('src', 'https://openweathermap.org/img/wn/50d@2x.png');
        }
      }
      // stormyArray for img "11d"
      for (var e = 0; e < stormyArray.length; e++) {
        if (weatherID == stormyArray[e]) {
          $('#img').attr('src', 'https://openweathermap.org/img/wn/11d@2x.png');
        }
      }
      // heavyCloudArray for img "04d"
      for (var f = 0; f < heavyCloudArray.length; f++) {
        if (weatherID == heavyCloudArray[f]) {
          $('#img').attr('src', 'https://openweathermap.org/img/wn/04d@2x.png');
        }
      }

      // else if conditional statement for variables that are nto arrays, to change img url to icon matching "weatherID".

      // clearySky for img "01d"
      if (weatherID == clearSky) {
        $('#img').attr('src', 'https://openweathermap.org/img/wn/01d@2x.png');

        // fewClouds for img "02d"
      } else if (weatherID == fewClouds) {
        $('#img').attr('src', 'https://openweathermap.org/img/wn/02d@2x.png');

        // scatClouds for img "03d"
      } else if (weatherID == scatClouds) {
        $('#img').attr('src', 'https://openweathermap.org/img/wn/03d@2x.png');
      }

      //example of possible conditional statement we could make use of

      if (temp <= 50) {
        console.log('Dress warm!');
      } else if (temp >= 70) {
        console.log('Its nice out today!');
      }
    });
  }

  // Gordons ajax call combined with my logic file
  function ajaxCall() {
    let queryURL2 = 'https://app.ticketmaster.com/discovery/v2/events.json?city=' + cityLocation + '&apikey=ZU6tUNza7rOj3h1LboOtt2McTHU7RH91';

    $.ajax({
      type: 'GET',
      url: queryURL2
    }).then(function(response) {
      console.log(queryURL2);
      let r = response;

      date = r._embedded.events[0].dates.start.localDate;
      console.log(date);

      time = r._embedded.events[0].dates.start.localTime;
      console.log(time);

      event = r._embedded.events[0].name;
      console.log(event);

        if( event = r._embedded.events[0].name ) {
           working = true;
           console.log("working = true")
        } else {
          working = false;
          console.log("working = false")
        }

      url = r._embedded.events[0].url;
      console.log(url);

      images = r._embedded.events[0].images[0].url;
      console.log(images);

      date1 = r._embedded.events[7].dates.start.localDate;
      console.log(date1);

      time1 = r._embedded.events[7].dates.start.localTime;
      console.log(time1);

      event1 = r._embedded.events[7].name;
      console.log(event1);

      url1 = r._embedded.events[7].url;
      console.log(url1);

      images1 = r._embedded.events[7].images[0].url;
      console.log(images1);

      date2 = r._embedded.events[4].dates.start.localDate;
      console.log(date2);

      time2 = r._embedded.events[4].dates.start.localTime;
      console.log(time2);

      event2 = r._embedded.events[4].name;
      console.log(event2);

      url2 = r._embedded.events[4].url;
      console.log(url2);

      images2 = r._embedded.events[4].images[0].url;
      console.log(images2);

      date3 = r._embedded.events[11].dates.start.localDate;
      console.log(date3);

      time3 = r._embedded.events[11].dates.start.localTime;
      console.log(time3);

      event3 = r._embedded.events[11].name;
      console.log(event3);

      url3 = r._embedded.events[11].url;
      console.log(url3);

      images3 = r._embedded.events[11].images[0].url;
      console.log(images3);

      date4 = r._embedded.events[9].dates.start.localDate;
      console.log(date4);

      time4 = r._embedded.events[9].dates.start.localTime;
      console.log(time4);

      event4 = r._embedded.events[9].name;
      console.log(event4);

      url4 = r._embedded.events[9].url;
      console.log(url4);

      images4 = r._embedded.events[9].images[0].url;
      console.log(images4);

      date5 = r._embedded.events[16].dates.start.localDate;
      console.log(date5);

      time5 = r._embedded.events[16].dates.start.localTime;
      console.log(time5);

      event5 = r._embedded.events[16].name;
      console.log(event5);

      url5 = r._embedded.events[16].url;
      console.log(url5);

      images5 = r._embedded.events[16].images[0].url;
      console.log(images5);

      $('#title1').text('Event: ' + event);

      $('#title2').text('Event: ' + event1);

      $('#title3').text('Event: ' + event2);

      $('#title4').text('Event: ' + event3);

      $('#title5').text('Event: ' + event4);

      $('#title6').text('Event: ' + event5);

      $('#date1').text('Date: ' + date);

      $('#date2').text('Date: ' + date1);

      $('#date3').text('Date: ' + date2);

      $('#date4').text('Date: ' + date3);

      $('#date5').text('Date: ' + date4);

      $('#date6').text('Date: ' + date5);

      $('#time1').text('Time: ' + time);

      $('#time2').text('Time: ' + time1);

      $('#time3').text('Time: ' + time2);

      $('#time4').text('Time: ' + time3);

      $('#time5').text('Time: ' + time4);

      $('#time6').text('Time: ' + time5);

      $('#a1').attr({ href: url, target: '_blank' });

      $('#a2').attr({ href: url1, target: '_blank' });

      $('#a3').attr({ href: url2, target: '_blank' });

      $('#a4').attr({ href: url3, target: '_blank' });

      $('#a5').attr({ href: url4, target: '_blank' });

      $('#a6').attr({ href: url5, target: '_blank' });

      $('#location1').text('Location: ' + cityLocation);

      $('#location2').text('Location: ' + cityLocation);

      $('#location3').text('Location: ' + cityLocation);

      $('#location4').text('Location: ' + cityLocation);

      $('#location5').text('Location: ' + cityLocation);

      $('#location6').text('Location: ' + cityLocation);

      $('#img1').attr('src', images);

      $('#img2').attr('src', images1);

      $('#img3').attr('src', images2);

      $('#img4').attr('src', images3);

      $('#img5').attr('src', images4);

      $('#img6').attr('src', images5);

      if( events === undefined ) {
        $("#events-div").text("<h4>" + "No Events found, try searching the next closest large city" + "<h4>");
        console.log("events undefined")
      } else {
        console.log("event load successful")
      };
    });
  }
});
