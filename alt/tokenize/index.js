const _methods = require('./methods')
const _model = { abbreviations: require('./model/abbreviations') }

// turn a string input into a 'document' json format
const tokenize = function (document, world) {
  const { methods, model } = world
  const { splitSentences, splitTerms, splitWhitespace, termNormalize } = methods.tokenize
  if (typeof document === 'string') {
    // split into sentences
    let sentences = splitSentences(document, model)
    // split into word objects
    document = sentences.map(txt => {
      let terms = splitTerms(txt)
      terms = terms.map(str => {
        // split into [pre-text-post]
        let t = splitWhitespace(str)
        // add normalized term format
        t.normal = termNormalize(t.text)
        return t
      })
      return terms
    })
  }
  return document
}

const plugin = function (world) {
  let { methods, model, parsers } = world
  methods.tokenize = _methods
  Object.assign(model, _model)
  parsers.push(tokenize)
}
module.exports = plugin
