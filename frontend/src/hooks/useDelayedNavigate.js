import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useDelayedNavigate = (delay = 400) => {
  const navigate = useNavigate();
  const [loadingPath, setLoadingPath] = useState(null);

  const goTo = (path) => {
    setLoadingPath(path);

    setTimeout(() => {
      navigate(path);
      setLoadingPath(null);
    }, delay);
  };

  return { goTo, loadingPath };
};