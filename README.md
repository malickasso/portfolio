# Portfolio — Malick Assouma

Next.js 16 · Tailwind CSS 4 · Motion · FR / EN · thème sombre/clair.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les clés
npm run dev                  # http://localhost:3000
```

## Admin : certifications, projets, blog

Ouvrir **`/keystatic`** (ex. http://localhost:3000/keystatic) :

- **Certifications** : nom, organisme, date (`2026-07`), présentation FR (EN optionnelle), PDF du certificat, lien de vérification.
- **Projets** : titre, catégorie (filtre), description, outils, URL, capture d'écran.
- **Articles de blog** : titre, date, résumé, couverture, tags, article FR (EN optionnel).

Un champ anglais laissé vide affiche le texte français sur la version anglaise du site. « Mettre en avant sur l'accueil » choisit les 3 cartes affichées sur la page d'accueil.

Le contenu est stocké dans `content/` (fichiers YAML et Markdoc), et les fichiers envoyés dans `public/certifications`, `public/images/projects` et `public/images/blog`.

### En local
L'admin écrit directement dans les fichiers du projet. Il faut ensuite `git commit` puis `git push` pour publier.

### En production (mode GitHub)
L'admin en ligne demande une connexion GitHub : seuls les comptes ayant accès au dépôt peuvent modifier le contenu. Chaque enregistrement crée un commit, puis Vercel redéploie le site (environ 1 minute).

Mise en place, une seule fois, après avoir créé le dépôt GitHub `malickasso/portfolio` :
1. Dans `.env.local`, mettre `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`, puis lancer `npm run dev` et ouvrir `/keystatic`.
2. Suivre l'assistant pour créer l'app GitHub. Il ajoute `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` et `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` dans `.env.local`.
3. Copier ces 4 variables dans les variables d'environnement Vercel, puis redéployer.

Tant que ce n'est pas configuré, `/keystatic` répond 404 en production (le mode local, qui n'a pas d'authentification, est bloqué hors développement).

## Modifier les autres textes

| Quoi | Où |
|---|---|
| Textes FR / EN (accueil, compétences, services, méthode…) | `src/content/fr.ts`, `src/content/en.ts` |
| Liens, email, WhatsApp, technologies, sections à activer | `src/content/site.ts` |
| Photo | déposer `public/photo.jpg`, puis `photo: "/photo.jpg"` dans `site.ts` |
| CV | remplacer le PDF dans `public/` (et le chemin `cv` dans `site.ts`) |

L'accueil affiche 3 cartes par section. Les pages `/fr/skills`, `/fr/work`, `/fr/services`, `/fr/certifications` et `/fr/blog` (et leurs versions `/en/...`) affichent tout.

Sections prêtes à activer (témoignages, offres) : remplir `items` dans `fr.ts`/`en.ts`, puis passer le drapeau à `true` dans `site.ts`.

## Formulaire de contact (Resend)

1. Créer un compte sur [resend.com](https://resend.com) et une clé API.
2. Renseigner `RESEND_API_KEY` et `CONTACT_TO_EMAIL` (`.env.local` en local, variables d'environnement sur Vercel).
3. Sans domaine vérifié, l'expéditeur `onboarding@resend.dev` n'envoie qu'à l'adresse du compte Resend. Une fois le domaine vérifié, définir `CONTACT_FROM_EMAIL` (ex. `Portfolio <contact@votre-domaine.com>`).

## Déploiement (Vercel)

Importer le dépôt GitHub sur Vercel, ajouter les variables d'environnement, puis activer **Analytics** dans le tableau de bord du projet. Mettre à jour `site.url` dans `site.ts` avec le domaine final.
