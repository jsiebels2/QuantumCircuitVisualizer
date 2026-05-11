from qiskit_aer import AerSimulator
from qiskit.quantum_info import Statevector

def run_simulation(circuit):
    sv = Statevector.from_instruction(circuit)
    print(sv)
    
    return [
        { "index": i, "re": round(amp.real, 6), "im": round(amp.imag, 6) }
        for i, amp in enumerate(sv.data)
    ]
