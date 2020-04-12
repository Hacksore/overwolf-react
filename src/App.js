import React, { useEffect } from 'react';
import './App.css';
import { hot } from 'react-hot-loader/root';
import Topbar from './components/Topbar';
import useWindowToggle from './hooks/useWindowToggle';

const App = () => {
  const [hasInput] = useWindowToggle();

  useEffect(() => {
    const ele = document.getElementsByClassName('app')[0];
    const color = hasInput ? '#000' : 'rgba(0, 0, 0, 0)';
    ele.style.borderColor = color;
  }, [hasInput]);

  return (
    <div className="app">
      <Topbar hasInput={hasInput} />

      <div className="app-content">
        <p>hasInput:</p>
        <p>{hasInput.toString()}</p>
      </div>
    </div>
  );
};

export default hot(App);
