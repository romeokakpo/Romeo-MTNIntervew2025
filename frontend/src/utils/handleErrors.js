import { toast } from "react-toastify";

// src/utils/handleErrors.js
export const handleApiError = (error) => {
  if (error.response) {
    console.log(error.response);
    const message =
      error.response.data?.message ||
      error.response.data?.detail ||
      error.response.data?.email[0] ||
      "Une erreur côté serveur est survenue.";
    toast(message, { type: "error" });
  } else if (error.request) {
    // Pas de réponse du serveur (problème réseau ou serveur injoignable)
    toast("Pas de réponse du serveur. Vérifiez votre connexion réseau.", {
      type: "error",
    });
  } else {
    // Erreur inconnue
    toast("Une erreur inconnue est survenue. Veuillez réessayer.", {
      type: "error",
    });
  }
};
