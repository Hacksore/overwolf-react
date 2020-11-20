import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader/root';
import Topbar from './components/Topbar';
import useWindowToggle from './hooks/useWindowToggle';

const App = () => {
  const [hasInput] = useWindowToggle();

  return (
    <div className="app">
      <Topbar hasInput={hasInput} />

      <div className="app-content">
        <img style={{ opacity: hasInput ? 1 : '0.5' }} src="https://placekitten.com/200/100" alt="kitty" />

        { hasInput && <button type="button">Exmple Button</button> }
      </div>
    </div>
  );
};

export default hot(App);
