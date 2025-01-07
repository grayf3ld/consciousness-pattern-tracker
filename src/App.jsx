import React from 'react';
import ConceptTracker from './components/ConceptTracker';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[700px] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Consciousness Pattern Tracker</h1>
        <ConceptTracker />
      </div>
    </div>
  );
}

export default App;
