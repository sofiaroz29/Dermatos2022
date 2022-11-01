from flask import Flask

app = Flask(__name__)

@app.route('/flask', methods=['POST'])
def index():
    return "Flask server"

if __name__ == "__main__":
    app.run(port=5000, debug=True)