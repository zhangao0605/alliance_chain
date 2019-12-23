import storage from '../../utils/storage'

const api = {
  'localhost:8080': 'http://192.168.1.108:9000',
  // 'localhost:8080': 'http://baas.thinkey.xyz/api',
  // 'localhost:8080': 'http://192.168.0.110:9000',
  '192.168.0.100:8080': 'http://192.168.0.110:9000',
}

export function getAppBaseUrl() {
  return storage.temp('session','baseUrl') || api[location.host] || location.protocol + '//' + location.host + "/api"
}
