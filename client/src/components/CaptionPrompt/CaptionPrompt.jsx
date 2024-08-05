import React, { useState } from 'react';
import './CaptionPrompt.css';
import { UilTimes } from '@iconscout/react-unicons';
import axios from 'axios';

function CaptionPrompt({ onClose, setDesc }) {
  const [about, setAbout] = useState('');
  const [feeling, setFeeling] = useState('');
  const [mood, setMood] = useState('');
  const [place, setPlace] = useState('');

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    const promptData = { about, feeling, mood, place };
    axios
      .post('http://localhost:5000/chat', promptData)
      .then((res) => {
        setDesc(res.data); // Pass the response to the parent component
        onClose(); // Close the CaptionPrompt component
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="CaptionPrompt">
      <div className="captionprompt-content">
        <form onSubmit={handlePromptSubmit}>
          <UilTimes className="cross" onClick={onClose} />
          <p>What’s on your mind today? Share your thoughts with us!</p>
          <input
            type="text"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            type="text"
            placeholder="Feeling"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <button className="follow-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CaptionPrompt;
