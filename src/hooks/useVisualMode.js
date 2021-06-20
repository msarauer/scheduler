import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]); //keeps track of the stack history of the modes

  //function to transition to the next mode, if replace is true, the prev mode is replaced
  const transition = function (newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory((prev) => {
        prev.pop();
        return [...prev, newMode];
      });
    } else {
      setHistory((prev) => [...prev, newMode]);
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
