#create a copy of this file and name it as env.py and add the private keys

from pydantic import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str = "ADD_API_KEY_HERE"