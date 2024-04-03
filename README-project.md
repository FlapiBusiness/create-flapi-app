# Flapi - create-flapi-app

## 🛠 Tech Stack

- TypeScript (Language)
- CI / CD (Github Actions)

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

### ⚙️➡️ Automatic Distribution Process (CI / CD)

#### Si c'est un nouveau projet suivez les instructions :

1. Ajoutées les SECRETS_GITHUB pour :
   - NPM_TOKEN
   - PAT (crée un nouveau token si besoin sur le site de github puis dans le menu du "Profil" puis -> "Settings" -> "Developper Settings' -> 'Personnal Access Tokens' -> Tokens (classic))
