/* global overwolf */
import { useState, useEffect } from 'react';
import { useWindow } from 'overwolf-hooks';

// it works I guess ;)
const useWindowToggle = () => {
  const [hasInput, setHasInput] = useState(false);
  const [overlayWindow] = useWindow('in_game_overlay');

  // hmm keeping these in glboal breaks ????/
  const PASSTHROUGH = overwolf.windows.enums.WindowStyle.InputPassThrough;
  const { hotkeys } = overwolf.settings;

  useEffect(() => {
    const listener = () => {
      if (hasInput) {
        overwolf.windows.setWindowStyle(
          overlayWindow.id,
          PASSTHROUGH,
          () => {}
        );
      } else {
        overwolf.windows.removeWindowStyle(
          overlayWindow.id,
          PASSTHROUGH,
          () => {}
        );

        // make sure we dont interact at all with it
        overwolf.windows.sendToBack(overlayWindow.id, () => {});
      }

      setHasInput(!hasInput);
    };

    hotkeys.onPressed.addListener(listener);

    return () => hotkeys.onPressed.removeListener(listener);
  }, [hasInput, overlayWindow]);

  return [hasInput];
};

export default useWindowToggle;
