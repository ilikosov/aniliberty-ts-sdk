import { readFileSync, writeFileSync } from 'node:fs';

const spec = JSON.parse(readFileSync('v1.json', 'utf8'));
const schemas = spec.components?.schemas ?? {};

function pascalize(value) {
  const parts = value.split(/[^A-Za-z0-9]+/);
  const cleaned = [];

  for (let part of parts) {
    if (!part) {
      continue;
    }
    if (/^[0-9]/.test(part)) {
      part = `N${part}`;
    }
    cleaned.push(part[0].toUpperCase() + part.slice(1));
  }

  const result = cleaned.join('') || 'Anonymous';
  return result.replaceAll('$', 'Dollar');
}

function typeNameFromRef(ref) {
  return pascalize(ref.split('/').at(-1) ?? 'Anonymous');
}

function isEnumSchema(schema) {
  return Boolean(
    schema
      && typeof schema === 'object'
      && Array.isArray(schema.enum)
      && schema.enum.every((value) => ['string', 'number', 'boolean'].includes(typeof value) || value === null),
  );
}

function renderLiteral(value) {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  if (value === null) {
    return 'null';
  }
  if (value === true) {
    return 'true';
  }
  if (value === false) {
    return 'false';
  }
  return String(value);
}

function tsType(schema, inlineName = 'Inline') {
  if (!schema || typeof schema !== 'object') {
    return 'unknown';
  }
  if ('$ref' in schema) {
    return typeNameFromRef(schema.$ref);
  }
  if (Array.isArray(schema.enum)) {
    return schema.enum.map((value) => renderLiteral(value)).join(' | ');
  }
  if (Array.isArray(schema.oneOf)) {
    return schema.oneOf.map((value) => tsType(value, inlineName)).join(' | ');
  }
  if (Array.isArray(schema.anyOf)) {
    return schema.anyOf.map((value) => tsType(value, inlineName)).join(' | ');
  }
  if (Array.isArray(schema.allOf)) {
    return schema.allOf.map((value) => tsType(value, inlineName)).join(' & ');
  }

  const type = schema.type;
  if (type === 'string') {
    return 'string';
  }
  if (type === 'integer' || type === 'number') {
    return 'number';
  }
  if (type === 'boolean') {
    return 'boolean';
  }
  if (type === 'null') {
    return 'null';
  }
  if (type === 'array') {
    return `Array<${tsType(schema.items ?? {}, `${inlineName}Item`)}>`;
  }
  if (type === 'object' || schema.properties || schema.additionalProperties) {
    const props = schema.properties ?? {};
    const required = new Set(schema.required ?? []);
    const segments = [];

    for (const [key, value] of Object.entries(props)) {
      const optional = required.has(key) ? '' : '?';
      const safe = /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? key : JSON.stringify(key);
      segments.push(`${safe}${optional}: ${tsType(value, pascalize(key))};`);
    }

    if (schema.additionalProperties) {
      const additionalType = schema.additionalProperties === true
        ? 'unknown'
        : tsType(schema.additionalProperties, `${inlineName}Value`);
      segments.push(`[key: string]: ${additionalType};`);
    }

    return segments.length > 0 ? `{ ${segments.join(' ')} }` : 'Record<string, unknown>';
  }

  return 'unknown';
}

const lines = [
  '// This file is generated from v1.json. Do not edit manually.',
  '',
  'export type Nullable<T> = T | null;',
  'export type IncludeExclude = string | string[];',
  '',
  'export interface PaginationMeta {',
  '  current_page: number;',
  '  from: number | null;',
  '  last_page: number;',
  '  links: Array<{ url: string | null; label: string; active: boolean }>; ',
  '  path: string;',
  '  per_page: number;',
  '  to: number | null;',
  '  total: number;',
  '}',
  '',
  'export interface PaginatedResponse<T> {',
  '  data: T;',
  '  meta?: PaginationMeta;',
  '}',
  '',
];

for (const [name, schema] of Object.entries(schemas)) {
  const typeName = pascalize(name);
  const description = typeof schema.description === 'string' ? schema.description : undefined;

  if (description) {
    lines.push(`/** ${description.replaceAll('*/', '* /')} */`);
  }

  if (isEnumSchema(schema)) {
    lines.push(`export type ${typeName} = ${schema.enum.map((value) => renderLiteral(value)).join(' | ')};`);
  } else {
    const rendered = tsType(schema, typeName);
    const isPlainObject = (schema.type === 'object' || schema.properties || schema.additionalProperties)
      && !['allOf', 'oneOf', 'anyOf', '$ref', 'enum'].some((key) => key in schema);

    if (isPlainObject && rendered.startsWith('{')) {
      lines.push(`export interface ${typeName} ${rendered}`);
    } else {
      lines.push(`export type ${typeName} = ${rendered};`);
    }
  }

  lines.push('');
}

const extra = `
export interface RequestOptions {
  signal?: AbortSignal;
  retries?: number;
  headers?: Record<string, string>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface IncludeExcludeParams {
  include?: IncludeExclude;
  exclude?: IncludeExclude;
}

export interface OtpGetRequest {
  device_id: string;
}

export interface OtpAcceptRequest {
  code: number;
}

export interface OtpLoginRequest {
  code: number;
  device_id: string;
}

export interface UserLoginRequest {
  login: string;
  password: string;
}

export interface SocialAuthenticateQuery {
  state: string;
}

export interface PasswordForgetRequest {
  email: string;
}

export interface PasswordResetRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface UserProfileQuery extends IncludeExcludeParams {}

export interface ViewHistoryQuery extends PaginationParams, IncludeExcludeParams {}

export interface ViewTimecodeUpsertItem {
  time: number;
  is_watched: boolean;
  release_episode_id: string;
}

export interface ViewTimecodeDeleteItem {
  release_episode_id: string;
}

export interface CollectionsReleasesFilter {
  genres?: string;
  types?: Array<EnumsAnimeReleasesReleaseType>;
  years?: string;
  search?: string;
  age_ratings?: Array<EnumsAnimeReleasesReleaseAgeRating>;
}

export interface CollectionsReleasesQuery extends PaginationParams, IncludeExcludeParams {
  type_of_collection: EnumsAccountsUsersUserCollectionType;
  'f[genres]'?: string;
  'f[types]'?: Array<EnumsAnimeReleasesReleaseType>;
  'f[years]'?: string;
  'f[search]'?: string;
  'f[age_ratings]'?: Array<EnumsAnimeReleasesReleaseAgeRating>;
}

export interface CollectionsReleasesRequest extends PaginationParams, IncludeExcludeParams {
  type_of_collection?: EnumsAccountsUsersUserCollectionType;
  f?: CollectionsReleasesFilter;
}

export interface CollectionMutationItem {
  release_id: number;
  type_of_collection: EnumsAccountsUsersUserCollectionType;
}

export interface CollectionDeleteItem {
  release_id: number;
}
`;

lines.push(extra);
writeFileSync('src/models/types.ts', `${lines.join('\n')}\n`);
console.log('generated src/models/types.ts');
