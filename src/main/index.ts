import './config/module-alias'

import { app } from '@/main/config/app'

const serverPort = 3333

app.listen(serverPort, () => console.log('[SERVER UP AND RUNNING]'))
