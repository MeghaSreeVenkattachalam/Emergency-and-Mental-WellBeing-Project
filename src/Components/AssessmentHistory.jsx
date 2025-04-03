import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const AssessmentHistory = ({ userId }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/api/assessment/history/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setHistory(response.data);
            } catch (err) {
                console.error("Error fetching history:", err);
            }
        };
    
        fetchHistory();
    }, [userId]);
    

    return (
        <div>
            <h2>Assessment History</h2>
            <ul>
                {history.map((item) => (
                    <li key={item.id}>
                        {item.date} - {item.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssessmentHistory;
