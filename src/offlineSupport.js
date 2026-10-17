export const offlineReady = () => typeof navigator !== 'undefined' && navigator.onLine === false;

/** Safely open external content only when browser reports an internet connection. */
export function openOnlineResource(url, language = 'ms') {
  if (offlineReady()) {
    window.alert(language === 'en'
      ? 'This resource needs internet access. Your offline notes, quizzes and Smart Tutor are still available.'
      : 'Bahan ini memerlukan internet. Nota, kuiz dan Smart Tutor masih boleh digunakan secara offline.');
    return false;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}

/** Ask the controlling service worker whether ALL release assets are cached. */
export async function askOfflineWorker(type = 'OFFLINE_STATUS', timeout = 18000) {
  if (!('serviceWorker' in navigator)) {
    return { ready: false, cached: 0, total: 0, waiting: true };
  }
  const worker = navigator.serviceWorker.controller || (await navigator.serviceWorker.getRegistration())?.active;
  if (!worker) return { ready: false, cached: 0, total: 0, waiting: true };
  return new Promise((resolve) => {
    const channel = new MessageChannel();
    const id = window.setTimeout(() => {
      channel.port1.close();
      resolve({ ready: false, error: 'timeout' });
    }, timeout);
    channel.port1.onmessage = (event) => {
      window.clearTimeout(id);
      channel.port1.close();
      resolve(event.data || { ready: false });
    };
    try { worker.postMessage({ type }, [channel.port2]); }
    catch (error) {
      window.clearTimeout(id);
      resolve({ ready: false, error: String(error) });
    }
  });
}

// Export/import explicitly selected learning keys only; do not export unrelated browser data.
const progressKey = /^(ikr3013|ikr3023)_quiz_unlock_v4_(?:[1-9]|[12][0-9]|30)$/;
const otherKeys = new Set(['emodul_ikr_student_number_v1', 'emodul_ikr_language_v1']);
export function exportProgressBackup() {
  const progress = {};
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (key && (progressKey.test(key) || otherKeys.has(key))) progress[key] = localStorage.getItem(key);
  }
  const data = { type: 'emodul-ikr-progress-backup', version: 1, createdAt: new Date().toISOString(), progress };
  const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = `eModul-IKR-Kemajuan-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  return Object.keys(progress).length;
}

export async function importProgressBackup(file) {
  if (!file || file.size > 200_000) throw new Error('Fail terlalu besar atau tidak sah.');
  const json = JSON.parse(await file.text());
  if (json?.type !== 'emodul-ikr-progress-backup' || json.version !== 1 || !json.progress || Array.isArray(json.progress) || typeof json.progress !== 'object') {
    throw new Error('Fail ini bukan sandaran kemajuan eModul-IKR.');
  }
  const entries = Object.entries(json.progress);
  for (const [key, value] of entries) {
    if (!(progressKey.test(key) || otherKeys.has(key)) || typeof value !== 'string') throw new Error('Data sandaran tidak sah.');
    if (progressKey.test(key) && (!/^\d+$/.test(value) || Number(value) > 8)) throw new Error('Markah kemajuan tidak sah.');
    if (key === 'emodul_ikr_student_number_v1' && (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 30)) throw new Error('Nombor pelajar tidak sah.');
    if (key === 'emodul_ikr_language_v1' && !['ms','en'].includes(value)) throw new Error('Bahasa tidak sah.');
  }
  if (!window.confirm('Pulihkan kemajuan daripada fail? Rekod pelajar berkaitan pada peranti ini mungkin diganti.')) return 0;
  for (const [key, value] of entries) localStorage.setItem(key, value);
  return entries.length;
}
