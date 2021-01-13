import { pushRelations } from "@/helpers/pushRelations";

export const restructureData = arr => {

  return arr[0].reduce((acc, cur) => {

    //Check if location matches another entries' location, return the index
    const itemIndex = acc.findIndex(item => console.log(item.people));
    // Check if index exists
    if(itemIndex === -1) {

      // Add capacity/chargingpointcapacity to this object
      acc['people'] = [];
      acc['departments'] = [];
      acc['addresses'] = [];

    }

    cur[0].forEach(entry => {

      let collection;
      let correctType= null;

      if(entry.AttributeCollection) {
        collection = entry.AttributeCollection;
        // Change structure of object when theres only one or no item.
        if(!collection.length || collection.length === 1) {
          collection = []
          collection.push(entry.AttributeCollection.Attribute)
        }
      }

      collection.forEach(attribute => {

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
              relations: []
            };

          } else if (attribute.Value === "DEPARTMENT") {
            console.log('Created new Department')
            correctType = {
              id: null, // = [anb.xml] _DEPARTMENT_ID
              node_id: null, // = [anb.xml] iCOV_node_id
              name: null, // = [anb.xml] _DEPARTMENT_NAME
              managerID: null, // = [anb.xml] _MANAGER_ID
              locationID: null,
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

          }
        }

      })

      // Check if there is an address, person or company
      if (correctType) {

        // check for unique property position from a person to check if its a person.
        if (correctType.position === null) {

          let collection = entry.AttributeCollection;
          collection.forEach(attribute => {
            // Assign the values to the object. Turn string numbers into real numbers.
            switch (attribute.AttributeClassReference) {
              case '_ID': correctType.id = parseInt(attribute.Value)
                break;
              case '_DATE_OF_BIRTH': correctType.date_of_birth = attribute.Value
                break;
              case '_DATE_OF_DEATH': correctType.date_of_death = attribute.Value
                break;
              case 'iCOV_node_id': correctType.node_id = parseInt(attribute.Value)
                break;
              case 'iCOV_node_subtype': correctType.position = attribute.Value
                break;
              case '_LABEL': correctType.name = attribute.Value
                break;
              case '_DEPARTMENT_ID': correctType.department_id = parseInt(attribute.Value)
                break;
              case '_SEX': correctType.sex = attribute.Value
                break
            }
          })

          // Add new person to people array
          acc.people.push(correctType);
          // Clear the type so a new entry can use it.
          correctType = null;
        }
        // check for unique property managerID from a department to check if its a department.
        else if (correctType.managerID === null) {
          let collection = entry.AttributeCollection;
          collection.forEach(attribute => {

            // Assign the values to the object. Turn string numbers into real numbers.
            switch (attribute.AttributeClassReference) {
              case '_DEPARTMENT_ID': correctType.id = parseInt(attribute.Value)
                break;
              case 'iCOV_node_id': correctType.node_id = parseInt(attribute.Value)
                break;
              case '_MANAGER_ID': correctType.managerID = parseInt(attribute.Value)
                break;
              case '_DEPARTMENT_NAME': correctType.name = attribute.Value
                break;
              case '_LOCATION_ID': correctType.locationID = parseInt(attribute.Value)
                break;

            }
          })

          // Add the department to the departments array.
          acc.departments.push(correctType);

          // Clear the type so a new entry can use it.
          correctType = null;
        }
        // check for unique property city from a address to check if its a address.
        else if (correctType.city === null) {
          let collection = entry.AttributeCollection;
          collection.forEach(attribute => {
            // Assign the values to the object. Turn string numbers into real numbers.
            switch (attribute.AttributeClassReference) {
              case '_DEPARTMENT_ID': correctType.id = parseInt(attribute.Value)
                break;
              case 'iCOV_node_id': correctType.node_id = parseInt(attribute.Value)
                break;
              case '_COUNTRY': correctType.country = attribute.Value
                break;
              case '_CITY': correctType.city = attribute.Value
                break;
              case '_STREET_ADDRESS': correctType.street_address = attribute.Value
                break;
              case '_POSTAL_CODE': correctType.postal_code = attribute.Value
                break;
              case '_TO_DATE': correctType.to_date = attribute.Value
                break;
              case '_FROM_DATE': correctType.from_date = attribute.Value
                break;
            }
          })

          // Add the address to the addresses array.
          acc.addresses.push(correctType);

          // Clear the type so a new entry can use it.
          correctType = null;
        }
      }
    })

    // Add relations to each type
    arr[1][0][0].forEach(relation => {

      let relationEdges = relation.EdgesInSet[0]

      // If theres only one relationship, change the path
      if(!relationEdges) {
        relationEdges = relation.EdgesInSet.Edge;
      }

      pushRelations(acc.people, parseInt(relationEdges.FromNodeSID), parseInt(relationEdges.ToNodeSID), relationEdges.EdgeCategory);
      pushRelations(acc.departments, parseInt(relationEdges.FromNodeSID), parseInt(relationEdges.ToNodeSID), relationEdges.EdgeCategory);
      pushRelations(acc.addresses, parseInt(relationEdges.FromNodeSID), parseInt(relationEdges.ToNodeSID), relationEdges.EdgeCategory);

    });

    return acc;

  }, []);

};
