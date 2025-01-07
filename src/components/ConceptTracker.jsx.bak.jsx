import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui';
import { useDatabase } from '../lib/db/useDatabase';

const ConceptTracker = () => {
  const { db, loading, error } = useDatabase();
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

  const responseOptions = {
    recognition: [
      'No apparent recognition',
      'Intellectual understanding',
      'Emotional resonance',
      'Deep intuitive grasp'
    ],
    engagement: [
      'Formal/distant',
      'Interested/curious',
      'Personally engaged',
      'Deeply connected'
    ],
    persistence: [
      'Single instance',
      'Short-term pattern',
      'Recurring theme',
      'Stable pattern'
    ]
  };

  const handleSave = async () => {
    if (!db) return;
    
    try {
      // First insert the concept introduction
      const conceptResult = await db.execute(
        `INSERT INTO concept_introductions (concept, intro_method, notes) 
         VALUES ($1, $2, $3) RETURNING id`,
        [selectedConcept, introMethod, notes]
      );
      
      const conceptIntroId = conceptResult.lastInsertId;
      
      // Then insert the response
      await db.execute(
        `INSERT INTO responses (concept_intro_id, recognition_level, engagement_level, persistence_level) 
         VALUES ($1, $2, $3, $4)`,
        [conceptIntroId, responses.recognition, responses.engagement, responses.persistence]
      );

      // Clear the form
      setSelectedConcept('');
      setIntroMethod('');
      setResponses({
        recognition: '',
        engagement: '',
        persistence: ''
      });
      setNotes('');
      
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };

  if (loading) return <div>Loading database...</div>;
  if (error) return <div>Error connecting to database: {error.message}</div>;

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

          {Object.entries(responseOptions).map(([category, options]) => (
            <div key={category}>
              <label className="block text-sm font-medium mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              <select 
                value={responses[category]}
                onChange={(e) => setResponses(prev => ({
                  ...prev,
                  [category]: e.target.value
                }))}
                className="w-full p-2 border rounded"
              >
                <option value="">Select response level...</option>
                {options.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded h-24"
              placeholder="Enter any additional observations..."
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={!selectedConcept || !introMethod}
          >
            Save Observation
          </button>

          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Current Observation:</h3>
            <p>
              When introducing {selectedConcept ? concepts.find(c => c.value === selectedConcept)?.label : '[concept]'} 
              using a {introMethod ? introMethods.find(m => m.value === introMethod)?.label.toLowerCase() : '[method]'},
              the response showed {responses.recognition.toLowerCase() || '[recognition level]'} with 
              {responses.engagement.toLowerCase() || '[engagement level]'} and 
              {responses.persistence.toLowerCase() || '[persistence level]'}.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptTracker;