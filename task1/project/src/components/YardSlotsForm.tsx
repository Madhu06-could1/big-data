import React, { useState } from 'react';
import { YardSlot } from '../types';
import { Trash } from 'lucide-react';

interface YardSlotsFormProps {
  yardMap: YardSlot[];
  onUpdateYardMap: (yardMap: YardSlot[]) => void;
}

const YardSlotsForm: React.FC<YardSlotsFormProps> = ({ yardMap, onUpdateYardMap }) => {
  const [newSlot, setNewSlot] = useState<YardSlot>({
    x: 0,
    y: 0,
    sizeCap: 'small',
    hasColdUnit: false,
    occupied: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setNewSlot(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'x' || name === 'y' 
          ? parseInt(value, 10) 
          : value
    }));
  };

  const handleAddSlot = () => {
    // Check if a slot with the same coordinates already exists
    const existingIndex = yardMap.findIndex(slot => 
      slot.x === newSlot.x && slot.y === newSlot.y
    );

    if (existingIndex >= 0) {
      // Replace existing slot
      const updatedYardMap = [...yardMap];
      updatedYardMap[existingIndex] = { ...newSlot };
      onUpdateYardMap(updatedYardMap);
    } else {
      // Add new slot
      onUpdateYardMap([...yardMap, { ...newSlot }]);
    }

    // Reset form for next entry
    setNewSlot({
      x: newSlot.x,
      y: newSlot.y + 1, // Increment Y for convenience
      sizeCap: 'small',
      hasColdUnit: false,
      occupied: false
    });
  };

  const handleRemoveSlot = (index: number) => {
    const updatedYardMap = yardMap.filter((_, i) => i !== index);
    onUpdateYardMap(updatedYardMap);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Yard Slot Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <div>
          <label htmlFor="x" className="block text-sm font-medium text-gray-700 mb-1">
            X Position
          </label>
          <input
            type="number"
            id="x"
            name="x"
            min="0"
            value={newSlot.x}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="y" className="block text-sm font-medium text-gray-700 mb-1">
            Y Position
          </label>
          <input
            type="number"
            id="y"
            name="y"
            min="0"
            value={newSlot.y}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="sizeCap" className="block text-sm font-medium text-gray-700 mb-1">
            Size Capacity
          </label>
          <select
            id="sizeCap"
            name="sizeCap"
            value={newSlot.sizeCap}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="small">Small</option>
            <option value="big">Big</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="hasColdUnit"
              checked={newSlot.hasColdUnit}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2"
            />
            Cold Storage
          </label>
        </div>
        
        <div className="flex items-end">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="occupied"
              checked={newSlot.occupied}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2"
            />
            Occupied
          </label>
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <button
          type="button"
          onClick={handleAddSlot}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Add Slot
        </button>
      </div>
      
      {/* Current Yard Slots Table */}
      {yardMap.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2 text-gray-700">Current Yard Slots</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">X, Y</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cold Storage</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {yardMap.map((slot, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {slot.x}, {slot.y}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {slot.sizeCap}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {slot.hasColdUnit ? 'Yes' : 'No'}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {slot.occupied ? 'Yes' : 'No'}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleRemoveSlot(index)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Remove slot"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default YardSlotsForm;