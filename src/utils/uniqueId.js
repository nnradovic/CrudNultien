const uniqueId = comments => {
  let idExsistArray = [];
  comments.map(comment => {
    return idExsistArray.push(comment.id);
  });
  let idNew = () => {
    if (idExsistArray.length !== 0) {
      return Math.max(...idExsistArray) + 1;
    } else {
      return 1;
    }
  };
  return idNew();
};

export default uniqueId;
