import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

// history,location,match => useNavigate,useLocation,useParams
import { useNavigate, useParams } from "react-router-dom";

const HomePage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate('/blog/asdqw/topics')}>Topics </button>
      <h1>HOME PAGE</h1>
    </div>
  );
};

const TopicsList = () => {
  return (
    <div>
      <h1>TOPIC LIST PAGE</h1>
      <Link to="13">TO TOPIC 13</Link>
      <Link to='17'>TO TOPIC 17</Link>
      <Link to='21'>TO TOPIC 21</Link>
    </div>
  );
};

const TopicDetail = () => {
  let params = useParams();
  return (
    <div>
      <h1>TOPIC DETAIL PAGE: {params.topicId}</h1>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/blog/asdqw/topics' element={<TopicsList />} />
        <Route path='/blog/asdqw/topics/:topicId' element={<TopicDetail />} />
        <Route exact path='/blog/topics' element={<TopicsList />} />
        <Route path='/blog/topics/:topicId' element={<TopicDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;