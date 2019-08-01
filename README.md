# GoInspire -
##### A Product to Inspire People to travel by feeding content about a place on one single platform.
----

## Installation Instructions -
### A step by step instructions to run the project.
* ##### Clone the repository.
* ##### Do `npm install`
* ##### Do `npm start`
* ##### Go to `localhost:3000/?city=Bangalore`


## Prerequisites for Devlopment Setup -
* ##### Mongo Setup
* ##### CRA react 

## Structure of Project and Files -

    Server Side Tech Stack:
     * NodeJs - Express
     * GraphQL
     * Mongoose
     
     Client Side Tech Stack:
      * ReactJS
      * React-Apollo
      

 ##### Modules are categorised into three main parts:
###### 1. Story - Feed
###### 2. Video - Feed
###### 3. News - Feed




#### Server Code :
    -App.js
        * Express server and Graphql setup
    -db.js
        * Mongoose Setup
    -models/story.js
        * Schema for Story and SubStory Model.
    -schema/schema.js
        *Schema for GraphQL having Resolvers and Queries.
        *Schema has StoryType,SubStoryType,YoutubeType and NewsType to define the GraphQL schema of all this.
        *There are 4 Resolvers then
            1.StoryFeed - Get Story for given tag [Return : Story]
            2.allStories - Get all Stories present in DB. [Return : Story]
            3.VideoFeed - Get dynamic Videos for given Tags from API's. [Return : title,tag,videoId and link]
            4.NewsFeed - Get Live News for given query. [Return: News Params]
            (* All Queries have limits as optional param)
            
            

#### Client Side Code:
 ###### This has two parts - Content Dasboard and main App.
 
 
    -App.js
        * Renders 2 components DashBoard and SearchBar.
        * SearchBar Component:
            1.Gets all the tags present in DB from react-apollo-graphql and reders that.
            2.Renders MainComponent which takes selected city as prop and renders StoryFeed , VideoFeed and NewsFeed by getting data from graphql apis for the city.
            3.StoryFeed and VideoFeed internally uses components to display.
            4.Content Dashboard fetch data(image) from api and store selected images in the DB using GraphQL mutation.





