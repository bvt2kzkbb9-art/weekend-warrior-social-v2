# SETUP: weekend-warrior-social-v2

## 1. GitHub Repository

```bash
# Clone nowe repozytorium
git clone https://github.com/[YOUR_USERNAME]/weekend-warrior-social-v2.git
cd weekend-warrior-social-v2

# Skopiuj WSZYSTKIE pliki z /outputs/ do tego folderu

# Wgraj na GitHub
git add -A
git commit -m "Initial commit: Weekend Warrior Social V2"
git push origin main
```

## 2. Firebase Project

```
https://console.firebase.google.com
→ New Project: weekend-warrior-social-v2
→ Analytics: OFF
→ Create
```

## 3. Firestore Database

```
Firebase Console → Firestore Database → Create Database
Location: europe-west1
Mode: Production
```

## 4. Deploy Firestore Rules

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules --project weekend-warrior-social-v2
```

Lub ręcznie:
```
Firebase Console → Firestore Database → Rules
Skopiuj firestore.rules
Wklej i Publish
```

## 5. Enable Authentication

```
Firebase Console → Authentication → Sign-in method
✅ Email/Password: Enable
✅ Google: Enable
  → Add authorized domain: [username].github.io
```

## 6. GitHub Pages

```
Repo Settings → Pages
Branch: main / (root)
Save
```

**LIVE:** https://[username].github.io/weekend-warrior-social-v2/

## 7. Test

1. Otwórz aplikację
2. Kliknij "Zarejestruj się"
3. Stwórz konto
4. Powinieneś zobaczyć Arena Wojowników
5. Kliknij profil → Wyloguj

✅ **READY!**

