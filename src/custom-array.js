// pending to found a solution with extend Array
export default class CustomArray {
  constructor (array) {
    this.array = array
  }

  diff (array) {
    return this.array.filter(idx => array.indexOf(idx) < 0 )
  }
}
