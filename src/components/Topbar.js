import React, { useEffect } from 'react';
import './Topbar.css';

import { useDrag, useWindow } from 'overwolf-hooks';
import PropTypes from 'prop-types';

const Topbar = ({ hasInput = false }) => {
  const [overlayWindow] = useWindow('in_game_overlay');
  const { setCurrentWindowID, onDragStart, onMouseMove } = useDrag();

  useEffect(() => {
    if (overlayWindow) {
      setCurrentWindowID(overlayWindow.id);
    }
  }, [setCurrentWindowID, overlayWindow]);

  return (
    <div
      className="bar"
      style={{
        backgroundColor: hasInput ? '#000' : 'rgba(0, 0, 0, 0.1)',
      }}
      onMouseDown={onDragStart}
      onMouseMove={(e) => {
        console.log(e.clientX, e.clientY);
        onMouseMove(e);
      }}
    >
      react-overwolf-starter
    </div>
  );
};

Topbar.propTypes = {
  hasInput: PropTypes.bool,
};

export default Topbar;
