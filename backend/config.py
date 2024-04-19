from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config():
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(BASE_DIR, "site.db")
    SQLALCHEMY_ECHO = False
    DEBUG = True

class TestConfig(Config):
    pass