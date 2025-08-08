/**
 * Endpoint de debug pour vérifier les variables d'environnement
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
    // Récupérer toutes les variables d'environnement (sans révéler les valeurs sensibles)
    const envVars = {
      GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY ? 'SET (hidden)' : 'NOT SET',
      GOOGLE_PLACE_ID: process.env.GOOGLE_PLACE_ID ? 'SET (hidden)' : 'NOT SET',
      INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN ? 'SET (hidden)' : 'NOT SET',
      INSTAGRAM_USER_ID: process.env.INSTAGRAM_USER_ID ? 'SET (hidden)' : 'NOT SET'
    };

    // Révéler les valeurs partielles pour debug (sans compromettre la sécurité)
    const partialValues = {
      GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY ? 
        process.env.GOOGLE_PLACES_API_KEY.substring(0, 10) + '...' : 'NOT SET',
      GOOGLE_PLACE_ID: process.env.GOOGLE_PLACE_ID ? 
        process.env.GOOGLE_PLACE_ID.substring(0, 20) + '...' : 'NOT SET',
      INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN ? 
        process.env.INSTAGRAM_ACCESS_TOKEN.substring(0, 10) + '...' : 'NOT SET',
      INSTAGRAM_USER_ID: process.env.INSTAGRAM_USER_ID || 'NOT SET'
    };

    // Compter les variables disponibles
    const allEnvKeys = Object.keys(process.env);
    const ourEnvKeys = allEnvKeys.filter(key => 
      key.startsWith('GOOGLE_') || key.startsWith('INSTAGRAM_')
    );

    const debugInfo = {
      status: 'Debug endpoint working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      vercel_region: process.env.VERCEL_REGION || 'unknown',
      variables: {
        status: envVars,
        partial_values: partialValues
      },
      environment_summary: {
        total_env_vars: allEnvKeys.length,
        our_env_vars: ourEnvKeys.length,
        our_keys: ourEnvKeys
      }
    };

    console.log('🔍 Debug info:', debugInfo);

    return res.status(200).json(debugInfo);

  } catch (error) {
    console.error('Debug endpoint error:', error);
    return res.status(500).json({ 
      error: 'Debug endpoint failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}