import React, { useState } from 'react';
import { Container, YardSlot, PlacementRequest, PlacementResponse, SlotScore } from './types';
import { ContainerPlacementService } from './services/ContainerPlacementService';
import ContainerForm from './components/ContainerForm';
import YardSlotsForm from './components/YardSlotsForm';
import YardGrid from './components/YardGrid';
import PlacementResult from './components/PlacementResult';
import ScoreDetails from './components/ScoreDetails';
import ApiDocumentation from './components/ApiDocumentation';
import { Boxes, Code, Container as ContainerIcon, Map } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'documentation'>('simulator');
  const [container, setContainer] = useState<Container>({
    id: 'C1',
    size: 'small',
    needsCold: false,
    x: 1,
    y: 1
  });
  
  const [yardMap, setYardMap] = useState<YardSlot[]>([
    { x: 1, y: 2, sizeCap: 'small', hasColdUnit: false, occupied: false },
    { x: 2, y: 2, sizeCap: 'big', hasColdUnit: true, occupied: false },
    { x: 3, y: 2, sizeCap: 'big', hasColdUnit: false, occupied: true },
    { x: 1, y: 3, sizeCap: 'small', hasColdUnit: true, occupied: false },
    { x: 2, y: 3, sizeCap: 'small', hasColdUnit: false, occupied: false },
    { x: 3, y: 3, sizeCap: 'big', hasColdUnit: true, occupied: false }
  ]);
  
  const [placementResult, setPlacementResult] = useState<PlacementResponse | null>(null);
  const [bestSlot, setBestSlot] = useState<YardSlot | undefined>(undefined);
  const [scores, setScores] = useState<SlotScore[]>([]);
  const [bestScoreIndex, setBestScoreIndex] = useState<number>(-1);

  const handleContainerSubmit = (newContainer: Container) => {
    setContainer(newContainer);
    
    // Create request for the placement service
    const request: PlacementRequest = {
      container: newContainer,
      yardMap: yardMap
    };
    
    // Calculate scores for all slots
    const slotScores = ContainerPlacementService.calculateScores(newContainer, yardMap);
    setScores(slotScores);
    
    // Find the best score
    const minScoreIndex = slotScores.reduce(
      (minIndex, score, index, array) => 
        score.totalScore < array[minIndex].totalScore ? index : minIndex, 
      0
    );
    setBestScoreIndex(minScoreIndex);
    
    // Get the placement result
    const result = ContainerPlacementService.pickSpot(request);
    setPlacementResult(result);
    
    // If successful placement, find the best slot
    if (!('error' in result)) {
      const { targetX, targetY } = result;
      const foundSlot = yardMap.find(slot => slot.x === targetX && slot.y === targetY);
      setBestSlot(foundSlot);
    } else {
      setBestSlot(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ContainerIcon size={28} className="text-white" />
              <h1 className="ml-2 text-xl font-bold text-white">Port Container Placement System</h1>
            </div>
            
            <div className="flex space-x-4 text-sm">
              <button 
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-2 rounded-md flex items-center ${
                  activeTab === 'simulator' 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-500'
                }`}
              >
                <Boxes size={16} className="mr-1" />
                Simulator
              </button>
              
              <button 
                onClick={() => setActiveTab('documentation')}
                className={`px-3 py-2 rounded-md flex items-center ${
                  activeTab === 'documentation' 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-100 hover:bg-blue-500'
                }`}
              >
                <Code size={16} className="mr-1" />
                API Documentation
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'simulator' ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center mb-3">
                  <ContainerIcon size={20} className="text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Container Setup</h2>
                </div>
                <ContainerForm onSubmit={handleContainerSubmit} />
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <Map size={20} className="text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Yard Visualization</h2>
                </div>
                <YardGrid 
                  yardMap={yardMap} 
                  selectedSlot={bestSlot}
                  container={container}
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Yard Configuration</h2>
              <YardSlotsForm yardMap={yardMap} onUpdateYardMap={setYardMap} />
              
              {placementResult && (
                <PlacementResult result={placementResult} />
              )}
              
              {scores.length > 0 && (
                <ScoreDetails 
                  scores={scores} 
                  bestScoreIndex={bestScoreIndex} 
                />
              )}
            </div>
          </>
        ) : (
          <ApiDocumentation />
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">Port Container Placement System - A mathematical placement algorithm simulation</p>
            <p className="text-sm mt-2 md:mt-0">© 2025 Port Logistics Solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;