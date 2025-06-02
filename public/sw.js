// Service Worker for SND Rental Management System
// Version: 1.0.0

const CACHE_NAME = 'snd-rental-v1.0.0';
const OFFLINE_URL = '/offline';
const API_CACHE_NAME = 'snd-api-cache-v1';
const STATIC_CACHE_NAME = 'snd-static-cache-v1';
const DYNAMIC_CACHE_NAME = 'snd-dynamic-cache-v1';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/manifest.json'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/dashboard\/stats/,
  /\/api\/equipment\/\d+/,
  /\/api\/rentals\/\d+/,
  /\/api\/customers\/\d+/,
  /\/api\/user\/profile/
];

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE_NAME);
        console.log('[SW] Caching essential assets');
        await cache.addAll(PRECACHE_ASSETS);
        console.log('[SW] Essential assets cached successfully');

        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error('[SW] Failed to cache essential assets:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const validCaches = [STATIC_CACHE_NAME, API_CACHE_NAME, DYNAMIC_CACHE_NAME];

        await Promise.all(
          cacheNames.map(async (cacheName) => {
            if (!validCaches.includes(cacheName)) {
              console.log('[SW] Deleting old cache:', cacheName);
              await caches.delete(cacheName);
            }
          })
        );

        // Take control of all clients
        await self.clients.claim();
        console.log('[SW] Service worker activated successfully');
      } catch (error) {
        console.error('[SW] Failed to activate service worker:', error);
      }
    })()
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequest(request));
  } else {
    event.respondWith(handleDynamicRequest(request));
  }
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  const url = new URL(request.url);

  try {
    // Try network first
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache successful API responses
      if (shouldCacheApiResponse(url.pathname)) {
        const cache = await caches.open(API_CACHE_NAME);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }

    throw new Error('Network response not ok');
  } catch (error) {
    console.log('[SW] Network failed for API request, trying cache:', url.pathname);

    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline response for critical API endpoints
    if (isCriticalApiEndpoint(url.pathname)) {
      return new Response(
        JSON.stringify({
          error: 'Offline',
          message: 'This data is not available offline',
          offline: true
        }),
        {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    throw error;
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback to network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch static asset:', request.url);
    throw error;
  }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache successful navigation responses
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }

    throw new Error('Network response not ok');
  } catch (error) {
    console.log('[SW] Network failed for navigation, trying cache:', request.url);

    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback to offline page
    const offlineResponse = await caches.match(OFFLINE_URL);
    if (offlineResponse) {
      return offlineResponse;
    }

    // Last resort - basic offline response
    return new Response(
      `<!DOCTYPE html>
      <html>
      <head>
        <title>Offline - SND Rental</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .offline-container { max-width: 400px; margin: 0 auto; }
          .offline-icon { font-size: 64px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <div class="offline-icon">📱</div>
          <h1>You're Offline</h1>
          <p>Please check your internet connection and try again.</p>
          <button onclick="window.location.reload()">Retry</button>
        </div>
      </body>
      </html>`,
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Handle dynamic requests with stale-while-revalidate
async function handleDynamicRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);

    // Fetch from network in background
    const networkPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => null);

    // Return cached response immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }

    // Wait for network response if no cache
    return await networkPromise || new Response('Not found', { status: 404 });
  } catch (error) {
    console.error('[SW] Failed to handle dynamic request:', error);
    return new Response('Service Unavailable', { status: 503 });
  }
}

// Utility functions
function isStaticAsset(pathname) {
  return /\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/.test(pathname);
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

function shouldCacheApiResponse(pathname) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(pathname));
}

function isCriticalApiEndpoint(pathname) {
  const criticalEndpoints = [
    '/api/dashboard/stats',
    '/api/user/profile',
    '/api/notifications/unread'
  ];
  return criticalEndpoints.some(endpoint => pathname.includes(endpoint));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Process queued offline actions
    const queuedActions = await getQueuedActions();

    for (const action of queuedActions) {
      try {
        await processQueuedAction(action);
        await removeQueuedAction(action.id);
      } catch (error) {
        console.error('[SW] Failed to process queued action:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');

  const options = {
    body: 'You have new updates in SND Rental System',
    icon: '/images/icons/icon-192x192.png',
    badge: '/images/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/images/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/icons/xmark.png'
      }
    ]
  };

  if (event.data) {
    const payload = event.data.json();
    options.body = payload.body || options.body;
    options.title = payload.title || 'SND Rental System';
    options.data = { ...options.data, ...payload.data };
  }

  event.waitUntil(
    self.registration.showNotification('SND Rental System', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Helper functions for offline queue management
async function getQueuedActions() {
  // Implementation would depend on your offline storage strategy
  // This is a placeholder for IndexedDB or localStorage operations
  return [];
}

async function processQueuedAction(action) {
  // Process the queued action (API call, form submission, etc.)
  console.log('[SW] Processing queued action:', action);
}

async function removeQueuedAction(actionId) {
  // Remove the processed action from the queue
  console.log('[SW] Removing queued action:', actionId);
}

// Error handling
self.addEventListener('error', (event) => {
  console.error('[SW] Service worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
});
