import { useEffect } from "react";

const useOutsideAlerter = (ref, closeModal) => {
  /**
   * Hook personnalisé qui permet de gérer la fermerture d'un dropdown ou
   * quand on clique sur un endroit autre que l'élément
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeModal]);
};

export default useOutsideAlerter;
