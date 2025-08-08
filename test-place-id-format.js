/**
 * Test pour vérifier le bon format de Place ID
 */

console.log('🔍 TEST FORMAT PLACE ID GOOGLE\n');

// Deux formats possibles extraits de l'URL
const formats = {
  hexadecimal: '0x6c7e19c6aacdf687:0x9c8050e949405d6a',
  standard: 'ChIJ11krmtlzgc' // Format Google Knowledge Graph
};

console.log('📍 Formats disponibles:');
console.log('- Hexadécimal:', formats.hexadecimal);
console.log('- Standard (ChIJ):', formats.standard);

console.log('\n💡 RECOMMANDATION:');
console.log('Google Places API utilise généralement le format "ChIJ..."');
console.log('Il faut changer GOOGLE_PLACE_ID vers:', formats.standard);

console.log('\n🔧 ACTION À FAIRE:');
console.log('1. Aller dans Vercel Dashboard');
console.log('2. Modifier GOOGLE_PLACE_ID');
console.log('3. Remplacer par:', formats.standard);
console.log('4. Sauvegarder et redéployer');

// Test URL format
const testUrls = {
  hex: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${formats.hexadecimal}&fields=name,rating,reviews&key=TEST_KEY`,
  standard: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${formats.standard}&fields=name,rating,reviews&key=TEST_KEY`
};

console.log('\n🌐 URLs de test:');
console.log('Hexadécimal:', testUrls.hex);
console.log('Standard:', testUrls.standard);