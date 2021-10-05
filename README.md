# Restful API with Node.js Express and mysql
To run in localhost,

### npm start
or
### node app.js


#### GET  /movie/all/{limit}    
    Get movie title list with given limit.

#### GET  /movie/{id}    
    Get a movie details with given id.

#### GET  /movie/search/{word}
    Search movies and get results
    
#### GET  /movie/imdb/{rating}    
    Get all movies higher than given imdb rating.


#### Configure the Backend
    Clone the backend from Github.
    Open the command line or terminal and execute the below command.
    $ git clone https://github.com/project3ucsc/backend.gi
    
#### Open backend folder
    $ cd backend
    
#### install dependencies 
    $ npm install
    
#### Create a database named knowledge_hub in your MySQL server

#### Need to set an environment variable named DATABASE_URL.
#### Edit the .env file according to the below instructions.
    DATABASE_URL = 'mysql://root:@localhost:3306/knowledge_hub'
    


