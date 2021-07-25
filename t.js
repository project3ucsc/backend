// const moment = require('')

const d = new Date("2021-07-24T03:40:00.000Z");
console.log(
  d.toLocaleTimeString([], {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  })
);
