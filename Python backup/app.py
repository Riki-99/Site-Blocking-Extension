# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from cs50 import SQL
from flask import Flask, redirect, render_template, request, session

# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)


db = SQL("sqlite:///blocklist.db")

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'
    
if __name__ == "__main__":
    app.run()
