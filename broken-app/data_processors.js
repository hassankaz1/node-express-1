function processData(result) {
  return result.map((r) => r.value.data);
}

module.exports = {
  processData,
};
