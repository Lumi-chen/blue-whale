const colors = {
  pink: {
    '--el-color-primary': '#e91e63',
    '--el-color-primary-light-3': '#f06292',
    '--el-color-primary-light-5': '#f48fb1',
    '--el-color-primary-light-7': '#f8bcd0',
    '--el-color-primary-light-8': '#fbd2e0',
    '--el-color-primary-light-9': '#fde9ef',
    '--el-color-primary-dark-2': '#ba184f'
  },
  blue: {
    '--el-color-primary': '#409eff',
    '--el-color-primary-light-3': '#409eff',
    '--el-color-primary-light-5': '#a0cfff',
    '--el-color-primary-light-7': '#c6e2ff',
    '--el-color-primary-light-8': '#d9ecff',
    '--el-color-primary-light-9': '#ecf5ff',
    '--el-color-primary-dark-2': '#337ecc'
  },
  purple: {
    '--el-color-primary': '#9847c4',
    '--el-color-primary-light-3': '#b77ed6',
    '--el-color-primary-light-5': '#cca3e2',
    '--el-color-primary-light-7': '#e0c8ed',
    '--el-color-primary-light-8': '#eadaf3',
    '--el-color-primary-light-9': '#f5edf9',
    '--el-color-primary-dark-2': '#7a399d'
  },
  orange: {
    '--el-color-primary': '#ffa726',
    '--el-color-primary-light-3': '#ffc167',
    '--el-color-primary-light-5': '#ffd393',
    '--el-color-primary-light-7': '#ffe5be',
    '--el-color-primary-light-8': '#ffedd4',
    '--el-color-primary-light-9': '#fff6e9',
    '--el-color-primary-dark-2': '#cc861e'
  }
}

export default function setTheme(params) {
  const localColor = localStorage.getItem('themeColor') || 'pink'
  const themeColor = params || localColor
  const el = document.documentElement
  for (let key in colors[themeColor]) {
    el.style.setProperty(key, colors[themeColor][key])
  }
  localStorage.setItem('themeColor', themeColor )
}

export function handleMode() {
  const { isFollow, modeType } = JSON.parse(localStorage.getItem('Mode'))
  const mode = new Date().getHours() >= 18 ? 'dark' : 'day'
  if (isFollow ) {
    document.getElementsByTagName('html')[0].className = mode
    changeMode(isFollow, mode)
  } else {
    document.getElementsByTagName('html')[0].className = modeType
  }
}

export function changeMode(isFollow, modeType) {
  const params = {isFollow, modeType}
  localStorage.setItem('Mode', JSON.stringify(params))
}

export function getMode(isFollow, modeType) {
  return JSON.parse(localStorage.getItem('Mode'))
}