import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content parts={course.parts} />
      <Total total={course.parts}> </Total>
    </div>
  );
};

export default Course;
