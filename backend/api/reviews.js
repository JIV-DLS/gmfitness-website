/**
 * Vercel Function - Google Reviews API
 * Récupère les avis Google My Business via l'API Google Places
 */

export default async function handler(req, res) {
  // Headers CORS pour permettre les requêtes depuis le frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestion des requêtes OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Seules les requêtes GET sont autorisées
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Configuration Google Places API
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    // Permettre de tester avec un autre Place ID via paramètre de requête
    const GOOGLE_PLACE_ID = req.query.test_place_id || process.env.GOOGLE_PLACE_ID;

    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
      return res.status(500).json({ 
        error: 'Google Places API not configured',
        message: 'Veuillez configurer GOOGLE_PLACES_API_KEY et GOOGLE_PLACE_ID dans les variables d\'environnement Vercel'
      });
    }

    // Récupération des avis Google Places
    const placesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${GOOGLE_PLACES_API_KEY}&language=fr`;
    
    console.log('🔄 Fetching Google Reviews...', { 
      placeId: GOOGLE_PLACE_ID.substring(0, 20) + '...', 
      hasApiKey: !!GOOGLE_PLACES_API_KEY,
      apiKeyPrefix: GOOGLE_PLACES_API_KEY.substring(0, 10) + '...'
    });

    const response = await fetch(placesUrl);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ Google Places API Error:', response.status, errorData);
      
      return res.status(response.status).json({
        error: 'Google Places API Error',
        status: response.status,
        message: 'Erreur lors de la récupération des avis Google',
        debug: {
          httpStatus: response.status,
          placeIdFormat: GOOGLE_PLACE_ID.startsWith('ChIJ') ? 'ChIJ (correct)' : 'Invalid format',
          placeIdLength: GOOGLE_PLACE_ID.length,
          errorDetails: errorData.substring(0, 500)
        }
      });
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('❌ Google Places API Status Error:', data.status, data.error_message);
      
      return res.status(400).json({
        error: 'Google Places API Status Error',
        status: data.status,
        message: data.error_message || 'Erreur API Google Places',
        debug: {
          googleStatus: data.status,
          placeId: GOOGLE_PLACE_ID,
          placeIdLength: GOOGLE_PLACE_ID.length,
          suggestedSolution: data.status === 'INVALID_REQUEST' ? 
            'Place ID is invalid. Please verify the Place ID format and try a complete ChIJ... ID from Google Maps.' :
            'Check Google Places API key permissions and enable Google Places API in Google Cloud Console.'
        }
      });
    }

    const place = data.result;
    console.log('✅ Google Reviews fetched successfully:', place.reviews?.length || 0, 'reviews');

    // Transformation des données pour le frontend
    const transformedReviews = place.reviews?.map(review => ({
      id: `google_${review.time}`,
      author_name: review.author_name,
      author_url: review.author_url,
      language: review.language,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time,
      translated: review.translated || false
    })) || [];

    // Statistiques globales
    const stats = {
      averageRating: place.rating || 0,
      totalReviews: place.user_ratings_total || 0,
      businessName: place.name || 'GML Fitness'
    };

    // Réponse finale
    return res.status(200).json({
      success: true,
      data: transformedReviews,
      stats: stats,
      meta: {
        total: transformedReviews.length,
        fetched_at: new Date().toISOString(),
        source: 'Google Places API',
        place_id: GOOGLE_PLACE_ID
      }
    });

  } catch (error) {
    console.error('❌ Server Error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Erreur serveur lors de la récupération des avis Google',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}