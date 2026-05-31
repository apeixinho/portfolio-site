const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const deployDate = id => {
  let timeElement = document.getElementById(id);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = currentDate.getDate();
  timeElement.setAttribute('datetime', currentDate.toISOString());
  timeElement.setAttribute('datetime', currentDate.toISOString());
  timeElement.innerHTML = currentDay + " of " + currentMonth + ", " + currentYear
}

export { deployDate }
