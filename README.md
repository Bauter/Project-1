# Project-1 - WENT (forked)

This is project one, with Hue (pprchang), Bryan (Bauter) and I (GordonConness) being the collaborators.

### NOTE ###

This is my FORKED repo of project-1 - Went. I have gone on to play with the styling and expand upon the logic (to avoid changes to the original repo).

## What is this repo?

This Repo is for UWM web-dev. boot-camp Project-1, its is a collaborated project between Gordon, Hue, and Bryan.

-Its purpose was to create a website with a team, dividing responsibilities while working together to achieve the overall goal. Practicing what it means to work with a team of other developers.

### Link to Live-pages (forked) ###

https://bauter.github.io/Project-1/

### Link to Project-1 Live-pages (original) ###

https://gordonconness.github.io/Project-1/

## Project Requirements

-Use at least two APIs.
-Use AJAX to pull data.
-Use at least one new library or technology that hasn't been discussed.
-Create a polished front end/UI.
-Meet good quality coding standards.
-Do NOT use alerts, confirms, or prompts.
-Incorporate some sort of repeating element.
-Use Bootstrap or an alternative CSS framework.
-Deploy your site to GitHub Pages.
-Include user input validation.

## How was this project created?

-Coding was done using Visual Studio Code ("https://code.visualstudio.com/") a text editor can be downloaded from their website.

-The styling for this project was done using CSS and Bootstrap ("https://getbootstrap.com/").

-Bootstrap was linked via CDN inside the 'head' tags within an opening script tag, Bootstrap conveniently offers these links on there side and are ready to be copied and pasted into the html file.

-Local CSS file created and used to style. Linked in between 'head' tags and within an opening 'script' tag, the file path relative to the html file, and closed by a closing script tag.

-assets folder created to hold CSS code, JS code, and images.

### Libraries

-Anime.js was used to animate the top city list. For further information please see (https://animejs.com/).

-JqueryUI was used to make the city list elements "selectable". For further information please see (https://jqueryui.com/).

### API's

#### OpenWeatherMap

Api available at (https://home.openweathermap.org/). Create a free account to receive and API key for use.

-Please read API documentation for further explanation of what APIs are available and how to use/work with them.

#### Ticket Master

Api available at (https://developer.ticketmaster.com/). Create a free account to receive and API key for use.

-Please read API documentation for further explanation of what APIs are available and how to use/work with them.

### Jquery/Javascript

In Javascript We make use of a for loop to develop a city list to the dom from the cityArray.

##### Two onClicks

-There is an on click for each city 'li' item by class, that assigns the variable cityLocation the data-name assigned to each city inside the for-loop. Once cityLocation is defined the 2 AJAX functions are called.

-The next onClick is for the submit button to search a city based on the inputted location. Inside the onClick, cityLocation is defined from the input fields value, and then both AJAX functions are called.

The anime function is used to animate the city li over to the right when selected. This is done by changing the x-position. When a city is selected, its' siblings are reverted back to the original position.

The selectable method is used to make the 'ul' list with id "selectable" select a specific city by applying and removing classes (ex. bg-color, text-color, font-size).

##### Each AJAX call

-Uses the .then() method after the AJAX call to utilize the response-data and decide what to do with it.

###### Inside each then block

-variables are assigned different data by path from the response. These variables are then used via DOM manipulation to display them to the page in a variety of different ways. (ex. use .text() to display text, use .attr() to assign specific src/urls, and .html() to create html elements.)

-Some conditional statements are used to determine which data to use and how (ex. comparing weather ID code to determine which weather icon to display).

#### Guidelines for Collaboration

Any advice and comments for this project are appreciated. All pull requests will require approval. Again, this project was created for UWM Web dev. boot-camp as a learning experience for working in groups to create a collaborative project.
