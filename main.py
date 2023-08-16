from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def base():
    return render_template("base.html")

@app.route("/book")
def book():
    return render_template("base_book.html")