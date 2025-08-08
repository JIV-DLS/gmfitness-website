# 🚀 GML Fitness Backend API

**Backend serverless** pour les intégrations sociales de GML Fitness utilisant **Vercel Functions**.

## 📋 **Endpoints Disponibles**

### 📸 **Instagram Feed**
```bash
GET /api/instagram
```
Récupère les derniers posts Instagram de Gilson Mendes.

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "id": "instagram_post_id",
      "type": "image|video",
      "caption": "Description du post",
      "media_url": "https://...",
      "thumbnail_url": "https://...",
      "permalink": "https://instagram.com/p/...",
      "timestamp": "2024-01-15T10:30:00+0000",
      "likes": 245,
      "comments": 18
    }
  ],
  "meta": {
    "total": 12,
    "fetched_at": "2024-01-15T12:00:00.000Z",
    "source": "Instagram Basic Display API"
  }
}
```

### ⭐ **Google Reviews**
```bash
GET /api/reviews
```
Récupère les avis Google My Business.

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "id": "google_1642176000",
      "author_name": "Pierre A.",
      "rating": 5,
      "text": "Excellent coach, très professionnel...",
      "relative_time_description": "il y a 2 mois",
      "profile_photo_url": "https://..."
    }
  ],
  "stats": {
    "averageRating": 4.9,
    "totalReviews": 47,
    "businessName": "GML Fitness"
  }
}
```

## 🔧 **Configuration Variables d'Environnement**

### **Variables Requises sur Vercel :**

```bash
# Instagram Basic Display API
INSTAGRAM_ACCESS_TOKEN=IGQVJ...  # Token d'accès Instagram
INSTAGRAM_USER_ID=17841...       # ID utilisateur Instagram (optionnel, "me" par défaut)

# Google Places API  
GOOGLE_PLACES_API_KEY=AIza...    # Clé API Google Places
GOOGLE_PLACE_ID=ChIJ...          # Place ID du business Google
```

## 🚀 **Déploiement**

### **1. Déploiement Automatique (Recommandé)**
```bash
# 1. Connecter le repo GitHub à Vercel
# 2. Configurer les variables d'environnement
# 3. Deploy automatique à chaque push
```

### **2. Déploiement Manuel**
```bash
cd backend/
npm install -g vercel
vercel login
vercel --prod
```

## 🔑 **Obtenir les API Keys**

### **Instagram Access Token :**
1. Créer une app sur [Facebook Developers](https://developers.facebook.com)
2. Ajouter Instagram Basic Display
3. Générer un Access Token
4. [Guide complet](https://developers.facebook.com/docs/instagram-basic-display-api)

### **Google Places API Key :**
1. Créer un projet sur [Google Cloud Console](https://console.cloud.google.com)
2. Activer l'API Places 
3. Créer une clé API
4. Trouver le Place ID sur [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)

## 📊 **Monitoring & Debug**

### **Logs Vercel :**
```bash
vercel logs
```

### **Test Local :**
```bash
npm run dev
# Teste sur http://localhost:3000/api/instagram
```

### **Test Production :**
```bash
curl https://gml-fitness-backend.vercel.app/api/instagram
curl https://gml-fitness-backend.vercel.app/api/reviews
```

## 🛠️ **Développement**

### **Structure :**
```
backend/
├── api/
│   ├── instagram.js     # Endpoint Instagram
│   └── reviews.js       # Endpoint Google Reviews
├── package.json         # Dependencies
├── vercel.json         # Configuration Vercel
└── README.md           # Documentation
```

### **Ajouter un nouvel endpoint :**
```javascript
// backend/api/nouveau-endpoint.js
export default async function handler(req, res) {
  res.json({ message: "Hello from new endpoint!" });
}
```

## 🔒 **Sécurité**

- ✅ **CORS** configuré pour tous les domaines
- ✅ **Rate limiting** géré par Vercel
- ✅ **Variables d'environnement** sécurisées
- ✅ **HTTPS** obligatoire
- ✅ **Validation** des paramètres

## 📈 **Performance**

- ⚡ **Cold start** : ~50-200ms
- 🌍 **Edge network** mondial
- 📊 **Monitoring** intégré Vercel
- 🔄 **Auto-scaling** illimité

---

**Créé pour GML Fitness** 💪⚡