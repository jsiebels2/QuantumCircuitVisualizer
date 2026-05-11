from qiskit import QuantumCircuit

# Takes number of qubits as the parameter
def circuit_builder(n:int, gates):
    qc = QuantumCircuit(n)
    
    gate_map = {
        "h":  lambda g: qc.h(g["qubit"]),
        "x":  lambda g: qc.x(g["qubit"]),
        "cx": lambda g: qc.cx(g["control"], g["target"]),
        "rz": lambda g: qc.rz(g["angle"], g["qubit"]),
    }

    for g in gates:
        name = g["gate"].lower()
        if name in gate_map:
            gate_map[name](g)
        else:
            raise ValueError(f"Unknown gate: {name}")

    return qc
        