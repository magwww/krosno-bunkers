export const routes = {
  home: '/',
  notFound: '/404',
  signUp: '/sign-up',
  signIn: '/sign-in',
  userProfile: '/user-profile',
  bunker: (id: string) => `/my-bunkers/${id}`,
  bunkers: '/bunkers',
  myBunkers: '/user-profile/my-bunkers',
  paymentCanceled: '/payment-canceled',
  paymentSuccess: '/payment-success',
  paymentPreview: '/payment-preview',
} as const

export type AppRoutes = typeof routes
