import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui';
import { useDatabase } from '../lib/db/useDatabase';

const ConceptTracker = () => {
  const { db, loading, error: dbError } = useDatabase();
  const [selectedConcept, setSelectedConcept] = useState('');
  const [introMethod, setIntroMethod] = useState('');
  const [responses, setResponses] = useState({
    recognition: '',
    engagement: '',
    persistence: ''
  });
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState(''); // For user feedback

  // ... concepts, introMethods, and responseOptions stay the same ...

  const handleSave = async () => {
    if (!db) {
      setSaveStatus('Database not ready');
      return;
    }
    
    try {
      setSaveStatus('Saving...');
      
      // First insert the concept introduction
      const result = await db.execute(
        `INSERT INTO concept_introductions (concept, intro_method, notes)
         VALUES ($1, $2, $3) RETURNING id`,
        [selectedConcept, introMethod, notes]
      );
      
      const conceptIntroId = result.lastInsertId;
      
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
      
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000); // Clear status after 3 seconds
      
    } catch (err) {
      console.error('Error saving data:', err);
      setSaveStatus('Error saving: ' + err.message);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="text-center text-gray-600">Initializing database...</div>
        </CardContent>
      </Card>
    );
  }

  if (dbError) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="text-center text-red-600">Database error: {dbError.message}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Concept Introduction Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* ... all your existing form fields stay the same ... */}

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded h-24 resize-none"
              placeholder="Enter any additional observations..."
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedConcept || !introMethod || !responses.recognition || !responses.engagement || !responses.persistence}
            >
              Save Observation
            </button>
            {saveStatus && (
              <div className={`text-center text-sm ${saveStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {saveStatus}
              </div>
            )}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded">
            {/* ... current selection display stays the same ... */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptTracker;
