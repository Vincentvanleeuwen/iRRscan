export const addSchoolHistory = arr => {
  arr.people.forEach(person => {
    person.school_history.push(getRandomSchool())
  })
  return arr;
}

const getRandomSchool = () => {
  let randomNumber = Math.floor(Math.random()* 5) +1;
  switch (randomNumber) {
    case 1: return {school: "Universiteit van Amsterdam", level: "WO", startDate: 1985, endDate: 1991}
    case 2: return {school: "Hogeschool van Amsterdam", level: "HBO", startDate: 1990, endDate: 1994}
    case 3: return {school: "ROC", level: "MBO", startDate: 1990, endDate: 1994}
    case 4: return {school: "Bernard College", level: "HAVO", startDate: 2000, endDate: 2005}
    case 5: return {school: "Bernard College", level: "VMBO", startDate: 2000, endDate: 2006}
  }
}
