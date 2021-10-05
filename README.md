 # KnowledgeHub
 
 ## Group Number - 53
 
 ## Group Members 
 
 #####   18000738      L.D.L.S.Jayasinghe
 #####   18000614      R.M.D.S.Harischandra
 #####   18001513      G.R.N.Sankalani
 #####   18020712      P.R.S.T.Sandeepani
 #####   18020722      G.T.S .Sathindra


## Configure the Backend

 ### Step 01
   #### Clone the backend from Github.
   #### Open the command line or terminal and execute the below command.
    $ git clone https://github.com/project3ucsc/backend.git
    
  ### Step 02  
   #### Open backend folder
    $ cd backend
    
  ### Step 03 
   #### Install dependencies 
    $ npm install
  
  ### Step 04
   #### Create a database named knowledge_hub in your MySQL server

  ### Step 05
   #### Need to set an environment variable named DATABASE_URL.
   #### Edit the .env file according to the below instructions.
   
    DATABASE_URL = 'mysql://root:@localhost:3306/knowledge_hub'
    
  ### Step 06
   #### To create tables and relations in the database and generate Prisma client
    $ npx prisma migrate dev --name init
   
  ### Step 07
   #### To enter initial data into the database
    $ node prisma/seed.js
  
  ### Step 08
   #### Then to run backend server
    $ npm start


