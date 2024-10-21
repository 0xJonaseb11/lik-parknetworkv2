function sortTokenByNetwork(tokens) {
  const sortedList = tokens.sort((a, b) => {
    const networkNameA = a.networkId?.name.toLowerCase();
    const networkNameB = b.networkId?.name.toLowerCase();

    if (networkNameA < networkNameB) {
      return -1;
    }
    if (networkNameA > networkNameB) {
      return 1;
    }

    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  return sortedList;
}

module.exports = {
  sortTokenByNetwork,
};
