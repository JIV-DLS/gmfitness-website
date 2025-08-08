/**
 * Test avec Business Profile ID au lieu de Place ID
 * Business ID: 7633194399664752837
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const BUSINESS_ID = '7633194399664752837';

    if (!GOOGLE_PLACES_API_KEY) {
      return res.status(500).json({ 
        error: 'API Key not configured',
        message: 'GOOGLE_PLACES_API_KEY manquant'
      });
    }

    console.log('🧪 Testing Business Profile ID:', BUSINESS_ID);

    // Test 1: Google My Business API format
    const mybusinessUrl = `https://mybusiness.googleapis.com/v4/accounts/*/locations/${BUSINESS_ID}?key=${GOOGLE_PLACES_API_KEY}`;
    
    // Test 2: Places API avec Business ID comme Place ID
    const placesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${BUSINESS_ID}&fields=name,rating,reviews,user_ratings_total&key=${GOOGLE_PLACES_API_KEY}&language=fr`;
    
    // Test 3: Recherche par Business ID
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${BUSINESS_ID}&key=${GOOGLE_PLACES_API_KEY}`;

    const tests = [
      { name: 'Places API avec Business ID', url: placesUrl },
      { name: 'Search API avec Business ID', url: searchUrl }
    ];

    const results = [];

    for (const test of tests) {
      try {
        console.log(`🔄 Testing: ${test.name}`);
        const response = await fetch(test.url);
        const data = await response.json();
        
        results.push({
          test: test.name,
          status: response.status,
          success: response.ok,
          data: data,
          url: test.url.replace(GOOGLE_PLACES_API_KEY, '[HIDDEN]')
        });
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
      tests_performed: results.length,
      results: results,
      meta: {
        note: 'Business Profile ID test - alternative to Place ID',
        business_id_source: 'Google My Business listing',
        tested_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Server Error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erreur serveur lors du test Business ID',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}