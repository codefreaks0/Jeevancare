import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserDetailsPage.css";
import { useUser } from './UserContext';

const UserDetailsPage = () => {
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('');
  const [medicalHistory, setMedicalHistory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // In a real application, you would send this data to your backend
    // For now, we'll just simulate success and navigate to signin
    try {
      console.log('User details submitted:', { age, gender, medicalHistory });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update user context with new details
      updateUser({ age: age ? String(age) : '', gender });
      // Navigate to signin page after successful submission
      navigate('/signin');

    } catch (err: any) {
      console.error('Details submission error:', err);
      setError('Failed to save details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-details-container">
      <div className="details-header">
        <h2 className="details-title">Your Details</h2>
      </div>
      <form className="details-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            className="detail-input"
            value={age}
            onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            className="detail-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History (optional):</label>
          <textarea
            id="medicalHistory"
            className="detail-input"
            rows={4}
            value={medicalHistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          type="submit"
          className="next-button"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Next'}
        </button>
      </form>
    </div>
  );
};

export default UserDetailsPage; 