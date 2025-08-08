# 🏋️ GML Fitness - Architecture Hybride

**Site web professionnel hybride** pour Gilson Mendes, coach sportif spécialisé dans la transformation physique et le bien-être sur la Côte d'Azur.

## 🏗️ **Architecture Hybride**

Cette application utilise une **architecture hybride** pour maximiser les performances et les fonctionnalités :

- **🎨 Frontend** : React + Vite → Déployé sur **GitHub Pages**
- **⚡ Backend** : Vercel Functions → Déployé sur **Vercel**  
- **🔄 Communication** : API REST entre frontend et backend

```
┌─────────────────┐    API CALLS    ┌─────────────────┐
│   FRONTEND      │◄──────────────►│     BACKEND     │
│                 │                 │                 │
│ React + Vite    │                 │ Vercel Functions│
│ GitHub Pages    │                 │ Instagram API   │
│ Static Site     │                 │ Google Reviews  │
└─────────────────┘                 └─────────────────┘
```

## 📁 **Structure du Projet**

```
gml-fitness-website/
├── frontend/                 # 🎨 Application React
│   ├── src/
│   │   ├── components/       # Composants React
│   │   ├── hooks/           # Custom hooks
│   │   ├── i18n/           # Traductions FR/EN
│   │   └── ...
│   ├── public/             # Assets statiques
│   ├── package.json        # Dependencies frontend
│   └── vite.config.js      # Configuration Vite
│
├── backend/                  # ⚡ API Serverless
│   ├── api/
│   │   ├── instagram.js    # Endpoint Instagram Feed
│   │   └── reviews.js      # Endpoint Google Reviews
│   ├── package.json        # Dependencies backend
│   └── vercel.json         # Configuration Vercel
│
├── .github/workflows/        # 🚀 CI/CD
│   └── deploy.yml          # GitHub Actions
│
└── docs/                    # 📚 Documentation
```

## 🚀 **Déploiement**

### **Frontend (GitHub Pages)**
```bash
# Automatique via GitHub Actions
git push origin main
# ✅ Deploy sur https://jiv-dls.github.io/gmfitness-website/
```

### **Backend (Vercel)**
```bash
# Setup Vercel (une seule fois)
cd backend/
vercel login
vercel

# Configuration des variables d'environnement
vercel env add INSTAGRAM_ACCESS_TOKEN
vercel env add GOOGLE_PLACES_API_KEY

# Deploy automatique à chaque push
git push origin main
# ✅ Deploy sur https://gml-fitness-backend.vercel.app/
```

## 🔧 **Développement Local**

### **Frontend**
```bash
cd frontend/
npm install
npm run dev
# ➜ http://localhost:5173/gmfitness-website/
```

### **Backend**  
```bash
cd backend/
npm install
vercel dev
# ➜ http://localhost:3000/api/instagram
```

## 🌐 **Endpoints API**

### **Instagram Feed**
```bash
GET https://gml-fitness-backend.vercel.app/api/instagram
```

### **Google Reviews**
```bash
GET https://gml-fitness-backend.vercel.app/api/reviews
```

## 🔑 **Variables d'Environnement**

### **Frontend (.env.local)**
```bash
VITE_BACKEND_URL=https://gml-fitness-backend.vercel.app
VITE_FACEBOOK_PIXEL_ID=your_pixel_id
```

### **Backend (Vercel Dashboard)**
```bash
INSTAGRAM_ACCESS_TOKEN=IGQVJ...
INSTAGRAM_USER_ID=17841...
GOOGLE_PLACES_API_KEY=AIza...
GOOGLE_PLACE_ID=ChIJ...
```

## 💡 **Avantages de cette Architecture**

### **✅ Performance**
- Frontend **statique** ultra-rapide (GitHub Pages)
- Backend **serverless** avec auto-scaling (Vercel)
- **Cache** optimal sur les deux côtés

### **✅ Coût**
- Frontend **100% gratuit** (GitHub Pages)
- Backend **gratuit** jusqu'à 100GB/mois (Vercel)
- **Scaling** automatique sans coût fixe

### **✅ Maintenance**
- **Séparation des responsabilités** claire
- **Déploiements indépendants**
- **Monitoring** séparé frontend/backend

### **✅ Évolutivité**
- **Migration facile** vers d'autres services
- **Ajout d'endpoints** simple
- **Scaling horizontal** automatique

## 📊 **Monitoring**

### **Frontend**
- GitHub Pages Analytics
- Google Analytics (intégré)
- Facebook Pixel (intégré)

### **Backend**
- Vercel Analytics Dashboard
- Logs en temps réel : `vercel logs`
- Metrics de performance automatiques

## 🛠️ **Scripts Utiles**

```bash
# Développement complet
npm run dev:full          # Frontend + Backend en parallèle

# Build frontend
cd frontend && npm run build

# Deploy backend
cd backend && vercel --prod

# Tests
npm run test:frontend     # Tests React
npm run test:backend      # Tests API

# Logs
vercel logs               # Logs backend Vercel
```

## 🔒 **Sécurité**

- ✅ **HTTPS** obligatoire sur les deux services
- ✅ **CORS** configuré correctement
- ✅ **Variables d'environnement** sécurisées
- ✅ **Rate limiting** automatique (Vercel)
- ✅ **Headers de sécurité** configurés

---

## 🎯 **Résultat Final**

**Site ultra-performant** avec :
- 📱 Frontend React moderne et responsive
- ⚡ Backend API pour données dynamiques  
- 🔄 Intégrations sociales en temps réel
- 📊 Analytics et tracking complets
- 💰 Coûts d'hébergement minimaux
- 🚀 Déploiements automatiques

**Perfect fit pour un coach sportif moderne !** 💪✨