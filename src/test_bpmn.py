from bpmn_python.bpmn_diagram_rep import BpmnDiagramGraph

# Create a BPMN Diagram
bpmn_graph = BpmnDiagramGraph()

# Instead of adding a pool, let's just add lanes
# Note: Use appropriate methods according to the available ones.
lane_id = bpmn_graph.add_lane("Patient", "Patient")
bpmn_graph.add_start_event("StartEvent", "Start", lane_id=lane_id)
bpmn_graph.add_task("Task1", "Example Task", lane_id=lane_id)
bpmn_graph.add_end_event("EndEvent", "End", lane_id=lane_id)

# Add sequence flows
bpmn_graph.add_sequence_flow("StartEvent", "Task1", lane_id=lane_id)
bpmn_graph.add_sequence_flow("Task1", "EndEvent", lane_id=lane_id)

# Export the Diagram
bpmn_graph.export_diagram("example_bpmn_diagram.png")
