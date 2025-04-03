import React, { useState, useEffect } from "react";
import "../Styles/MoodTracker.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MoodTracker = () => {
  const [mood, setMood] = useState(5);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setMoodHistory(storedHistory);
  }, []);

  const handleSaveMood = () => {
    const newEntry = {
      date: new Date().toLocaleDateString(),
      mood: mood,
      description: getMoodDescription(mood),
    };

    const updatedHistory = [newEntry, ...moodHistory];
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
  };

  const handleDeleteHistory = (index) => {
    const updatedHistory = moodHistory.filter((_, i) => i !== index);
    setMoodHistory(updatedHistory);
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setMoodHistory([]);
    localStorage.setItem("moodHistory", JSON.stringify([]));
  };

  const getMoodDescription = (value) => {
    if (value <= 2) return "Very Sad 😭";
    if (value <= 4) return "Sad 😢";
    if (value <= 6) return "Neutral 😐";
    if (value <= 8) return "Happy 😊";
    return "Very Happy 😃";
  };

  const getMoodRecommendation = (value) => {
    if (value <= 2) return "It's okay to feel down. Talk to someone or take a break.";
    if (value <= 4) return "Try listening to music or going for a walk.";
    if (value <= 6) return "A neutral day! Stay mindful and balanced.";
    if (value <= 8) return "You're doing great! Keep up the positivity!";
    return "Amazing! Keep spreading your happiness!";
  };

  const processWeeklyData = () => {
    let weeklyData = {};
    moodHistory.forEach(entry => {
      weeklyData[entry.date] = (weeklyData[entry.date] || 0) + entry.mood;
    });
    return Object.entries(weeklyData).map(([date, mood]) => ({ date, mood }));
  };

  return (
    <div className="mood-card">
      <h2 className="title">How are you feeling today?</h2>

      <div className="mood-slider-container">
        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="mood-slider"
        />
        <p className="mood-text">{getMoodDescription(mood)}</p>
      </div>

      <div className="recommendation-container">
        <h3>Recommendation:</h3>
        <p className="recommendation-text">{getMoodRecommendation(mood)}</p>
      </div>

      <button onClick={handleSaveMood} className="save-btn">Save Mood</button>

      <div className="mood-history">
        <h3>Mood History</h3>
        {moodHistory.length === 0 ? (
          <p>No mood history yet.</p>
        ) : (
          <ul className="mood-history-list">
            {moodHistory.map((entry, index) => (
              <li key={index} className="mood-history-item">
                <p>{entry.date}: {entry.description}</p>
                <button onClick={() => handleDeleteHistory(index)} className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {moodHistory.length > 0 && (
        <button onClick={handleClearHistory} className="clear-history-btn">Clear All History</button>
      )}

      <button onClick={() => setShowReport(true)} className="report-btn">Show Weekly Report 📊</button>

      {showReport && (
        <div className="report-popup">
          <div className="report-content">
            <h2>Weekly Mood Report</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={processWeeklyData()}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="mood" fill="#00c3ff" />
              </BarChart>
            </ResponsiveContainer>
            <button onClick={() => setShowReport(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
