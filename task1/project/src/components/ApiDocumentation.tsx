import React from 'react';

const ApiDocumentation: React.FC = () => {
  const sampleRequest = JSON.stringify({
    container: {
      id: "C1",
      size: "small",
      needsCold: false,
      x: 1, 
      y: 1
    },
    yardMap: [
      { x: 1, y: 2, sizeCap: "small", hasColdUnit: false, occupied: false },
      { x: 2, y: 2, sizeCap: "big", hasColdUnit: true, occupied: false }
    ]
  }, null, 2);

  const sampleResponse = JSON.stringify({
    containerId: "C1",
    targetX: 1,
    targetY: 2
  }, null, 2);

  const sampleErrorResponse = JSON.stringify({
    error: "no suitable slot"
  }, null, 2);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">API Documentation</h3>
      
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 text-gray-700">Endpoint</h4>
        <div className="bg-gray-100 p-3 rounded">
          <code className="text-sm font-mono">POST /pickSpot</code>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 text-gray-700">Request Format</h4>
        <div className="bg-gray-100 p-3 rounded overflow-auto">
          <pre className="text-sm font-mono">{sampleRequest}</pre>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 text-gray-700">Success Response</h4>
        <div className="bg-gray-100 p-3 rounded overflow-auto">
          <pre className="text-sm font-mono">{sampleResponse}</pre>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-medium mb-2 text-gray-700">Error Response</h4>
        <div className="bg-gray-100 p-3 rounded overflow-auto">
          <pre className="text-sm font-mono">{sampleErrorResponse}</pre>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-medium mb-2 text-gray-700">Using in Java (Spring Boot example)</h4>
        <div className="bg-gray-100 p-3 rounded overflow-auto">
          <pre className="text-sm font-mono">{`@RestController
@RequestMapping("/")
public class ContainerController {
    
    @PostMapping("/pickSpot")
    public ResponseEntity<?> pickSpot(@RequestBody PlacementRequest request) {
        try {
            // Calculate the best spot using scoring rules
            PlacementResponse response = containerService.pickSpot(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Invalid request: " + e.getMessage()));
        }
    }
}`}</pre>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;