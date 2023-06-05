## Running the application

Step 1 : Start the backend server

```shell
cd /backend
#/fateofthejob/backend
uvicorn main:app --reload --port=8000
#The server is be exposed on localhost:8000
```

Step 2 : Run the next js application

```shell
#/fateofthejob
#Install necessary node modules
npm install
npm run dev
#The next js application can be accessed on localhost:3000
```
