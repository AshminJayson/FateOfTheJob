# FateOfTheJob

📜 Extracts data from your resume and lets OPEN AI 🤖 decide your fate

## About

FateOfTheJob is a Next.js application with a backend in FastAPI. It provides a chatbot interface that extracts data from your resume and uses an OpenAI model to determine your suggested job role.

## Running the Application

To run the application, follow the steps below:

Step 1 : Start the backend server

```shell
cd /backend
#/fateofthejob/backend

#Install pip packages
pip install -r requirements.txt

#For development
uvicorn main:app --reload --port=8000

#For testing/production
uvicorn main:app --host 0.0.0.0 --port=8000
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

The Next.js application can be accessed at `http://localhost:3000`.

## Components

### ChatDrawer

This component creates a drawer that contains the Chatbox component. It allows the user to open and close the chat interface by clicking on a button.

### ChatBox

The ChatBox component represents the chat interface where the user can interact with the chatbot. It displays a list of messages exchanged between the user and the bot. Users can enter their messages in an input field and send them to the bot. The component handles sending and receiving messages and updates the message list accordingly. It also displays a typing indicator when the bot is typing a response.

### FileUpload

The FileUpload component allows the user to upload a PDF file. It provides a drag-and-drop area for file selection. When a PDF file is dropped or selected, the component sends a request to the server to process the file. The server analyzes the file and returns a suggested job role based on its contents. The suggested job role is displayed below the file upload area.

## Usage

To use FateOfTheJob, follow the installation steps mentioned above. Once the application is running, open it in your web browser. You will see the chat interface where you can interact with the chatbot. You can upload your resume in PDF format and receive a suggested job role based on its contents.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/AshminJayson/FateOfTheJob).
