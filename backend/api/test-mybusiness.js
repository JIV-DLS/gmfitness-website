/**
 * Test Google My Business API avec Business Profile ID
 * Nécessite OAuth2 mais testons les endpoints publics
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const BUSINESS_ID = '7633194399664752837';
    
    console.log('🧪 Testing alternative approaches for Business ID:', BUSINESS_ID);

    // Test 1: Recherche par nom exact
    const nameSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent("Gilson Mendes Coach sportif")}&key=${GOOGLE_PLACES_API_KEY}&language=fr`;
    
    // Test 2: Recherche par téléphone 
    const phoneSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=0617043599&key=${GOOGLE_PLACES_API_KEY}&language=fr`;
    
    // Test 3: Recherche par coordonnées (nearby search)
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.92079930,7.17720140&radius=100&type=gym&key=${GOOGLE_PLACES_API_KEY}&language=fr`;

    const tests = [
      { name: 'Recherche par nom "Gilson Mendes Coach sportif"', url: nameSearchUrl },
      { name: 'Recherche par téléphone "0617043599"', url: phoneSearchUrl },
      { name: 'Recherche proximité coordonnées exactes', url: nearbyUrl }
    ];

    const results = [];

    for (const test of tests) {
      try {
        console.log(`🔄 Testing: ${test.name}`);
        const response = await fetch(test.url);
        const data = await response.json();
        
        // Chercher spécifiquement Gilson dans les résultats
        const foundGilson = data.results?.find(place => 
          place.name?.toLowerCase().includes('gilson') ||
          place.formatted_address?.includes('0617043599') ||
          place.vicinity?.toLowerCase().includes('gilson')
        );
        
        results.push({
          test: test.name,
          status: response.status,
          success: response.ok,
          gilson_found: !!foundGilson,
          gilson_data: foundGilson || null,
          total_results: data.results?.length || 0,
          api_status: data.status,
          url: test.url.replace(GOOGLE_PLACES_API_KEY, '[HIDDEN]')
        });
        
        if (foundGilson) {
          console.log('🎉 GILSON TROUVÉ!', foundGilson);
        }
        
      } catch (error) {
        results.push({
          test: test.name,
          status: 'ERROR',
          success: false,
          error: error.message,
          url: test.url.replace(GOOGLE_PLACES_API_KEY, '[HIDDEN]')
        });
      }
    }

    return res.status(200).json({
      success: true,
      business_id: BUSINESS_ID,
      search_strategy: 'Alternative search methods for Gilson Mendes',
      tests_performed: results.length,
      results: results,
      summary: {
        gilson_found_in_any_test: results.some(r => r.gilson_found),
        working_searches: results.filter(r => r.success && r.total_results > 0).length
      },
      meta: {
        note: 'Trying alternative search methods since Business ID != Place ID',
        tested_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Server Error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erreur serveur lors du test MyBusiness',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}