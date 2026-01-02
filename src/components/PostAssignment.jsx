import React, { useState } from 'react';
import { BASE_URL, URL } from '../utils/constants';

const PostAssignment = () => {
  // Separate state variables for each input
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // 1. Basic Form Validation
    if (!title || !description || !subject || subject === "Select Subject" || !deadline) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);

    try {
      // 2. API Integration
      const response = await fetch( BASE_URL + '/assignment', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          subject,
          deadline
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Assignment posted successfully!' });
        // Clear form after success
        setTitle('');
        setDescription('');
        setSubject('');
        setDeadline('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Server error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post New Assignment</h2>

      {/* Feedback Message */}
      {message.text && (
        <div className={`mb-4 p-3 rounded text-sm font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Algebra II Homework"
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the tasks..."
            rows="4"
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="">Select Subject</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Deadline</label>
            <input 
              type="date" 
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 rounded-lg transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
          }`}
        >
          {loading ? 'Posting...' : 'Post Assignment'}
        </button>
      </form>
    </div>
  );
};

export default PostAssignment;