import { useGithub } from "../../keystatic.config";

/**
 * Le mode local de Keystatic lit et écrit les fichiers du projet SANS
 * authentification. Il n'est donc ouvert que si les trois conditions sont réunies :
 *  - serveur de développement,
 *  - pas de partage sur le réseau local (`npm run dev:lan` le désactive),
 *  - requête adressée à localhost (voir `isLocalRequest`).
 * En production, seul le mode GitHub (connexion obligatoire) ouvre l'admin.
 */
const localAdmin = process.env.NODE_ENV === "development" && process.env.PORTFOLIO_LAN !== "1";

export const adminEnabled = useGithub || localAdmin;

/** Vrai si l'admin tourne en mode local (sans authentification). */
export const adminIsLocal = !useGithub && localAdmin;

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * Refuse les requêtes dont l'en-tête Host n'est pas localhost : bloque l'accès
 * par l'adresse réseau et les attaques de type « DNS rebinding » depuis un site web.
 */
export function isLocalRequest(request: Request) {
  const host = (request.headers.get("host") ?? "").replace(/:\d+$/, "").toLowerCase();
  return LOCAL_HOSTS.has(host);
}
