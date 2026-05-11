from flask import Flask, request, jsonify
from flask_cors import CORS
from circuit_builder import circuit_builder
from simulator import run_simulation

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Vite's default port

@app.route("/simulate", methods=["POST"])
def simulate():
    data = request.get_json()
    try:
        circuit = circuit_builder(data["numQubits"], data["gates"])
        statevector = run_simulation(circuit)
        return jsonify({ "statevector": statevector })
    except Exception as e:
        return jsonify({ "error": str(e) }), 400

if __name__ == "__main__":
    app.run(debug=True, port=5001)