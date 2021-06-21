import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]); //keeps track of the stack history of the modes

  //function to transition to the next mode, if replace is true, the prev mode is replaced
  const transition = function (newMode, replace = false) {
    setMode(newMode); //set mode to new mode
    //if replace is set to true
    if (replace) {
      //remove the previous state from history within the setHistory function
      setHistory((history) => {
        history.pop();
        return [...history, newMode];
      });
    } else {
      setHistory((history) => [...history, newMode]);
    }
  };
  //sets mode to the previous
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode((prev) => history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}
