import React from 'react';
import { YardSlot, Container } from '../types';
import { Layers, Snowflake, X } from 'lucide-react';

interface YardGridProps {
  yardMap: YardSlot[];
  selectedSlot?: YardSlot;
  container?: Container;
}

const YardGrid: React.FC<YardGridProps> = ({ yardMap, selectedSlot, container }) => {
  if (!yardMap.length) return <div className="text-center py-4">No yard data available</div>;

  // Find grid dimensions
  const maxX = Math.max(...yardMap.map(slot => slot.x));
  const maxY = Math.max(...yardMap.map(slot => slot.y));
  
  // Prepare a 2D grid for rendering
  const grid: (YardSlot | null)[][] = Array(maxY + 1).fill(null)
    .map(() => Array(maxX + 1).fill(null));
  
  // Fill the grid with yard slots
  yardMap.forEach(slot => {
    grid[slot.y][slot.x] = slot;
  });

  return (
    <div className="overflow-auto bg-gray-100 p-4 rounded-lg">
      <div className="inline-block relative">
        {/* Current container position */}
        {container && (
          <div 
            className="absolute z-10 flex items-center justify-center"
            style={{ 
              top: `${container.y * 60}px`, 
              left: `${container.x * 60}px`,
              width: '56px',
              height: '56px'
            }}
          >
            <div className={`
              flex items-center justify-center
              ${container.size === 'big' ? 'bg-orange-500' : 'bg-yellow-500'}
              ${container.needsCold ? 'ring-2 ring-blue-500' : ''}
              text-white font-bold rounded-full w-12 h-12
              animate-pulse
            `}>
              <span className="text-xs">CRANE</span>
            </div>
          </div>
        )}
        
        {/* Yard grid */}
        <div 
          className="grid gap-1" 
          style={{ 
            gridTemplateColumns: `repeat(${maxX + 1}, 60px)`,
            gridTemplateRows: `repeat(${maxY + 1}, 60px)`
          }}
        >
          {grid.map((row, y) => 
            row.map((slot, x) => (
              <div 
                key={`${x}-${y}`} 
                className={`
                  relative w-14 h-14 rounded
                  ${!slot ? 'bg-gray-300' : 
                    slot.occupied ? 'bg-gray-500' : 
                    selectedSlot && selectedSlot.x === x && selectedSlot.y === y
                      ? 'bg-green-200 ring-2 ring-green-500' 
                      : 'bg-white'}
                  flex items-center justify-center
                  shadow transition-colors duration-300
                `}
              >
                {slot && (
                  <>
                    <div className="absolute top-1 left-1 text-xs text-gray-500">
                      {x},{y}
                    </div>
                    
                    {/* Size indicator */}
                    {slot.sizeCap === 'big' && (
                      <div className="absolute top-1 right-1">
                        <Layers size={14} className="text-blue-600" />
                      </div>
                    )}
                    
                    {/* Cold storage indicator */}
                    {slot.hasColdUnit && (
                      <div className="absolute bottom-1 left-1">
                        <Snowflake size={14} className="text-blue-500" />
                      </div>
                    )}
                    
                    {/* Occupied indicator */}
                    {slot.occupied && (
                      <X size={20} className="text-red-500" />
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default YardGrid;