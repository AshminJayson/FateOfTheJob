from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from env import Settings
from services import gptServices

settings = Settings()
app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gptClient = gptServices.GPT(settings.OPENAI_API_KEY)

@app.get("/")
async def root():
    return {"message": "Hello There!"}

@app.post("/api/chat")
async def chatBot(message):
    #print('Chat route hit')
    botReply = gptClient.talkToBot(message)
    return {"message": botReply}


@app.post("/api/files")
async def postfile(file: UploadFile = File(...)):
    # print('Extraction route hit')
    pdf = PdfReader(file.file)
    extractedText : str = ""
    
    for page_num in range(len(pdf.pages)):
        page = pdf.pages[page_num]    
        extractedText += page.extract_text()

    chatCompletion = gptClient.getJobSuggestion("Suggest a job role in one word for the skills and experience given without any other wordings\n" + extractedText)
    # print(chatCompletion)
    return {"message": chatCompletion }