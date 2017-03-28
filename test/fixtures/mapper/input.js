export default {
  multipleRows: [
    {
      'Province': 'Nuevo Leon',
      'City': 'San Pedro',
      'Detail Address': 'Rio Guadalquivir #422, Del Valle',
      'Holder Name': 'Jesús Lerma'
    }, {
      'Province': 'Nuevo Leon',
      'City': 'Monterrey',
      'Detail Address': 'J A Mozo',
      'Holder Name': 'Juan Perez'
    }
  ],
  matcherConfigurations: {
    simple: {
      'A': { type: 'match', value: 'Province' },
      'B': { type: 'match', value: 'City' },
      'C': { type: 'match', value: 'Detail Address'},
      'D': { type: 'match', value: 'Holder Name'}
    }
  }
}