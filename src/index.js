import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './experiments/App';
import MainScene from './MainScene';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <MainScene/>
  </React.StrictMode>,
  document.getElementById('root')
);
