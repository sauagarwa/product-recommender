import { useState } from 'react';
import axios from 'axios';

const Feedback = ({ productId, userId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const submitFeedback = async () => {
    await axios.post('http://localhost:8080/feedback', {
      userId, productId, rating, comment
    });
    alert("Thank you for your feedback!");
  };

  return (
    <div>
      <h4>Rate this product:</h4>
      <select value={rating} onChange={e => setRating(Number(e.target.value))}>
        {[0,1,2,3,4,5].map(r => <option key={r} value={r}>{r} ⭐</option>)}
      </select>
      <textarea
        placeholder="Leave a comment"
        onChange={e => setComment(e.target.value)}
      />
      <button onClick={submitFeedback}>Submit</button>
    </div>
  );
};

export default Feedback;