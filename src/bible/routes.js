import bibleSvc from "./service.js"

export default (app) => {
  app.get("/:book/:chapter/:verse", async (req, res, next) => {
    const { book, chapter, verse } = req.params
    const scripture = await bibleSvc.getVerse({ book, chapter, verse })
    console.log({scripture})
    if (scripture.code) {
      res.statusCode(scripture.code)
    }
    res.json(scripture)
  })
}
