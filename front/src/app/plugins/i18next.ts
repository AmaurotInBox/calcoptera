import i18next from 'i18next'
import Backend from 'i18next-http-backend'

i18next.use(Backend).init({
  lng: 'ru',
  fallbackLng: 'ru',
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },

  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
})

export default i18next
