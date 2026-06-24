"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function FloorplanPage() {
  const [tables, setTables] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await axios.get("http://localhost:3000/floorplan/tables");
      setTables(res.data);
    } catch (err) {
      console.error("Failed to fetch tables", err);
    }
  };

  const handleCreateTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber || !newTableCapacity) return;

    try {
      await axios.post("http://localhost:3000/floorplan/tables", {
        tableNumber: newTableNumber,
        capacity: parseInt(newTableCapacity),
      });

      setIsModalOpen(false);
      setNewTableNumber("");
      setNewTableCapacity("");
      fetchTables();
    } catch (err) {
      console.error("Failed to create table", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
      case 'OCCUPIED': return 'bg-red-100 text-red-800 border-red-200';
      case 'RESERVED': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                &larr; Back to Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Floorplan Management</h1>
            <p className="text-gray-500 mt-1">Manage dine-in tables and monitor their live status.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
          >
            + Add Table
          </button>
        </header>

        <main>
          {tables.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500 text-lg">No tables found. Add a table to build your floorplan!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {tables.map((table) => (
                <div key={table.id} className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center shadow-sm transition hover:shadow-md ${getStatusColor(table.status)}`}>
                  <div className="text-sm font-semibold opacity-70 mb-1">TABLE</div>
                  <div className="text-3xl font-black mb-2">{table.tableNumber}</div>
                  <div className="text-xs font-medium bg-white bg-opacity-50 px-2 py-1 rounded-md">
                    {table.capacity} Seats
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Create Table Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Table</h2>
            <form onSubmit={handleCreateTable} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Table Identifier (Name/Number)</label>
                <input 
                  type="text" 
                  required
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 12 or Patio-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seating Capacity</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 4"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                >
                  Save Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
