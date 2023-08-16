const Total = ({ total }) => {
  return (
    <strong>
      Total of exercises:{" "}
      {total
        .map((element) => element.exercises)
        .reduce((accumulator, currentvlue) => accumulator + currentvlue, 0)}
    </strong>
  );
};

export default Total;
