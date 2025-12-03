import { useState } from 'react';
import './App.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

function App() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    peopleCount: '',
    activity: '',
    timeSpent: '',
    recommend: '',
  });
  const totalSteps = 5; // Total number of steps/screens for the progress bar

  // Append digit when button clicked
  const handlePeopleButtonClick = (num) => {
    setAnswers(prev => ({ ...prev, peopleCount: prev.peopleCount + num.toString() }));
  };

  const handlePeopleChange = (e) => {
    setAnswers(prev => ({ ...prev, peopleCount: e.target.value }));
  };

  const handleActivityChange = (value) => {
    setAnswers(prev => ({ ...prev, activity: value }));
  };

  const handleTimespentChange = (value) => {
    setAnswers(prev => ({ ...prev, timeSpent: value }));
  };
  
  const handleRecommend = (value) => {
    setAnswers(prev => ({ ...prev, recommend: value }));
  };

  const handleSubmit = () => {
    setStep(step + 1); // Move to next step (screen)
  };

  const goBackHomepage = () => {
    setStep(1);
    setAnswers({ 
      peopleCount: '', 
      activity: '', 
      timeSpent: '', 
      recommend: '' }); // Reset answers
  };

  const progress = ((step - 1) / (totalSteps - 1)) * 100; // Calculate progress percentage to display

  return (
    <div>

       <div className='bar-progress'>
        <div
          className='bar-fill'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className='progress-text'>{Math.round(progress)}% completed</p>

      {step === 1 && (
        <>
          <h1>How many people do you see playing in the field?</h1>
          <input
            type="text"
            value={answers.peopleCount}
            onChange={handlePeopleChange}
          />
          <div>
            {[0,1,2,3,4,5,6,7,8,9].map(num => (
              <button
                className='digit-btn'
                key={num}
                onClick={() => handlePeopleButtonClick(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className='submit-btn'
            disabled={answers.peopleCount === ''}
          >
            Submit
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1>What kind of activity are most people doing?</h1>
          <div className='button-card-container'>
            {['Sitting, resting', 'Stretching, mild activity', 'Vigorous movement'].map(act => (
              <button
                className={`card-btn ${answers.activity === act ? 'selected' : ''}`}
                key={act}
                onClick={() => handleActivityChange(act)}
              >
                {act}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className='submit-btn'
            disabled={answers.activity === ''}
          >
            Submit
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h1>On average, how long do you spend exercising/hanging out at this location?</h1>
          <div className='button-card-container'>
            {['Maximum 30 minutes', 'Around an hour', 'More than 1.5 hour'].map(act => (
              <button
                className={`card-btn ${answers.timeSpent === act ? 'selected' : ''}`}
                key={act}
                onClick={() => handleTimespentChange(act)}>
                {act}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className='submit-btn'
            disabled={answers.timeSpent === ''}
          >
            Submit
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <h1>Would you recommend this football field to a friend?</h1>
          <div className='button-card-container'>
            <button
              className={`card-btn ${answers.recommend === 'Yes' ? 'selected' : ''}`}
              onClick={() => handleRecommend('Yes')}
            >
              <FaThumbsUp size={60} />
              <span>Yes</span>
            </button>

            <button
              className={`card-btn ${answers.recommend === 'No' ? 'selected' : ''}`}
              onClick={() => handleRecommend('No')}
            >
              <FaThumbsDown size={60} />
              <span>No</span>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className='submit-btn'
            disabled={answers.recommend === ''}
            style={{ marginTop: 20 }}
          >
            Submit
          </button>
        </>
      )}

      {step === 5 && (
        <>
        <h1>Thank you for making the area better!</h1>
        <p>Last year, 124 community’s answers contributed to the expansion of the Spoorpark.</p>
        <p>Scan for a chance to win €15 <b>bol.com</b> giftcard</p>
        <button 
        className='submit-btn'
        onClick={() => goBackHomepage()}>Next input</button>
        </>
      )}
    </div>
  );
}

export default App;
