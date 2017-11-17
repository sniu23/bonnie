import Schema from 'async-validator'
import { Message } from 'element-ui'

export function validate(descriptor, source, option) {
  const validator = new Schema(descriptor)
  return new Promise((resolve, reject) => {
    validator.validate(source, option, (errors, fields) => {
      let result = true
      if (errors) {
        let html = ''
        errors.forEach(function(item) {
          html += '<li>' + item.message + '</li>'
        })
        html = '<ul style="list-style-type: none">' + html + '</ul>'
        Message({
          dangerouslyUseHTMLString: true,
          message: html,
          type: 'warning',
          duration: 5 * 1000
        })
        result = false
      }
      resolve(result)
    })
  })
}
