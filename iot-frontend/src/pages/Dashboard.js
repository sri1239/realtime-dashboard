// File: /src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const socket = io(process.env.REACT_APP_API || 'http://localhost:5000');

export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:5000/api/sensor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setSensorData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch sensor data");
        setLoading(false);
      });

    socket.on('sensorData', (data) => {
      setSensorData(prev => [data, ...prev.slice(0, 49)]);
    });

    return () => socket.disconnect();
  }, []);

  if (loading) return <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>⏳ Loading sensor data...</div>;
  if (error) return <div style={{ padding: '1rem', textAlign: 'center', color: 'red' }}>❌ {error}</div>;

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '600' }}>📊 Live Sensor Dashboard</h2>
        <span style={{ fontSize: '0.9rem', color: '#666' }}>Updated: {new Date(sensorData[0]?.timestamp).toLocaleString()}</span>
      </div>
      <div style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={sensorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="temperature" stroke="#fb923c" strokeWidth={2} name="🌡️ Temperature (°C)" dot={false} />
            <Line type="monotone" dataKey="humidity" stroke="#22c55e" strokeWidth={2} name="💧 Humidity (%)" dot={false} />
            <Line type="monotone" dataKey="powerUsage" stroke="#6366f1" strokeWidth={2} name="⚡ Power Usage (W)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
