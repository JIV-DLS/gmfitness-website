# 🔍 GUIDE DE VÉRIFICATION BROWSER

## 📋 INSTRUCTIONS POUR VÉRIFIER LES APPELS API

### **1️⃣ OUVRE LE SITE DANS TON NAVIGATEUR :**
```
http://localhost:5175/gmfitness-website/
```

### **2️⃣ OUVRE LES DEVTOOLS :**
- **Chrome/Safari** : `F12` ou `Cmd+Option+I`
- Va dans l'onglet **"Console"** 
- Va dans l'onglet **"Network"** 

### **3️⃣ RAFRAÎCHIS LA PAGE (F5)**

### **4️⃣ CHERCHE DANS LA CONSOLE :**
Tu devrais voir des messages comme :
```
🎯 [DEV] Facebook Pixel Event: PageView
API Instagram indisponible, utilisation des données de démo
API indisponible, utilisation des données de démo
Erreur lors du chargement des avis: [Error details]
```

### **5️⃣ CHERCHE DANS L'ONGLET NETWORK :**
Tu devrais voir des requêtes vers :
```
gml-fitness-backend-b3f8k2axw-jonas-vihoale-aniglos-projects.vercel.app/api/instagram
gml-fitness-backend-b3f8k2axw-jonas-vihoale-aniglos-projects.vercel.app/api/reviews
```

### **6️⃣ NAVIGUE VERS LA SECTION SOCIALE :**
- Scroll vers le bas jusqu'à "Suivez Mon Actualité"
- Regarde si les données Instagram et Avis Google s'affichent
- Vérifie qu'il y a bien des posts et avis (même mockés)

## ✅ CE QUI DEVRAIT SE PASSER :

1. **Page charge normalement** ✅
2. **Section sociale visible** ✅  
3. **Posts Instagram affichés** (données de démo) ✅
4. **Avis Google affichés** (données de démo) ✅
5. **Messages dans console** confirmant les appels API ✅
6. **Requêtes réseau** vers le backend Vercel ✅

## ❌ SI TU NE VOIS PAS LES APPELS :

- Vérifie que tu es sur `http://localhost:5175/gmfitness-website/`
- Regarde si des erreurs apparaissent dans la console
- Scroll jusqu'à la section "Suivez Mon Actualité"

## 📝 RAPPORT :

Écris-moi ce que tu vois dans :
1. **Console** (messages d'erreur/succès)
2. **Network** (appels vers vercel.app)
3. **Section sociale** (contenu affiché)