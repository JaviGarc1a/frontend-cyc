import { openDB } from 'idb'

const POST_REQUESTS_STORE_NAME = 'post-requests'

// Función para abrir la base de datos IndexedDB
async function openDatabase() {
	return await openDB('requests-db', 1, {
		upgrade(db) {
			db.createObjectStore(POST_REQUESTS_STORE_NAME)
		}
	})
}

// Intercepta las solicitudes fetch
self.addEventListener('fetch', event => {
	if (event.request.method === 'POST') {
		event.respondWith(storePostRequest(event.request))
	} else {
		event.respondWith(fetch(event.request))
	}
})

// Almacena la solicitud POST en IndexedDB
async function storePostRequest(request) {
	try {
		const db = await openDatabase()
		const tx = db.transaction(POST_REQUESTS_STORE_NAME, 'readwrite')
		const store = tx.objectStore(POST_REQUESTS_STORE_NAME)
		await store.add(request.clone())
		return new Response('Solicitud POST almacenada localmente.')
	} catch (error) {
		console.error('Error al almacenar la solicitud POST:', error)
		return new Response('Error al almacenar la solicitud POST.', {
			status: 500
		})
	}
}

// Sincroniza las solicitudes almacenadas localmente con el backend
async function syncStoredRequests() {
	try {
		const db = await openDatabase()
		const tx = db.transaction(POST_REQUESTS_STORE_NAME, 'readonly')
		const store = tx.objectStore(POST_REQUESTS_STORE_NAME)
		const requests = await store.getAll()
		for (const request of requests) {
			const response = await fetch(request)
			if (response.ok) {
				await store.delete(request)
			}
		}
		console.log('Sincronización de solicitudes POST completada.')
	} catch (error) {
		console.error('Error al sincronizar las solicitudes POST:', error)
	}
}

// Escucha eventos de sincronización para manejar la sincronización de solicitudes POST almacenadas
self.addEventListener('sync', event => {
	if (event.tag === 'sync-post-requests') {
		event.waitUntil(syncStoredRequests())
	}
})
