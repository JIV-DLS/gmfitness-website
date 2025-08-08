/**
 * Vercel Function - Search Google Place ID
 * Recherche le bon Place ID via Google Places Text Search
 */

export default async function handler(req, res) {
  // Headers CORS
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

    if (!GOOGLE_PLACES_API_KEY) {
      return res.status(500).json({ 
        error: 'API Key not configured',
        message: 'GOOGLE_PLACES_API_KEY manquant'
      });
    }

    // Essayons plusieurs requêtes de recherche
    const queries = [
      "Gilson Mendes Coach sportif",
      "Coach sportif Mouans-Sartoux", 
      "Gilson Mendes fitness",
      "Personal trainer Mouans-Sartoux"
    ];
    
    let searchResults = [];
    
    for (const query of queries) {
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}&language=fr`;
      console.log('🔍 Trying query:', query);
      
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data.status === 'OK' && data.results?.length > 0) {
        searchResults.push({ query, results: data.results });
        break; // Arrête à la première recherche qui fonctionne
      }
    }
    
    if (searchResults.length === 0) {
      return res.status(404).json({
        error: 'No results found',
        message: 'Aucun résultat trouvé pour les recherches',
        tried_queries: queries
      });
    }
    
    const firstResult = searchResults[0];
    const searchQuery = firstResult.query;
    const data = { results: firstResult.results, status: 'OK' };
    
    console.log('✅ Found results with query:', searchQuery);

    // Retourner les résultats avec leurs Place IDs
    const results = data.results?.map(place => ({
      place_id: place.place_id,
      name: place.name,
      formatted_address: place.formatted_address,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      types: place.types,
      business_status: place.business_status
    })) || [];

    console.log('✅ Found', results.length, 'places');

    return res.status(200).json({
      success: true,
      query: searchQuery,
      results: results,
      recommended_place_id: results.length > 0 ? results[0].place_id : null,
      meta: {
        total: results.length,
        searched_at: new Date().toISOString(),
        source: 'Google Places Text Search API'
      }
    });

  } catch (error) {
    console.error('❌ Server Error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erreur serveur lors de la recherche',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}