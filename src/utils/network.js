export default function dataToFormData(data) {
  var str = ``
  Object.keys(data).forEach(key => {
    str += `${key}=${data[key] ? data[key] : ''}&`
  })
  return str.slice(0, length - 1)
}
