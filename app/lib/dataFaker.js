const jsf = remote.require('json-schema-faker');

function dataFaker (schema, count, callback) {
  let data;
  try {
    data = JSON.parse(schema);
  } catch {
    callback(new Error('Input must be valid JSON'), null);
  }
  const promises = [];
  for (let i = 0; i < count; i +=1) {
    promises.push(jsf.resolve(data));
  }
  Promise.all(promises).then(json => {
    callback(null, json);
  }).catch(err => {
    callback(err, null);
  })
}

export default dataFaker; 