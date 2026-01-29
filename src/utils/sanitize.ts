import DOMPurify from 'dompurify'

export const sanitizeSvg = (svgContent: string): string => {
  return DOMPurify.sanitize(svgContent, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['use'],
    ADD_ATTR: ['href', 'xlink:href']
  })
}
