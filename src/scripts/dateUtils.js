const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const deployDate = id => {
  const timeElement = document.getElementById(id);
  if (!timeElement) return;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = currentDate.getDate();
  timeElement.setAttribute('datetime', currentDate.toISOString());
  timeElement.textContent = currentDay + " of " + currentMonth + ", " + currentYear
}

export { deployDate }
