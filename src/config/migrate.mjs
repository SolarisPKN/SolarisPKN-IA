function clone(value) {
  return value == null ? value : structuredClone(value);
}
function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
function fillMissing(target, defaults, seeded, prefix = '') {
  for (const [key, value] of Object.entries(defaults ?? {})) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = clone(value); seeded.push(path); continue;
    }
    if (isPlainObject(target[key]) && isPlainObject(value)) fillMissing(target[key], value, seeded, path);
  }
}
function valueAt(root, dottedPath) {
  return String(dottedPath).split('.').reduce((value,key) =>
    value != null && Object.prototype.hasOwnProperty.call(value,key) ? value[key] : undefined, root);
}
export function migrateConfig({ current = {}, releaseDefaults = {}, migrations = [], requiredPaths = [] } = {}) {
  let config = clone(current) ?? {};
  const targetVersion = Number(releaseDefaults.schemaVersion ?? config.schemaVersion ?? 1);
  let version = Number(config.schemaVersion ?? 1);
  const appliedMigrations = [];
  const byFrom = new Map(migrations.map(m => [Number(m.from),m]));
  while (version < targetVersion) {
    const migration = byFrom.get(version);
    if (!migration || Number(migration.to) <= version) throw new Error(`missing config migration from schema ${version} to ${targetVersion}`);
    config = clone(migration.apply(clone(config)) ?? config);
    version = Number(migration.to);
    config.schemaVersion = version;
    appliedMigrations.push(`${migration.from}->${migration.to}`);
  }
  if (version > targetVersion) throw new Error(`config schema ${version} is newer than supported schema ${targetVersion}`);
  const seededDefaults = [];
  fillMissing(config, releaseDefaults, seededDefaults);
  config.schemaVersion = targetVersion;
  const errors = requiredPaths.filter(path => valueAt(config,path) === undefined).map(path => `missing required config path: ${path}`);
  return { config, appliedMigrations, seededDefaults, errors };
}
