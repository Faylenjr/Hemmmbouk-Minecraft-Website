<div align="center">

  <!-- Bannière du serveur -->
  <a href="https://twitch.tv/HEMMMBOUK" target="_blank">
    <img src="https://i.postimg.cc/RFqSMN3q/Capture-d-ecran-2026-07-29-232212.png" alt="Bannière du Serveur Minecraft">
  </a>

  <h1>⚔️ Portail Web - Serveur Minecraft HEMMMBOUK INDUSTRIES ⚔️</h1>

  <p>
    <strong>L'interface web officielle du serveur Minecraft du streamer HEMMMBOUK.</strong><br>
    <em>Développé avec Next.js, héberger sur Github pilot et propulsé par Cloudflare de mort.</em>
  </p>

  <!-- Badges technologiques & Réseaux -->
  <p>
    <a href="https://twitch.tv/HEMMMBOUK" target="_blank">
      <img src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" alt="Twitch Channel" />
    </a>
    <a href="https://discord.gg/8km7XVfpVp" target="_blank">
      <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord Server" />
    </a>
    <br>
    <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare" />
  </p>

</div>

---

## 🌟 Présentation

> 🎮 **Le Stream avant tout !**
> Ce serveur est l'excuse parfaite pour rassembler la communauté Twitch de HEMMMBOUK. 
> 👉 **[Lâchez un sub (ou juste un follow) ici !](https://twitch.tv/HEMMMBOUK)**

> 💬 **Le Discord : Notre QG**
> C'est là que tout se passe. Vous voulez discuter, ouvrir un ticket parce que vous avez perdu votre stuff dans la lave, ou juste ping le staff pour rien ?
> 👉 **[Rejoignez le serveur Discord](https://discord.gg/8km7XVfpVp)**

Ce dépôt contient le code source du site web du serveur Minecraft de la **HEMMMBOUK INDUSTRIES**. Plus qu'une simple vitrine pour le stream, c'est une véritable masterclass conçue pour enrichir l'expérience des viewers/joueurs, la gestion pour le staff et centraliser toutes les infos du serveur.

---

## ✨ Ce qu'on a codé à 3h du mat' (Fonctionnalités)

Grâce à l'architecture moderne du site, nous proposons une expérience fluide et instantanée :

*   📚 **Wiki Intégré (`/wiki`) :** Toute la connaissance du serveur, les guides et les tutoriels classés par catégories (pour ceux qui lisent).
*   🗳️ **Système de Vote (`/vote`) :** Permet aux joueurs de soutenir le serveur et de gratter des récompenses.
*   🔐 **Espace Joueur (`/compte`) :** Inscription, connexion et gestion du profil joueur en toute sécurité.
*   🛡️ **Espace Staff (`/staff`) :** Zone VIP pour l'administration, incluant la gestion des élections et la création d'articles wiki.
*   📜 **Règlement (`/reglement`) :** Les règles du jeu, parce qu'il faut bien ban des gens de temps en temps.

---

## 🛠️ Stack Technique

Ce projet est bâti sur des technologies modernes pour garantir des performances optimales :

| Technologie | Rôle |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework React pour le rendu hybride (statique & dynamique). |
| **TypeScript** |
| **OpenNext / Cloudflare** | Déploiement "Edge" mondial. |
| **NPM** | Gestionnaire de paquets (Node.js version 22+). |

---

## 🚀 Installation & Développement Local

Envie de voler notre travaille ou juste de tester le site en local ? Voici la marche à suivre.

### Prérequis
*   Node.js (v22 ou supérieure)
*   Git
*   Un peu de patience

### Instructions

1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/VOTRE_NOM/hemmmbouk-minecraft-website.git](https://github.com/VOTRE_NOM/hemmmbouk-minecraft-website.git)
   cd hemmmbouk-minecraft-website
   npm install
   npm run dev
