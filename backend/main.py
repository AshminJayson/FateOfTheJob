from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader

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


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/api/files")
async def postfile(file: UploadFile = File(...)):
    pdf = PdfReader(file.file)
    text = ""
    
    for page_num in range(len(pdf.pages)):
        page = pdf.pages[page_num]    
        text += page.extract_text()

    print(text)
    return {"message": "heyy"}