import bibleSvc from "./service.js"

export default (app) => {
  app.get("/verse/:book/:chapter/:verse", async (req, res, next) => {
    const { book, chapter, verse } = req.params
    const data = await bibleSvc.getVerse({ book, chapter, verse })
    if (data.code) {
      res.status(data.code)
    }
    res.json(data)
  })
  
  app.get("/chapter/:book/:chapter", async (req, res, next) => {
    const { book, chapter, verse } = req.params
    const data = await bibleSvc.getChapter({ book, chapter, verse })
    if (data.code) {
      res.status(data.code)
    }
    res.json(data)
  })

  app.get("/time/:chapter/:verse", async (req, res, next) => {
    const { book, chapter, verse } = req.params
    const data = await bibleSvc.getTimeVerse({ book, chapter, verse })
    if (data.code) {
      res.status(data.code)
    }
    res.json(data)
  })

  app.get("/full/:chapter/:verse", async (req, res, next) => {
    const { book, chapter, verse } = req.params
    const data = await bibleSvc.getTimeVerseFull({ book, chapter, verse })
    if (data.code) {
      res.status(data.code)
    }
    res.json(data)
  })

}
