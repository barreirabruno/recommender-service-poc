import './config/module-alias'

import { app } from '@/main/config/app'
import { infoLogger } from '@/infra/logger/logger'

const serverPort = 3333

app.listen(serverPort, () => infoLogger('[Application up and running]'))
