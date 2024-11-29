export default (app) => {
  app.get("/test", async (req, res, next) => {
    const data = {
      test: "YO! YO! YO! This came from the API, bro!",
    }
    res.json(data)
  })
}
