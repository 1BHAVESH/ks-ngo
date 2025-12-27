import CowForm from '@/components/admin/ProjectForm';
import React, { useState } from 'react';

const ProjectManagement = () => {
  const [cows] = useState([
    {
      id: 1,
      name: 'Bessie',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=200&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Daisy',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Buttercup',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=200&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Molly',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=200&h=200&fit=crop'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Cow Management</h1>
        
        {/* Cow Form Component */}
        <div className="mb-8">
          <CowForm />
        </div>

        {/* Cow Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">Cow Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {cows.map((cow) => (
                <tr key={cow.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">{cow.id}</td>
                  <td className="px-6 py-4">
                    <img 
                      src={cow.image} 
                      alt={cow.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-100">{cow.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;