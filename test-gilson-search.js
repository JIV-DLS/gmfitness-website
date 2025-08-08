// Tests spécifiques pour trouver Gilson Mendes
const searchQueries = [
  "Gilson Mendes",
  "Gilson Mendes Coach sportif", 
  "Coach sportif Gilson",
  "Coach particulier Mouans-Sartoux",
  "0617043599", // Recherche par téléphone
  "43.92079930,7.17720140" // Recherche par coordonnées
];

console.log('🔍 RECHERCHES À TESTER POUR GILSON MENDES:');
console.log('');

searchQueries.forEach((query, index) => {
  console.log(`${index + 1}. "${query}"`);
  console.log(`   URL: /api/search-place?query=${encodeURIComponent(query)}`);
});

console.log('\n💡 HYPOTHÈSES PRINCIPALES:');
console.log('1. ✅ Fiche Google Maps active et vérifiée');
console.log('2. ❓ Place ID correct mais problème permissions API');
console.log('3. ❓ Fiche récente non encore indexée dans Places API');
console.log('4. ❓ Restrictions géographiques clé API');
console.log('5. ❓ Différence Google Maps vs Places API');

console.log('\n🔧 SOLUTIONS À ESSAYER:');
console.log('- Vérifier permissions clé API (Place Details vs Search)');
console.log('- Tester recherche par téléphone/coordonnées');
console.log('- Vérifier quotas Google Cloud Console');
console.log('- Essayer avec une autre clé API de test');