import localForage from 'localForage';

localForage.config({
  name: "Can's Tea Companion",
  version: 1.0
});

const TEA_SESSIONS_KEY = 'user.teaSessions';
const USER_PREFERENCES_KEY = 'user.preferences';

// Repetitive on purpose for now
// Everything will be refactored when I'm happy with features

export async function saveTeaSessions(teaSessions) {
  try {
    const persisted = await localForage.setItem(TEA_SESSIONS_KEY, teaSessions);
    return persisted;
  } catch (e) {
    console.error('There was an error saving tea sessions:', e);
    return teaSessions;
  };
};

export async function getTeaSessions() {
  try {
    const sessions = await localForage.getItem(TEA_SESSIONS_KEY);
    return sessions || [];
  } catch (e) {
    console.error('There was an error loading tea sessions:', e);
    return [];
  };
};

export async function saveUserPreferences(preferences) {
  try {
    const persisted = await localForage.setItem(USER_PREFERENCES_KEY, preferences);
    return persisted;
  } catch (e) {
    console.error('There was an error saving user preferences:', e);
    return preferences;
  };
};

export async function getUserPreferences() {
  try {
    const preferences = await localForage.getItem(USER_PREFERENCES_KEY);
    return preferences || {};
  } catch (e) {
    console.error('There was an error loading user preferences:', e);
    return {};
  };
};

