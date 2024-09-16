import { defineConfig } from 'cypress'
import { clerkSetup } from '@clerk/testing/cypress'

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return clerkSetup({ config })
    },
    baseUrl: 'http://localhost:3000', // your app's URL
  },
})
