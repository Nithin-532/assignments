let hours = new Date().getHours();
let minutes = new Date().getMinutes();
let seconds = new Date().getSeconds();

function clockContinental() {
  seconds = seconds + 1;
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  if (minutes == 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours == 24) {
    hours = 0;
  }
  console.log(`${hours} : ${minutes} : ${seconds}`);
}

function clockAnalog() {
  seconds = seconds + 1;
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }
  if (minutes == 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours == 24) {
    hours = 0;
  }
  if (hours == 0) {
    console.log(`12 : ${minutes} : ${seconds} AM`)
  } else if (hours < 12) {
    console.log(`${hours} : ${minutes} : ${seconds} AM`);
  } else if (hours == 12) {
    console.log(`${hours} : ${minutes} : ${seconds} PM`);
  } else {
    console.log(`${hours - 12} : ${minutes} : ${seconds} PM`);
  }
}

// function clockContinental() {
//   let hours = new Date().getHours();
//   let minutes = new Date().getMinutes();
//   let seconds = new Date().getSeconds();
//   console.log(`${hours} : ${minutes} : ${seconds}`);
// }

// function clockAnalog() {
//   let hours = new Date().getHours();
//   let minutes = new Date().getMinutes();
//   let seconds = new Date().getSeconds();
//   if (hours == 0) {
//     console.log(`12 : ${minutes} : ${seconds} AM`)
//   } else if (hours < 12) {
//     console.log(`${hours} : ${minutes} : ${seconds} AM`);
//   } else if (hours == 12) {
//     console.log(`${hours} : ${minutes} : ${seconds} PM`);
//   } else {
//     console.log(`${hours - 12} : ${minutes} : ${seconds} PM`);
//   }
// }

function clock(cb) {
  setInterval(cb, 1000);
}

// function clock(cb) {
//   return new Promise(function(resolve) {
//     setInterval(function() { 
//       cb();
//     }, 1000);
//   })
// }

clock(clockAnalog);

// clock(clockContinental);
// clock(clockAnalog);