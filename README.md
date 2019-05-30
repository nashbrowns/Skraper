# Skraper

## What is Skraper?

Skraper uses Cheerio to scrape data from several event websites, then adds that data to a mongodb database. The data and html is then passed client side and displayed dynamically using handlebars. Only events occuring that day or in the future are displayed. 

## Scraping new data

![Skrape Icon](https://i.imgur.com/C9yGs8c.png) 

Clicking this icon on the navbar will issue the command to begin skraping new data. After skraping, the page will reload, and display any new events that were found. 

New data will not be added everytime, as skraper only grabs data from the first page of any event sites it's scraping from currently.

## Event cards
![Skrape Card](https://i.imgur.com/4FgS9au.png) 

For every event (as long as it is occuring today or in the future), a card is dynamically created and added to the Skraper home page. Each card has buttons that open a new tab with the original source of the event, or take you to the comment page for that particular event. 

## Commenting on Events

![Skrape Comment](https://i.imgur.com/h1eeeOw.png) 

Anybody can leave a comment on an event, and unfortunately, anybody can also delete those comments in the current iteration of skraper.

Check out the hosted page here -> skraper.herokuapp.com


