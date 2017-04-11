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
      'Detail Address': 'J A Mozo 2144',
      'Holder Name': 'Juan Perez'
    }
  ],
  multipleRowsWithEmptyValues: [
    {
      'Province': 'Nuevo Leon',
      'City': '',
      'Detail Address': 'Rio Guadalquivir #422, Del Valle',
      'Holder Name': 'Jesús Lerma'
    }, {
      'Province': 'Nuevo Leon',
      'City': 'Monterrey',
      'Detail Address': '',
      'Holder Name': 'Juan Perez'
    }
  ],
  matcherConfigurations: {
    simple: {
      'A': { type: 'match', value: 'Province' },
      'B': { type: 'match', value: 'City' },
      'C': { type: 'match', value: 'Detail Address' },
      'D': { type: 'match', value: 'Holder Name' }
    },
    fixed: {
      'A': { type: 'match', value: 'Province' },
      'B': { type: 'match', value: 'City' },
      'C': { type: 'match', value: 'Detail Address' },
      'D': { type: 'match', value: 'Holder Name' },
      'E': { type: 'fixedvalue', value: 'Any Value' }
    },
    addressesMatch: {
      'A': { type: 'match', value: 'Province' },
      'B': { type: 'match', value: 'City' },
      'C': { type: 'match', value: 'Detail Address' },
      'D': { type: 'match', value: 'Holder Name' },
      'E': { type: 'transformStreet', value: 'Detail Address' },
      'F': { type: 'transformNeighborhood', value: 'Detail Address' }
    },
    emptyTransformation: {
      'A': { type: 'match', value: 'Province' },
      'B': { type: 'match', value: 'City' },
      'C': { type: 'match', value: 'Detail Address' },
      'D': { type: 'match', value: 'Holder Name' },
      'emptyValues': { value: 'na' }
    }
  }
}
