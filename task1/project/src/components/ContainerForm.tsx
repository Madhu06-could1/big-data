import React, { useState } from 'react';
import { Container } from '../types';

interface ContainerFormProps {
  onSubmit: (container: Container) => void;
}

const ContainerForm: React.FC<ContainerFormProps> = ({ onSubmit }) => {
  const [container, setContainer] = useState<Container>({
    id: 'C1',
    size: 'small',
    needsCold: false,
    x: 1,
    y: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setContainer(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'x' || name === 'y' 
          ? parseInt(value, 10) 
          : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(container);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Container Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-3">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
            Container ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={container.id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <select
            id="size"
            name="size"
            value={container.size}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="small">Small</option>
            <option value="big">Big</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="x" className="block text-sm font-medium text-gray-700 mb-1">
            Crane X Position
          </label>
          <input
            type="number"
            id="x"
            name="x"
            min="0"
            value={container.x}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="y" className="block text-sm font-medium text-gray-700 mb-1">
            Crane Y Position
          </label>
          <input
            type="number"
            id="y"
            name="y"
            min="0"
            value={container.y}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="mb-4 mt-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="needsCold"
            checked={container.needsCold}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-2"
          />
          Requires Cold Storage
        </label>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Find Best Spot
        </button>
      </div>
    </form>
  );
};

export default ContainerForm;