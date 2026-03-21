import json, re
from pathlib import Path

spec = json.loads(Path('v1.json').read_text())
schemas = spec.get('components', {}).get('schemas', {})


def pascalize(value: str) -> str:
    parts = re.split(r'[^A-Za-z0-9]+', value)
    cleaned = []
    for part in parts:
        if not part:
            continue
        if part[0].isdigit():
            part = f'N{part}'
        cleaned.append(part[0].upper() + part[1:])
    result = ''.join(cleaned) or 'Anonymous'
    return result.replace('$', 'Dollar')


def type_name_from_ref(ref: str) -> str:
    raw = ref.split('/')[-1]
    return pascalize(raw)


def is_enum_schema(schema: dict) -> bool:
    return isinstance(schema, dict) and 'enum' in schema and all(isinstance(v, (str, int, float, bool)) for v in schema['enum'])


def render_literal(value):
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if value is None:
        return 'null'
    if value is True:
        return 'true'
    if value is False:
        return 'false'
    return str(value)


def ts_type(schema, inline_name='Inline'):
    if not isinstance(schema, dict):
        return 'unknown'
    if '$ref' in schema:
        return type_name_from_ref(schema['$ref'])
    if 'enum' in schema:
        return ' | '.join(render_literal(v) for v in schema['enum'])
    if 'oneOf' in schema:
        return ' | '.join(ts_type(s, inline_name) for s in schema['oneOf'])
    if 'anyOf' in schema:
        return ' | '.join(ts_type(s, inline_name) for s in schema['anyOf'])
    if 'allOf' in schema:
        return ' & '.join(ts_type(s, inline_name) for s in schema['allOf'])
    t = schema.get('type')
    if t == 'string':
        return 'string'
    if t == 'integer' or t == 'number':
        return 'number'
    if t == 'boolean':
        return 'boolean'
    if t == 'null':
        return 'null'
    if t == 'array':
        return f"Array<{ts_type(schema.get('items', {}), inline_name + 'Item')}>"
    if t == 'object' or 'properties' in schema or 'additionalProperties' in schema:
        props = schema.get('properties', {})
        required = set(schema.get('required', []))
        segments = []
        for key, value in props.items():
            optional = '?' if key not in required else ''
            safe = key if re.match(r'^[A-Za-z_][A-Za-z0-9_]*$', key) else json.dumps(key, ensure_ascii=False)
            segments.append(f"{safe}{optional}: {ts_type(value, pascalize(key))};")
        if schema.get('additionalProperties'):
            addl = schema['additionalProperties']
            addl_type = 'unknown' if addl is True else ts_type(addl, inline_name + 'Value')
            segments.append(f"[key: string]: {addl_type};")
        return '{ ' + ' '.join(segments) + ' }' if segments else 'Record<string, unknown>'
    return 'unknown'

lines = [
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
    ''
]

for name, schema in schemas.items():
    type_name = pascalize(name)
    description = schema.get('description')
    if description:
        lines.append(f'/** {description.replace("*/", "* /")} */')
    if is_enum_schema(schema):
        lines.append(f'export type {type_name} = ' + ' | '.join(render_literal(v) for v in schema['enum']) + ';')
    else:
        rendered = ts_type(schema, type_name)
        is_plain_object = (schema.get('type') == 'object' or 'properties' in schema or schema.get('additionalProperties')) and not any(k in schema for k in ('allOf','oneOf','anyOf','$ref','enum'))
        if is_plain_object and rendered.startswith('{'):
            lines.append(f'export interface {type_name} {rendered}')
        else:
            lines.append(f'export type {type_name} = {rendered};')
    lines.append('')

# common request and query types used by SDK surface
extra = '''
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
'''
lines.append(extra)

Path('src/models/types.ts').write_text('\n'.join(lines))
print('generated src/models/types.ts')
