export default class AddressParser {
  constructor (fullAddress) {
    this.fullAddress = fullAddress
  }

  parseStreet () {
    return this._commonParse()[0]
  }

  parseNeighborhood () {
    return this._commonParse()[1]
  }

  _commonParse () {
    let words = this.fullAddress.split(' ')
    let numberIndex = words.findIndex(word => /\d+/.test(word))
    let result = []

    result.push(words.slice(0, numberIndex + 1).join(' '))
    result.push(words.slice(numberIndex + 1).join(' '))

    return result
  }
}
