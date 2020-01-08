const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const deployDate = id => {
  let timeElement = document.getElementById(id);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = currentDate.getDate();
  timeElement.innerHTML = currentDay + " of " + currentMonth + ", " + currentYear
  // timeElement.innerHTML = date;
}

// const myAge = id => {
//   let my_age_el = document.getElementById(id);
//   const birthday = new Date("1979-07-12");
//   const ageDifMs = Date.now() - birthday.getTime();
//   const ageDate = new Date(ageDifMs); // miliseconds from epoch
//   my_age_el.insertAdjacentText('afterbegin', Math.abs(ageDate.getFullYear() - 1970) + ' years old');
// }

//export {myAge}
export {
  deployDate
  //, myAge
}
