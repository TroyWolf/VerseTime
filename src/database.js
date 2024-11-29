import fs from "fs"
import appRoot from "app-root-path"
import pg from "pg"
import { parseSql } from "tinypg-parser"

const { Pool } = pg

const db = new Pool()

const doQuery = async (query, params) => {
  let sql = query
  if (!query.match(/^UPDATE/) && !query.match(/^\/*X*\//)) {
    sql = getSql(query)
  }
  // const sql = query.match(/^UPDATE/) ? query : getSql(query)
  const pgQuery = sqlParse(sql, params)
  try {
    const res = await db.query(pgQuery.sql, pgQuery.params)
    // console.log('doQuery', query, params, res)
    return res
  } catch (err) {
    if (err.code) {
      console.error(`${err.code}: ${err}`)
    } else {
      console.error(err)
    }
    return false
  }
}

const getSql = (query) => {
  const parts = query.split(".")
  return fs
    .readFileSync(`${appRoot}/src/${parts[0]}/sql/${parts[1]}.sql`)
    .toString()
}

const sqlParse = (query, params) => {
  if (!params) {
    return { sql: query, params: [] }
  }
  const parsed = parseSql(query)
  return {
    sql: parsed.parameterized_sql,
    params: sqlParmsToArray(parsed.mapping, params),
  }
}

const sqlParmsToArray = (mapping, params) => {
  return mapping.map((p) => params[p.name])
}

const buildUpdateColumns = (data) => {
  const columns = Object.keys(data).map((key) => `${key} = :${key}`)
  return columns.join(",")
}

export { db, doQuery, buildUpdateColumns }
