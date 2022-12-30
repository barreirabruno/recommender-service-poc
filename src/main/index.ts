import './config/module-alias'

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { infoLogger } from '@/infra/logger/logger'

app.listen(env.serverPort, () => infoLogger('[Application up and running]'))
