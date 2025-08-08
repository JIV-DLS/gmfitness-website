# ⚡ Guide de Déploiement Rapide - Architecture Hybride

## 🎯 **RÉSUMÉ SETUP HYBRIDE RÉUSSI !**

✅ **Frontend** : React → GitHub Pages  
✅ **Backend** : Vercel Functions → API Instagram/Google  
✅ **Structure** : `frontend/` + `backend/` organisée  
✅ **CI/CD** : GitHub Actions mis à jour  

---

## 🚀 **DÉPLOIEMENT EN 3 ÉTAPES**

### **1️⃣ FRONTEND (GitHub Pages) - DÉJÀ CONFIGURÉ**
```bash
# ✅ Automatique via GitHub Actions
git push origin main
# ➜ Deploy sur https://jiv-dls.github.io/gmfitness-website/
```

### **2️⃣ BACKEND (Vercel) - À CONFIGURER**
```bash
# Installer Vercel CLI
npm install -g vercel

# Login Vercel
vercel login

# Deploy backend
cd backend/
vercel

# Suivre les instructions:
# ? Set up and deploy "~/backend"? → Y
# ? Which scope? → Choisir ton compte
# ? Link to existing project? → N 
# ? What's your project's name? → gml-fitness-backend
# ? In which directory is your code located? → ./

# ✅ Backend déployé sur https://gml-fitness-backend.vercel.app/
```

### **3️⃣ CONFIGURER VARIABLES D'ENVIRONNEMENT**
```bash
# Dans Vercel Dashboard (https://vercel.com/dashboard)
# Aller dans le projet gml-fitness-backend → Settings → Environment Variables

# Ajouter ces variables:
INSTAGRAM_ACCESS_TOKEN=IGQVJ...    # Token Instagram à obtenir
GOOGLE_PLACES_API_KEY=AIza...      # Clé Google Places à obtenir  
GOOGLE_PLACE_ID=ChIJ...            # Place ID business Google
```

---

## 🔑 **OBTENIR LES API KEYS (OPTIONNEL)**

### **Instagram Access Token**
1. Aller sur [Facebook Developers](https://developers.facebook.com)
2. Créer une app → Ajouter Instagram Basic Display
3. Générer Access Token
4. Copier dans Vercel env vars

### **Google Places API**
1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer projet → Activer Places API
3. Créer clé API → Copier dans Vercel
4. Trouver Place ID sur [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

---

## 🌐 **URLS FINALES**

### **Frontend (GitHub Pages)**
```
https://jiv-dls.github.io/gmfitness-website/
```

### **Backend (Vercel)**
```
https://gml-fitness-backend.vercel.app/api/instagram
https://gml-fitness-backend.vercel.app/api/reviews
```

---

## 🧪 **TESTS RAPIDES**

### **Frontend**
```bash
cd frontend/
npm run dev
# ➜ http://localhost:5173/gmfitness-website/
```

### **Backend**  
```bash
cd backend/
vercel dev
# ➜ http://localhost:3000/api/instagram
```

### **Test Production**
```bash
curl https://gml-fitness-backend.vercel.app/api/instagram
curl https://gml-fitness-backend.vercel.app/api/reviews
```

---

## 🎉 **RÉSULTAT FINAL**

Après ces 3 étapes, tu auras :

✅ **Site frontend** déployé et fonctionnel  
✅ **API backend** pour Instagram + Google Reviews  
✅ **Intégrations sociales** authentiques (plus de mock data !)  
✅ **Déploiements automatiques** sur chaque push  
✅ **Coûts = 0€** (GitHub Pages + Vercel gratuits)  
✅ **Scaling illimité** et performance optimale  

---

## 🔧 **COMMANDES UTILES**

```bash
# Deploy backend manuellement
cd backend && vercel --prod

# Voir logs backend
vercel logs

# Redéployer frontend
git push origin main

# Tests locaux
npm run dev:frontend   # (cd frontend && npm run dev)
npm run dev:backend    # (cd backend && vercel dev)
```

---

## 💡 **PROCHAINES ÉTAPES RECOMMANDÉES**

1. **Configurer les API keys** → Vrais posts Instagram + avis Google
2. **Merger la branche** → `git checkout main && git merge feature/social-integrations`
3. **Domain custom** → Configurer gilsonmendes.fr vers Vercel
4. **Analytics** → Facebook Pixel + Google Analytics
5. **Optimisations** → Caching, CDN, compression

---

**Architecture hybride déployée avec succès ! 🚀💪⚡**