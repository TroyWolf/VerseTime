import testRoutes from './test/routes.js'
import bibleRoutes from './bible/routes.js'

export default (app) => {
  testRoutes(app)
  bibleRoutes(app)
}
