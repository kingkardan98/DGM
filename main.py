from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/diary")
def diary():
    return render_template("diary.html")

@app.route("/selector")
def selector():
    return render_template("book_selector.html")