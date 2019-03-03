# PTV API signature generator

Hacked together a method for the API signature generation only

If you are after a full fledged swagger client implementation see [ptv-api npm](https://www.npmjs.com/package/ptv-api)

## Requirements

First obtain a dev id and key from PTV [here](https://www.ptv.vic.gov.au/footer/data-and-reporting/datasets/ptv-timetable-api/)

If using in the browser - Please consider that you will need to support the crypto nodejs module. A polyfil exists [here](https://www.npmjs.com/package/webcrypto)

## Example usage

```javascript
const ptvSig = require ('ptv-api-signature')
const BASE_URL = 'http://timetableapi.ptv.vic.gov.au'
const DEV_ID  =  'REPLACE'
const DEV_KEY =  'REPLACE1-1111-1111-1111-111111111111'

/**
* Search for stops based on search term
* @param {String} search_term
*/
const getStopsBySearchTerm = (search_term)  =>  {
return fetch(`${BASE_URL}${ptvSig.pathWithSig(`/v3/search/${search_term.toLowerCase()}`,  [{ name:  'route_types', value:  '0'  }], DEV_ID, DEV_KEY)}`).then(res  =>  res.json())
}

getStopsBySearchTerm('Balaclava').then(d => {
  console.log(d)
})

```
