import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useI18n } from 'vue-i18n'

export function useTour() {
  const { t } = useI18n()

  function startTour(force = false) {
    const hasSeenDemo = localStorage.getItem('toast_sim_demo_seen')

    if (!hasSeenDemo || force) {
      const tourDriver = driver({
        showProgress: true,
        animate: true,
        allowClose: false,
        doneBtnText: t('tour.buttons.done'),
        nextBtnText: t('tour.buttons.next'),
        prevBtnText: t('tour.buttons.prev'),
        onDestroyed: () => {
          localStorage.setItem('toast_sim_demo_seen', 'true')
        },
        steps: [
          {
            popover: {
              title: t('tour.welcome.title'),
              description: t('tour.welcome.description'),
              side: 'bottom',
              align: 'start'
            }
          },
          {
            element: '#tour-config-form',
            popover: {
              title: t('tour.configuration.title'),
              description: t('tour.configuration.description'),
              side: 'right'
            }
          },
          {
            element: '#tour-preview-container',
            popover: {
              title: t('tour.preview.title'),
              description: t('tour.preview.description'),
              side: 'left'
            }
          },
          {
            element: '#tour-presets-section',
            popover: {
              title: t('tour.presets.title'),
              description: t('tour.presets.description'),
              side: 'left'
            }
          },
          {
            element: '#tour-preset-filters',
            popover: {
              title: t('tour.filters.title'),
              description: t('tour.filters.description'),
              side: 'bottom'
            }
          },
          {
            element: '#tour-code-export',
            popover: {
              title: t('tour.code_export.title'),
              description: t('tour.code_export.description'),
              side: 'left'
            }
          }
        ]
      })

      tourDriver.drive()
    }
  }

  return {
    startTour
  }
}
