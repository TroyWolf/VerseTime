import { type Router } from 'express'
import bibleSvc from './service.js'

type Params = Record<string, string>

export default (app: Router) => {
  app.get('/verse/:book/:chapter/:verse', async (req, res) => {
    const { book, chapter, verse } = req.params as Params
    const data = await bibleSvc.getVerse({ book, chapter, verse })
    if ('code' in data) {
      res.status(data.code)
    }
    res.json(data)
  })

  app.get('/chapter/:book/:chapter', async (req, res) => {
    const { book, chapter } = req.params as Params
    const data = await bibleSvc.getChapter({ book, chapter })
    if ('code' in data) {
      res.status(data.code)
    }
    res.json(data)
  })

  app.get('/time/:chapter/:verse', async (req, res) => {
    const { chapter, verse } = req.params as Params
    const data = await bibleSvc.getTimeVerse({ chapter, verse })
    if ('code' in data) {
      res.status(data.code)
    }
    res.json(data)
  })

  app.get('/full/:chapter/:verse', async (req, res) => {
    const { chapter, verse } = req.params as Params
    const data = await bibleSvc.getTimeVerseFull({ chapter, verse })
    if ('code' in data) {
      res.status(data.code)
    }
    res.json(data)
  })
}
