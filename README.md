# iCOV

iCOV heeft ons gevraagd om hun huidige relatiescan te verbeteren. De huidige relatiescan bestaat uit een groot netwerk van iconen die aangeven wat de relaties tussen personen en adressen zijn. Het voldoet niet aan de visuele en ux eisen die iCOV stellen. 

Ons idee is om alle relatietypes op te splitsen en weer te geven in een Cleveland Plot. Hiernaast geven we de gebruiker ook de mogelijkheid om twee personen met elkaar te vergelijken. Je ziet dan de gedeelde relaties tussen deze twee personen.
Ook tonen wij een handig filter om zo makkelijk het profiel waar je naar op zoek bent te kunnen identificeren.

## Data

Van iCOV hebben wij drie datasets aangeleverd gekregen. In deze .xml bestanden stond veel informatie dat alleen bij Analyst's notebook bruikbaar is. 
Ik heb de data getransformeerd naar de volgende layout:

```jsx
[
  addresses: [
    {
      node_id: null, // = [anb.xml] iCOV_node_id
      country: null, // = [anb.xml] _COUNTRY
      city: null, // = [anb.xml] _CITY
      street_address: null, // = [anb.xml] _STREET_ADDRESS
      postal_code: null, // = [anb.xml] _POSTAL_CODE
      from_date: null, // = [anb.xml] _FROM_DATE
      to_date: null, // = [anb.xml] _TO_DATE
      relations: [
        [node_id, node_id, relationType]
      ] 
    }
  ],
  companies: [
    {
      id: null, // = [anb.xml] _DEPARTMENT_ID
      node_id: null, // = [anb.xml] iCOV_node_id
      name: null, // = [anb.xml] _DEPARTMENT_NAME
      managerID: null, // = [anb.xml] _MANAGER_ID
      locationID: null,
      relations: [
        [node_id, node_id, relationType]
      ] 
    }
  ],
  people: [
    {
      id: null, // = [anb.xml] _ID
      node_id: null, // = [anb.xml] iCOV_node_id
      name: null, // = [anb.xml] _LABEL
      sex: null, // = [anb.xml] _SEX
      date_of_birth: null, // = [anb.xml] _DATE_OF_BIRTH
      date_of_death: null, // = [anb.xml] _DATE_OF_DEATH, if null = not dead.
      position: null, // = [anb.xml] iCOV_node_subtype
      department_id: null, // = [anb.xml] _DEPARTMENT_ID
      school_history: [],
      relations: [
        [node_id, node_id, relationType]
      ] 
    }
  ],
]

```
          

## Main Packages used
- [D3@6.3.1](https://www.npmjs.com/package/d3)
- [Vue.js@3.0.0](https://www.npmjs.com/package/vue)
- [Vue Router@4.0.0](https://unpkg.com/vue-router@next)
- [PrimeVue@3.0.2](https://www.npmjs.com/package/primevue)

## Installatie Handleiding

Clone de repository of download te zip op je computer.
```terminal

  > git clone https://github.com/Vincentvanleeuwen/iRRscan.git
 ```
 
Type de volgende code in om het project op te starten

```terminal

  
  > cd iRRscan
  
  // Watch for changes
  > npm run serve
  
  OR 
  // Build the app and minify project for production
  > npm run build
  
  OR
  // Run the linter
  > npm run lint
  
```

Je kunt nu het project bekijken op localhost:8080/

## Live Voorbeeld

icov-relatiescan.netlify.app

![Vue D3 iCOV](https://github.com/Vincentvanleeuwen/iRRscan/blob/main/src/assets/img/preview.png)

## Bronnen

- [Prime Vue](https://www.primefaces.org/primevue/showcase/#/)
- [D3 Cleveland Plot](https://www.d3-graph-gallery.com/graph/lollipop_cleveland.html)
- [How to get an age from a birthdate](https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd)

License: [MIT]
