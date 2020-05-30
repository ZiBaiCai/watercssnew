const cdnBase = 'https://cdn.jsdelivr.net/npm/water.css@2/dist/'
const localBase = './water.css/'

const fileSizes = {
  dark: 2.3,
  light: 2.29,
  auto: 2.96
}

const themeForm = document.getElementById('theme-form')
const linkSnippet = document.getElementById('link-snippet')
const stylesheet = document.getElementById('js-stylesheet')
const startupStylesheet = document.getElementById('js-startup-stylesheet')
const productHunt = document.getElementById('product-hunt')

const table = {
  fileName: document.getElementById('table-file-name'),
  fileSize: document.getElementById('table-file-size'),
  theme: document.getElementById('table-theme'),
  browserSupport: document.getElementById('table-browser-support')
}

const updateProductHunt = (theme) => {
  productHunt.src = `https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=150490&theme=${theme}&period=daily`
}

const updateTheme = () => {
  const theme = themeForm.theme.value
  const fileName = `${theme === 'auto' ? 'water' : theme}.min.css`
  const cdnUrl = `${cdnBase}${fileName}`
  const localUrl = `${localBase}${fileName}`

  stylesheet.href = localUrl

  linkSnippet.innerText = `<link rel="stylesheet" href="${cdnUrl}">`
  table.fileName.innerText = fileName
  table.fileSize.innerText = `${fileSizes[theme].toFixed(2)} kb`

  if (theme === 'auto') {
    table.theme.innerHTML = 'Defaults to dark, but respects user-defined theme settings. Detected via <code>prefers-color-scheme</code>'
    table.browserSupport.innerHTML = `
      All current browsers
      (<a href="https://caniuse.com/#feat=css-variables" target="_blank">support for CSS Custom Properties</a>)
    `
  } else {
    table.theme.innerText = `Theme is forced to ${theme}`
    table.browserSupport.innerText = 'All browsers (including Internet Explorer)'
    updateProductHunt(theme)
  }
}

themeForm.addEventListener('input', updateTheme)

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: light)')
updateProductHunt(prefersColorScheme.matches ? 'light' : 'dark')
prefersColorScheme.addEventListener('change', () => {
  if (themeForm.theme.value !== 'auto') return
  updateProductHunt(prefersColorScheme.matches ? 'light' : 'dark')
})

updateTheme()
startupStylesheet.remove()
