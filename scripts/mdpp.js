const fs = require('fs')
const lineReader = require('line-reader');

const inputfn = process.argv[2]
const outputfn = process.argv[3]

var output = fs.createWriteStream(outputfn, { flags: 'w+' })

lineReader.eachLine(inputfn, function(line) {
  if (line.startsWith('{"gitdown":')) 
    output.write(transform(line))
  else
    output.write(line + '\n')
})

function transform(line) {
  let result = null
  const obj = JSON.parse(line)
  if (obj.gitdown === 'include') {
    result = fs.readFileSync(obj.file) + '\n'
  }
  return result
}