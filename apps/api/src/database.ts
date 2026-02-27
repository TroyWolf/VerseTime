import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import pg from 'pg'
import { parseSql } from 'tinypg-parser'

const { Pool } = pg
const __dirname = dirname(fileURLToPath(import.meta.url))

const db = new Pool()

const doQuery = async (
  query: string,
  params?: Record<string, unknown>
): Promise<pg.QueryResult | false> => {
  let sql = query
  if (!query.match(/^UPDATE/) && !query.match(/^\/*X*\//)) {
    sql = getSql(query)
  }
  const pgQuery = sqlParse(sql, params)
  try {
    const res = await db.query(pgQuery.sql, pgQuery.params)
    return res
  } catch (err) {
    const pgErr = err as NodeJS.ErrnoException
    if (pgErr.code) {
      console.error(`${pgErr.code}: ${pgErr}`)
    } else {
      console.error(err)
    }
    return false
  }
}

const getSql = (query: string): string => {
  const [module, name] = query.split('.')
  return fs.readFileSync(join(__dirname, module, 'sql', `${name}.sql`)).toString()
}

const sqlParse = (
  query: string,
  params?: Record<string, unknown>
): { sql: string; params: unknown[] } => {
  if (!params) {
    return { sql: query, params: [] }
  }
  const parsed = parseSql(query) as {
    parameterized_sql: string
    mapping: Array<{ name: string }>
  }
  return {
    sql: parsed.parameterized_sql,
    params: sqlParamsToArray(parsed.mapping, params),
  }
}

const sqlParamsToArray = (
  mapping: Array<{ name: string }>,
  params: Record<string, unknown>
): unknown[] => {
  return mapping.map((p) => params[p.name])
}

const buildUpdateColumns = (data: Record<string, unknown>): string => {
  const columns = Object.keys(data).map((key) => `${key} = :${key}`)
  return columns.join(',')
}

export { db, doQuery, buildUpdateColumns }
