# Matcha

Matcha est un projet de site de rencontres développé dans le cadre du cursus de l'école 42. Il vise à créer une plateforme permettant aux utilisateurs de se connecter en fonction de leurs intérêts, de leur emplacement et de leurs préférences.

## Table des matières

- [Fonctionnalités](#fonctionnalites)
- [Technologies Utilisées](#technologies-utilisees)
- [Présentation du projet](#presentation)

<div id='fonctionnalites'/>  
  
## Fonctionnalités

- Authentification et inscription des utilisateurs
- Reinitialisation du mot de passe par email
- Création et personnalisation de profil
- Algorithme de mise en relation basé sur les préférences des utilisateurs, la proximité entre deux utilisateurs et un score de popularité
- Chat en temps réel entre utilisateurs compatibles
- Géolocalisation et suggestions basées sur la proximité
- Fonctionnalités de signalement et de blocage
- Notifications pour les visites de profile, likes, matchs et messages

<div id='technologies-utilisees'/> 
  
## Technologies Utilisées

- **Backend**: Node.js, Express.js
- **Base de données**: MySQL
- **Frontend**: React (TypeScript), CSS
- **Communication en temps réel**: Socket.io
- **Géolocalisation**: API ipinfo
- **Map Interactive**: API Mapbox
- **Envoi d'email**: Api Brevo
- **Sécurité**: JSON Web Tokens (JWT), bcrypt
- **Déploiement**: Docker

<div id='presentation'/> 
  
## Présentation du projet

- Vidéo du projet : https://www.youtube.com/watch?v=5H538Js2X10

### Pages de login

#### Signin
![My Image](assets/signin.png)

#### Signup
![My Image](assets/signup.png)

### Pages d'informations de l'utilisateur

<img src="assets/birth.png" alt="My Image" width="500"/>
<img src="assets/gender.png" alt="My Image" width="500"/>
<img src="assets/preference.png" alt="My Image" width="500"/>
<img src="assets/tags.png" alt="My Image" width="500"/>
<img src="assets/description.png" alt="My Image" width="500"/>
<img src="assets/mainPhoto.png" alt="My Image" width="500"/>

## Pages du site

### Profile
![My Image](assets/profile.png)

### Suggestions
![My Image](assets/suggestions.png)

### Settings
![My Image](assets/settings.png)

### Chat
![My Image](assets/chat.png)

