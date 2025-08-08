// Script pour extraire le Place ID depuis un lien Google Maps raccourci
import fetch from 'node-fetch';

const shortUrl = "https://maps.app.goo.gl/nJDZygnDNTVUfjNp9";

console.log('🔍 EXTRACTION PLACE ID depuis lien raccourci\n');
console.log('Lien fourni:', shortUrl);

async function extractPlaceId() {
  try {
    // Suivre les redirections pour obtenir l'URL complète
    console.log('\n🔄 Résolution du lien raccourci...');
    
    const response = await fetch(shortUrl, { 
      method: 'HEAD',
      redirect: 'follow'
    });
    
    const fullUrl = response.url;
    console.log('✅ URL complète:', fullUrl);
    
    // Extraire le Place ID depuis l'URL complète
    let placeId = null;
    
    // Méthode 1: Recherche du pattern ftid= (pour les nouvelles URLs)
    const ftidMatch = fullUrl.match(/ftid=([^&]+)/);
    if (ftidMatch) {
      placeId = ftidMatch[1];
      console.log('✅ Place ID trouvé via ftid:', placeId);
    }
    
    // Méthode 2: Recherche du pattern place_id= 
    const placeIdMatch = fullUrl.match(/place_id=([^&]+)/);
    if (placeIdMatch) {
      placeId = placeIdMatch[1];
      console.log('✅ Place ID trouvé via place_id:', placeId);
    }
    
    // Méthode 3: Recherche du pattern 1s0x...
    const hexMatch = fullUrl.match(/1s0x([^!]+)/);
    if (hexMatch) {
      console.log('📍 ID hexadécimal trouvé:', '0x' + hexMatch[1]);
    }
    
    // Méthode 4: Recherche du pattern 16s%2Fg%2F... (Place ID court)
    const shortPlaceIdMatch = fullUrl.match(/16s%2Fg%2F([^?&!]+)/);
    if (shortPlaceIdMatch && !placeId) {
      const shortId = shortPlaceIdMatch[1];
      placeId = `ChIJ${shortId}`;
      console.log('✅ Place ID construit depuis 16s:', placeId);
    }
    
    console.log('\n🎯 RÉSULTAT FINAL:');
    if (placeId) {
      console.log('Place ID à utiliser:', placeId);
      console.log('Longueur:', placeId.length);
      console.log('Format:', placeId.startsWith('ChIJ') ? 'CORRECT ✓' : 'À vérifier');
    } else {
      console.log('❌ Place ID non trouvé dans l\'URL');
      console.log('URL complète à analyser manuellement:', fullUrl);
    }
    
    return placeId;
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return null;
  }
}

extractPlaceId();