import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import css from './App.module.css';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);  

  const onHandleClick = event => {
    const buttonName = event.target.name;
    switch (buttonName) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        console.log(`Ooops... error ocured.`);
    }
  };
  
  const countTotalFeedback = () => {
    return [good, neutral, bad].reduce((totalValue, value) => totalValue + value, 0);
  };
  
  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback() ? Math.round(good / countTotalFeedback() * 100) : '0';
  }
  
    return (
      <div className={css.container}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={onHandleClick}
          />
        </Section>

        <Section title="Statistics">
          {countTotalFeedback() === 0 ? (<Notification message="There is no feedback"/>) : 
          (<Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />)
          }
        </Section>
      </div>
    );
  }