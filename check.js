const fs = require('fs')
const path = require('path')

const imgRoot = './img'
const jsonRoot = './json'
const imgExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']

// получить список категорий = список подпапок в ./img
function getCategories() {
  return fs.readdirSync(imgRoot).filter(folder => {
    const fullPath = path.join(imgRoot, folder)
    return fs.statSync(fullPath).isDirectory()
  })
}

// получить имена файлов без расширений из папки ./img/<category>
function getImageNames(category) {
  const folderPath = path.join(imgRoot, category)
  const files = fs.readdirSync(folderPath)
  return files
    .filter(file => imgExtensions.includes(path.extname(file).toLowerCase()))
    .map(file => path.parse(file).name)
}

// получить имена из JSON ./json/<category>.json
function getJsonNames(category) {
  const jsonPath = path.join(jsonRoot, `${category}.json`)
  if (!fs.existsSync(jsonPath)) return null
  const data = fs.readFileSync(jsonPath, 'utf8')
  try {
    const arr = JSON.parse(data)
    if (!Array.isArray(arr)) return null
    return arr.map(obj => obj.name)
  } catch {
    return null
  }
}

// найти дубликаты
function findDuplicates(arr) {
  const seen = new Set()
  const dupes = new Set()
  for (const item of arr) {
    if (seen.has(item)) dupes.add(item)
    else seen.add(item)
  }
  return [...dupes]
}

// основной проход по всем категориям
function compareAll() {
  const categories = getCategories()
  if (!categories.length) {
    console.log('Категории не найдены')
    return
  }

  for (const category of categories) {
    console.log(`\n--- Категория: ${category} ---`)

    const imgNames = getImageNames(category)
    const jsonNames = getJsonNames(category)

    if (jsonNames === null) {
      console.log(`❌ Нет валидного JSON: ./json/${category}.json`)
      continue
    }

    console.log(`🖼️  Картинок: ${imgNames.length}`)
    console.log(`📄 JSON-объектов: ${jsonNames.length}`)

    const imgDupes = findDuplicates(imgNames)
    const jsonDupes = findDuplicates(jsonNames)

    if (imgDupes.length) console.log('⚠️  Дубликаты изображений:', imgDupes)
    if (jsonDupes.length) console.log('⚠️  Дубликаты в JSON:', jsonDupes)

    const imgsNotInJson = imgNames.filter(name => !jsonNames.includes(name))
    const jsonNotInImgs = jsonNames.filter(name => !imgNames.includes(name))

    if (imgsNotInJson.length) console.log('🟥 Картинки без json-описания:', imgsNotInJson)
    if (jsonNotInImgs.length) console.log('🟦 JSON-имена без картинки:', jsonNotInImgs)
    if (!imgDupes.length && !jsonDupes.length && !imgsNotInJson.length && !jsonNotInImgs.length)
      console.log('✅ Всё чисто и синхронно')
  }
}

compareAll()
