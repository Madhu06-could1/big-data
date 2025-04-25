import React from 'react';
import { PlacementResponse } from '../types';
import { Check, AlertCircle } from 'lucide-react';

interface PlacementResultProps {
  result: PlacementResponse | null;
}

const PlacementResult: React.FC<PlacementResultProps> = ({ result }) => {
  if (!result) return null;

  // Check if it's an error response
  const isError = 'error' in result;

  return (
    <div className={`rounded-lg p-4 shadow-md mt-4 ${isError ? 'bg-red-50' : 'bg-green-50'}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {isError ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Check className="h-5 w-5 text-green-500" />
          )}
        </div>
        <div className="ml-3">
          <h3 className={`text-lg font-medium ${isError ? 'text-red-800' : 'text-green-800'}`}>
            {isError ? 'Placement Error' : 'Optimal Placement Found'}
          </h3>
          
          {isError ? (
            <div className="mt-2 text-red-700">
              <p>{result.error}</p>
            </div>
          ) : (
            <div className="mt-2 text-green-700">
              <p>
                Container <span className="font-semibold">{result.containerId}</span> should be placed at position <span className="font-semibold">({result.targetX}, {result.targetY})</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementResult;