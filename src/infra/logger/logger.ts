import pino from 'pino'

export const infoLogger = (message: string): void => {
  pino().info(message)
}

export const debugLogger = (message: string, info?: any): void => {
  pino().debug(message)
}

export const errorLogger = (message: string, error?: Error): void => {
  pino().error(message, error)
}
