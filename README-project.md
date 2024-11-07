# Flapi - create-flapi-app

## 🛠 Tech Stack

- TypeScript (Language)
- CI / CD (Github Actions)

<br /><br /><br /><br />

## 📦 Versionning

On utilise la convention SemVer : https://semver.org/lang/fr/ <br /><br />
Pour une Release classique : MAJOR.MINOR.PATCH <br />
Pour une Pre-Release, exemples : MAJOR.MINOR.PATCH-rc.0 OR MAJOR.MINOR.PATCH-beta.3 <br /><br />

Nous utilison release-please de Google pour versionner, via Github Actions. <br />
Pour que cela sois pris en compte il faut utiliser les conventionnal commits : https://www.conventionalcommits.org/en/v1.0.0/ <br />
Release Please crée une demande d'extraction de version après avoir remarqué que la branche par défaut contient des « unités publiables » depuis la dernière version. Une unité publiable est un commit sur la branche avec l'un des préfixes suivant : `feat` et `fix`. <br /><br />

La première Release que créer release-please automatiquement est la version : 1.0.0 <br />
Pour créer une Pre-Release faire un commit vide, par exemple si on'ai à la version 1.0.0, on peut faire :

```bash
git commit --allow-empty -m "chore: release 1.1.0-rc.0" -m "Release-As: 1.1.0-rc.0"
```

<br /><br /><br /><br />

## ⚙️ Setup Environment Development

1. Clone the project repository using the following commands :

```bash
git clone git@github.com:FlapiBusiness/create-flapi-app.git
```

2. Download and Install nvm for Node.js.
3. Download and Install Node.js latest LTS with nvm :

```bash
nvm install lts && nvm use lts
```

4. Install dependencies for project :

```bash
npm install
```

5. Install husky :

```bash
npx husky
```

<br /><br /><br /><br />

## 🔄 Cycle Development

1. Run command :

```bash
   npm run dev
```

<br /><br /><br /><br />

## 🚀 Production

### Manual Distribution Process

```bash
   npm run build
   npm run start # test if success
```

### ⚙️➡️ Automatic Distribution Process (CI / CD)

#### Si c'est un nouveau projet suivez les instructions :

1. Ajoutées les SECRETS_GITHUB pour :
   - NPM_TOKEN
   - PAT (crée un nouveau token si besoin sur le site de github puis dans le menu du "Profil" puis -> "Settings" -> "Developper Settings' -> 'Personnal Access Tokens' -> Tokens (classic))
