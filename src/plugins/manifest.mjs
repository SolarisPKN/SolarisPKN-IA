const SAFE_ID = /^[a-z0-9][a-z0-9._-]{1,63}$/;

export function validatePluginManifest(manifest) {
  if (!manifest || !SAFE_ID.test(manifest.id ?? '')) throw new Error('invalid plugin id');
  if (!Array.isArray(manifest.capabilities)) throw new Error('capabilities must be an array');
  if (manifest.entrypoint && typeof manifest.entrypoint !== 'string') throw new Error('invalid entrypoint');
  return Object.freeze({
    id: manifest.id,
    version: manifest.version ?? '0.0.0',
    capabilities: [...new Set(manifest.capabilities)],
    externalEffects: Boolean(manifest.externalEffects),
    permissions: [...new Set(manifest.permissions ?? [])]
  });
}
