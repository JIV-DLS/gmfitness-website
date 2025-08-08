/**
 * Script pour extraire le Place ID depuis l'URL Google Maps
 */

const googleMapsUrl = 'https://www.google.com/maps/place/Gilson+Mendes+Coach+sportif/@43.9198929,6.5177998,9z/data=!3m1!4b1!4m6!3m5!1s0x6c7e19c6aacdf687:0x9c8050e949405d6a!8m2!3d43.9207993!4d7.1772014!16s%2Fg%2F11krmtlzgc?entry=ttu&g_ep=EgoyMDI1MDgwNS4wIKXMDSoASAFQAw%3D%3D';

console.log('🔍 EXTRACTION DU PLACE ID GOOGLE MAPS\n');

// Méthode 1: Extraire l'ID hexadécimal 
const hexMatch = googleMapsUrl.match(/!1s(0x[a-f0-9]+:0x[a-f0-9]+)/);
if (hexMatch) {
  console.log('📍 ID Hexadécimal trouvé:', hexMatch[1]);
}

// Méthode 2: Extraire le Google Knowledge Graph ID
const kgMatch = googleMapsUrl.match(/!16s%2Fg%2F([a-zA-Z0-9_-]+)/);
if (kgMatch) {
  const kgId = kgMatch[1];
  console.log('🧠 Google Knowledge Graph ID:', kgId);
  console.log('📍 Place ID probable:', `ChIJ${kgId}`);
}

// Méthode 3: Coordonnées pour vérification
const coordsMatch = googleMapsUrl.match(/@([0-9.-]+),([0-9.-]+)/);
if (coordsMatch) {
  console.log('📍 Coordonnées:', {
    latitude: coordsMatch[1],
    longitude: coordsMatch[2]
  });
}

console.log('\n🎯 RÉSULTAT POUR VERCEL:');
console.log('==========================');

if (hexMatch) {
  console.log('✅ GOOGLE_PLACE_ID =', hexMatch[1]);
  console.log('   ↳ Format: ID hexadécimal Google Maps');
}

if (kgMatch) {
  console.log('✅ ALTERNATIVE_PLACE_ID = ChIJ' + kgMatch[1]);
  console.log('   ↳ Format: Google Knowledge Graph ID');
}

console.log('\n💡 RECOMMANDATION:');
console.log('Teste d\'abord avec l\'ID hexadécimal:', hexMatch ? hexMatch[1] : 'non trouvé');
console.log('Si ça ne marche pas, utilise l\'alternative avec ChIJ');

console.log('\n🔧 CONFIGURATION VERCEL:');
console.log('GOOGLE_PLACE_ID=' + (hexMatch ? hexMatch[1] : 'ID_non_trouvé'));