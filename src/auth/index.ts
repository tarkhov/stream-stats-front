import { createAuth } from '@websanova/vue-auth'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm'
import router from '@/router'

export default (app: any) => {
  app.use(createAuth({
    plugins: {
      http: app.axios,
      router: router
    },
    drivers: {
      http: driverHttpAxios,
      auth: driverAuthBearer,
      router: driverRouterVueRouter
    },
    options: {
      notFoundRedirect: {
        name: 'user-account'
      }
    }
  }))
}
