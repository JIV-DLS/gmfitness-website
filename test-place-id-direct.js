// Test direct du Place ID via Google Places API
const GOOGLE_PLACES_API_KEY = "AIzaSyDrtD"; // Première partie visible
const PLACE_ID = "ChIJh_bNqsYZfmwRal1ASelQgJw";

// Test 1: Places Details API
const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total,formatted_address,business_status&key=${GOOGLE_PLACES_API_KEY}&language=fr`;

console.log('🧪 TEST DIRECT PLACE ID');
console.log('Place ID:', PLACE_ID);
console.log('URL Details API:', detailsUrl.replace(GOOGLE_PLACES_API_KEY, '[KEY]'));

// Test 2: Recherche par nom pour voir si on le trouve
const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent("Gilson Mendes Coach sportif")}&key=${GOOGLE_PLACES_API_KEY}&language=fr`;

console.log('\n🔍 URL Search API:', searchUrl.replace(GOOGLE_PLACES_API_KEY, '[KEY]'));

console.log('\n📋 VÉRIFICATIONS À FAIRE:');
console.log('1. Tester ces URLs dans le navigateur (avec vraie clé API)');
console.log('2. Vérifier si permissions clé API incluent Place Details');
console.log('3. Vérifier quotas Google Cloud Console');
console.log('4. Essayer avec nouveau Place ID si récemment changé');

console.log('\n💡 HYPOTHÈSES:');
console.log('- Place ID correct mais permissions clé API insuffisantes');
console.log('- Restriction géographique sur la clé API');
console.log('- Place ID récemment mis à jour par Google');
console.log('- Problème de format dans la requête backend');