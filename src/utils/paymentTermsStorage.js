const STORAGE_KEY = "termin-prototype-payment-terms-v1";

function readStore() {
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeStore(store) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function providerKey(competitionId, providerId) {
  return `${competitionId}:${providerId}`;
}

export function getProviderPaymentTerms(competitionId, providerId) {
  const store = readStore();
  return store[providerKey(competitionId, providerId)] ?? {
    saved: null,
    draft: null,
  };
}

export function getSavedPaymentTermsForCompetition(competitionId) {
  const store = readStore();
  const prefix = `${competitionId}:`;

  return Object.entries(store).reduce((configuredProviders, [key, value]) => {
    if (!key.startsWith(prefix) || !value.saved) return configuredProviders;

    const providerId = key.slice(prefix.length);
    configuredProviders[providerId] = value.saved;
    return configuredProviders;
  }, {});
}

export function savePaymentTermsDraft(competitionId, providerId, draft) {
  const store = readStore();
  const key = providerKey(competitionId, providerId);
  store[key] = {
    saved: store[key]?.saved ?? null,
    draft,
  };
  writeStore(store);
}

export function commitPaymentTerms(competitionId, providerId) {
  const store = readStore();
  const key = providerKey(competitionId, providerId);
  const record = store[key];

  if (!record?.draft) return null;

  store[key] = {
    saved: record.draft,
    draft: null,
  };
  writeStore(store);
  return record.draft;
}

export function discardPaymentTermsDraft(competitionId, providerId) {
  const store = readStore();
  const key = providerKey(competitionId, providerId);
  const record = store[key];

  if (!record) return;
  if (record.saved) {
    store[key] = { saved: record.saved, draft: null };
  } else {
    delete store[key];
  }
  writeStore(store);
}
