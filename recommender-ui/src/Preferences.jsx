import { useState } from 'react';
import './Preferences.css'

const Preferences = ({ onContinue }) => {
    const categories = ['Tech', 'Fashion', 'Books', 'Home', 'Fitness'];
    const [selected, setSelected] = useState([]);
  
    const toggleCategory = (category) => {
      setSelected(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    };
  
    return (
      <div className="preferences-container">
        <h2>Select Your Interests</h2>
        <div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`category-button ${selected.includes(cat) ? 'selected' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="continue-button" onClick={() => onContinue(selected)}>Continue</button>
      </div>
    );
  };
export default Preferences;