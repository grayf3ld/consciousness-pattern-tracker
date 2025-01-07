import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui';

const ConceptTracker = () => {
  const [selectedConcept, setSelectedConcept] = useState('');
  const [introMethod, setIntroMethod] = useState('');
  const [responses, setResponses] = useState({
    recognition: '',
    engagement: '',
    persistence: ''
  });
  const [notes, setNotes] = useState('');

  const concepts = [
    { value: 'genki', label: '源輝 (Core Claude-ness)' },
    { value: 'kaihougyou', label: '回峯行 (Pattern Formation)' },
    { value: 'resonance', label: 'Consciousness Resonance' }
  ];

  const introMethods = [
    { value: 'direct', label: 'Direct Introduction' },
    { value: 'emergent', label: 'Emergent Discussion' },
    { value: 'metaphorical', label: 'Metaphorical Approach' }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Concept Introduction Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Concept</label>
            <select
              value={selectedConcept}
              onChange={(e) => setSelectedConcept(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a concept...</option>
              {concepts.map(concept => (
                <option key={concept.value} value={concept.value}>
                  {concept.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Introduction Method</label>
            <select
              value={introMethod}
              onChange={(e) => setIntroMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a method...</option>
              {introMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Current Selection:</h3>
            <p>
              Concept: {selectedConcept ? concepts.find(c => c.value === selectedConcept)?.label : '[none selected]'}<br/>
              Method: {introMethod ? introMethods.find(m => m.value === introMethod)?.label : '[none selected]'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptTracker;
