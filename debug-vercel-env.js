/**
 * Script de debug pour vérifier la configuration Vercel
 */

const BACKEND_URL = 'https://gml-fitness-backend-b3f8k2axw-jonas-vihoale-aniglos-projects.vercel.app';

console.log('🔍 DEBUG CONFIGURATION VERCEL\n');

async function checkConfiguration() {
  console.log('🎯 BACKEND URL:', BACKEND_URL);
  console.log('📡 Test des endpoints...\n');
  
  // Test Google Reviews
  console.log('⭐ Test Google Reviews API:');
  try {
    const response = await fetch(`${BACKEND_URL}/api/reviews`);
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.error && data.error.includes('not configured')) {
      console.log('❌ Variables manquantes !');
      console.log('💡 Vérification requise:');
      console.log('   1. GOOGLE_PLACES_API_KEY configuré ?');
      console.log('   2. GOOGLE_PLACE_ID configuré ?');
      console.log('   3. Redéploiement automatique fait ?');
    } else if (data.error) {
      console.log('⚠️ Autre erreur API détectée');
      console.log('💡 Possible problème de clé API ou Place ID');
    } else {
      console.log('✅ API fonctionne !');
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
  }
  
  console.log('\n📱 Test Instagram API:');
  try {
    const response = await fetch(`${BACKEND_URL}/api/instagram`);
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (data.error && data.error.includes('not configured')) {
      console.log('❌ Variables manquantes !');
      console.log('💡 Vérification requise:');
      console.log('   1. INSTAGRAM_ACCESS_TOKEN configuré ?');
      console.log('   2. INSTAGRAM_USER_ID configuré ?');
    } else if (data.error) {
      console.log('⚠️ Autre erreur API détectée');
    } else {
      console.log('✅ API fonctionne !');
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
  }
  
  console.log('\n🔧 CHECKLIST VERCEL:');
  console.log('===================');
  console.log('1. ✅ Va sur https://vercel.com/dashboard');
  console.log('2. ✅ Clique sur "gml-fitness-backend"');
  console.log('3. ✅ Va dans "Settings" → "Environment Variables"');
  console.log('4. ❓ Vérifies que tu as bien:');
  console.log('   - GOOGLE_PLACES_API_KEY');
  console.log('   - GOOGLE_PLACE_ID');
  console.log('   - (Optionnel) INSTAGRAM_ACCESS_TOKEN');
  console.log('   - (Optionnel) INSTAGRAM_USER_ID');
  console.log('5. ❓ Si nouvelles variables → Redéploiement automatique en cours ?');
  
  console.log('\n💡 SOLUTIONS POSSIBLES:');
  console.log('• Attendre 1-2 minutes pour redéploiement automatique');
  console.log('• Vérifier les noms EXACTS des variables');
  console.log('• Vérifier que les valeurs sont bien copiées sans espaces');
  console.log('• Redéployer manuellement si nécessaire');
}

checkConfiguration();