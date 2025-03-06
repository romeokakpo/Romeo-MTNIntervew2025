import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  /**
   * Hook personnalisé qui effectue un scroll vers le haut
   * dès qu'on se rend sur une nouvelle page
   */

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useScrollToTop;
