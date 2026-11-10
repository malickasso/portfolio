import { useGithub } from "../../keystatic.config";

/**
 * Le mode local de Keystatic écrit sur le disque sans authentification :
 * il n'est autorisé qu'en développement. En production, seul le mode GitHub
 * (connexion obligatoire) ouvre l'admin.
 */
export const adminEnabled = useGithub || process.env.NODE_ENV === "development";
