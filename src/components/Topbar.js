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
        backgroundColor: hasInput ? '#000' : 'rgba(0, 0, 0, 0)',
      }}
      onMouseDown={(e) => hasInput && onDragStart(e)}
      onMouseMove={(e) => hasInput && onMouseMove(e)}
    >
      overworlf-react
    </div>
  );
};

Topbar.propTypes = {
  hasInput: PropTypes.bool,
};

export default Topbar;
