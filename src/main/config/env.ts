import 'dotenv/config'

export const env = {
  port: process.env.SERVER_PORT!,
  jwtSecret: process.env.JWT_SECRET!,
  defaultPass: process.env.DEFAULT_PASS!,
  apiCurrency: {
    url: process.env.API_CURRENCY_URL ?? '',
    apiKey: process.env.API_CURRENCY_APIKEY ?? ''
  }
}
