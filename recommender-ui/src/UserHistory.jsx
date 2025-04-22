import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserHistory.css';
import { Link } from 'react-router-dom';

const UserHistory = ({ userId }) => {
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      axios
        .get(`http://localhost:8080/history?userId=${userId}`)
        .then(res => setHistory(res.data));
    }, [userId]);
  
    return (
      <div className="history-container">
        <h3>Your Recently Viewed Products</h3>
        <div className="history-list">
          {history.map(item => (
            <Link to={`/product/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                <div key={item.id} className="history-card">
                    <h4>{item.name}</h4>
                    <p>Category: {item.category}</p>
                    <p>Rating: {item.rating} ⭐</p>
                </div>
            </Link>
            
          ))}
        </div>
      </div>
    );
  };

export default UserHistory;