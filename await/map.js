function asyncThing (value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), 100)
  })
}

// async function main () {
//   return [1,2,3,4].map(async (value) => {
//     const v = await asyncThing(value)
//     console.log('v='+v);
//     return v * 2
//   });
// }
//
// main()
//   .then(v => {
//     console.log(v);
//     // Promise.all(v)
//   })
//   .catch(err => console.error(err))

Promise.resolve([1,2,3,4].map(async (value) => {
  const v = await asyncThing(value)
  console.log('v='+v);
  return v * 2
})).then(v => {
    console.log(v);
    // Promise.all(v)
  })
  .catch(err => console.error(err))
