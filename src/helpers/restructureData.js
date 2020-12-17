// let newData = {
//   people: [],
//   companies: [],
//   addresses: []
// }

export const restructureData = arr => {

  let newPerson = {};
  let newDepartment = {};
  let newAddress = {};

  return arr.reduce((acc, cur) => {
    //Check if location matches another entries' location, return the index
    const itemIndex = acc.findIndex(item => console.log(item.people));
    console.log(itemIndex);
    console.log(acc)
    // Check if index exists
    if(itemIndex > -1) {

      // Add capacity/chargingpointcapacity to this object
      acc['people'] = {};
      acc['departments'] = {};
      acc['addresses'] = {};

      console.log(acc)
    }
    cur[0][0].forEach(entry => {

      entry.AttributeCollection.forEach(attribute => {

        if(attribute.AttributeClassReference === "iCOV_node_type"){
          if (attribute.Value === "PEOPLE") {
            newPerson = {
              id: null, // = [anb.xml] _ID
              node_id: null, // = [anb.xml] iCOV_node_id
              name: null, // = [anb.xml] _LABEL
              sex: null, // = [anb.xml] _SEX
              date_of_birth: null, // = [anb.xml] _DATE_OF_BIRTH
              date_of_death: null, // = [anb.xml] _DATE_OF_DEATH, if null = not dead.
              position: null, // = [anb.xml] iCOV_node_subtype
              department_id: null, // = [anb.xml] _DEPARTMENT_ID
              department_node_id: null, // = [anb.xml] iCOV_node_id
              relations: []
            };
          } else if (attribute.Value === "DEPARTMENT") {
            newDepartment = {
              id: null, // = [anb.xml] _DEPARTMENT_ID
              node_id: null, // = [anb.xml] iCOV_node_id
              name: null, // = [anb.xml] _DEPARTMENT_NAME
              managerID: null, // = [anb.xml] _MANAGER_ID
              relations: []
            };
          } else if (attribute.Value === "ADDRESS") {
            newAddress = {
              node_id: null, // = [anb.xml] iCOV_node_id
              country: null, // = [anb.xml] _COUNTRY
              city: null, // = [anb.xml] _CITY
              street_address: null, // = [anb.xml] _STREET_ADDRESS
              postal_code: null, // = [anb.xml] _POSTAL_CODE
              from_date: null, // = [anb.xml] _FROM_DATE
              to_date: null, // = [anb.xml] _TO_DATE
              relations: []
            };

          }
        }

        if(attribute.AttributeClassReference === "_ID") {

          newPerson.id = +attribute.Value
          return newPerson;
        }

      })


    })

    // let location = cur[3][1];
    // let capacity = +cur[0][1];
    // let chargingPoints = +cur[1][1];
    //
    // //
    //
    //   // Otherwise create a new entry



    if(newPerson.id) {
      acc.people.push(newPerson)
    }
    if(newDepartment.id) {
      acc.departments.push(newDepartment)
    }
    if(newAddress.id) {
      acc.addresses.push(newAddress)
    }

    //
    //   // Add capacity, chargingPointCapacity, and location to entry
    //   newItem.location = location;
    //   newItem.capacity += capacity;
    //   newItem.chargingPointCapacity += chargingPoints;
    //
    //   // Set the type of the entry
    //   if (!newItem.type) {
    //     // Check if town or city
    //     if (cities.includes(location)) {
    //       newItem.type = 'city';
    //     } else {
    //       newItem.type = 'town';
    //     }
    //   }
    //   acc.push(newItem);
    // }
    console.log(acc);
    return acc;
  }, []);

};
