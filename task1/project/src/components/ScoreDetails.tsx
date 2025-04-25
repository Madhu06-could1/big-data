import React from 'react';
import { SlotScore } from '../types';

interface ScoreDetailsProps {
  scores: SlotScore[];
  bestScoreIndex: number;
}

const ScoreDetails: React.FC<ScoreDetailsProps> = ({ scores, bestScoreIndex }) => {
  if (!scores.length) return null;

  // Sort scores by total score ascending
  const sortedScores = [...scores].sort((a, b) => a.totalScore - b.totalScore);
  
  // Take only top 5 scores to display
  const topScores = sortedScores.slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Placement Score Details</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size Penalty</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cold Penalty</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied Penalty</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topScores.map((score, index) => (
              <tr 
                key={`${score.slot.x}-${score.slot.y}`} 
                className={`${index === 0 ? 'bg-green-50' : 'hover:bg-gray-50'}`}
              >
                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  ({score.slot.x}, {score.slot.y})
                  {index === 0 && <span className="ml-2 text-xs text-green-600 font-semibold">BEST</span>}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  {score.distance}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${score.sizePenalty > 0 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                  {score.sizePenalty === 10000 ? '10,000 (Invalid)' : score.sizePenalty}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${score.coldPenalty > 0 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                  {score.coldPenalty === 10000 ? '10,000 (Invalid)' : score.coldPenalty}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm ${score.occupiedPenalty > 0 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                  {score.occupiedPenalty === 10000 ? '10,000 (Invalid)' : score.occupiedPenalty}
                </td>
                <td className={`px-3 py-2 whitespace-nowrap text-sm font-medium ${index === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {score.totalScore >= 10000 ? '≥ 10,000 (Invalid)' : score.totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Scoring Explanation:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li><strong>Distance:</strong> Manhattan distance (|x1-x2| + |y1-y2|) from crane to slot</li>
          <li><strong>Size Penalty:</strong> 10,000 if container is big but slot is small</li>
          <li><strong>Cold Penalty:</strong> 10,000 if container needs cold storage but slot doesn't have it</li>
          <li><strong>Occupied Penalty:</strong> 10,000 if slot is already occupied</li>
          <li><strong>Total Score:</strong> Sum of all above scores - lower is better</li>
        </ul>
      </div>
    </div>
  );
};

export default ScoreDetails;