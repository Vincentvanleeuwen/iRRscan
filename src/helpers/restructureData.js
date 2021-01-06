export const restructureData = arr => {

  console.log(arr)

  return arr.reduce((acc, cur) => {

    let newPerson = null;
    let newDepartment = null;
    let newAddress = null;
    //Check if location matches another entries' location, return the index
    const itemIndex = acc.findIndex(item => console.log(item.people));
    // Check if index exists
    if(itemIndex === -1) {

      // Add capacity/chargingpointcapacity to this object
      acc['people'] = [];
      acc['departments'] = [];
      acc['addresses'] = [];

    }
    console.log('cur00', cur[0][0])
    cur[0][0].forEach(entry => {
      let collection = entry.AttributeCollection;

      // Change structure of object when theres only one or no item.
      if(!collection.length || collection.length === 1) {
        collection = []
        collection.push(entry.AttributeCollection.Attribute)
      }

      collection.forEach(attribute => {
        console.log(attribute)

        let correctType;

        if(attribute.AttributeClassReference === "iCOV_node_type"){
          if (attribute.Value === "PEOPLE") {
            console.log('Created new Person')
            correctType = {
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
            console.log('Created new Department')
            correctType = {
              id: null, // = [anb.xml] _DEPARTMENT_ID
              node_id: null, // = [anb.xml] iCOV_node_id
              name: null, // = [anb.xml] _DEPARTMENT_NAME
              managerID: null, // = [anb.xml] _MANAGER_ID
              relations: []
            };
          } else if (attribute.Value === "ADDRESS") {
            console.log('Created new Address')
            correctType = {
              node_id: null, // = [anb.xml] iCOV_node_id
              country: null, // = [anb.xml] _COUNTRY
              city: null, // = [anb.xml] _CITY
              street_address: null, // = [anb.xml] _STREET_ADDRESS
              postal_code: null, // = [anb.xml] _POSTAL_CODE
              from_date: null, // = [anb.xml] _FROM_DATE
              to_date: null, // = [anb.xml] _TO_DATE
              relations: []
            };

          } else {
            return
          }
        }

        // check for unique property position from a person to check if its a person.
        if (correctType.position) {
          console.log('yay new person', attribute);
        }
        // if (newDepartment !== {}) {
        //
        // }
        // if (newAddress !== {}) {
        //
        // }
        // if(attribute.AttributeClassReference === "_ID") {
        //   newPerson.id = +attribute.Value
        //   return newPerson;
        // }

      })

    })

    if(newPerson.id) {
      console.log('newperson before push', newPerson);
      acc.people.push(newPerson)
    }
    if(newDepartment.id) {
      acc.departments.push(newDepartment)
    }
    if(newAddress.node_id) {
      acc.addresses.push(newAddress)
    }

    console.log('acc', acc);
    return acc;
  }, []);

};
