import axios from 'axios';

const GUEST_ID_KEY = 'haircare_guest_id';

// Every visitor (no login required) gets a random id generated once and
// persisted in localStorage. The backend uses this to keep track of that
// visitor's cart and orders, the same way a session/account would.
function getOrCreateGuestId() {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

const client = axios.create({ baseURL: '/api' });

client.interceptors.request.use((config) => {
  config.headers['x-guest-id'] = getOrCreateGuestId();
  return config;
});

export default client;
