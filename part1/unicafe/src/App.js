import { useState } from "react";

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  return (
    <>
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}>
        {" "}
      </StatisticLine>
      <StatisticLine
        text="% of good:"
        value={`${(good / (good + bad + neutral)) * 100}%`}
      ></StatisticLine>
      <StatisticLine
        text="% of bad:"
        value={`${(bad / (good + bad + neutral)) * 100}%`}
      ></StatisticLine>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood}>good</Button>
      <Button onClick={handleNeutral}>neutral</Button>
      <Button onClick={handleBad}>bad</Button>
      <h1>statistics</h1>
      {!good && !neutral && !bad ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <Statistics good={good} bad={bad} neutral={neutral} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
