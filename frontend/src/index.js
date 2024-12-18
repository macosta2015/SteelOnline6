import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EmailList from './components/email/email.js';
import DisplayEmails from './components/email/displayemail.js';
import EmailSender from './components/email/emailsender.js';
import EmailRestAPI from './components/email/EmailRestAPI.js';
import App from './App.js';
import EmailManager from './components/email/EmailManager.js'; // Import the combined EmailManager component


const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
  // Manage the email list and refresh state
  const [emailRefreshTrigger, setEmailRefreshTrigger] = useState(false); // To trigger re-fetching of emails
  const [emailList, setEmailList] = useState([]);

  // Trigger to refresh email display when a new email is added
  const handleEmailAdded = () => {
    setEmailRefreshTrigger(prev => !prev); // Toggle the state to refresh `DisplayEmails`
  };

  return (
    <>
      <EmailRestAPI />

      <EmailRestAPI />
      <App />
      <EmailSender />
      <EmailList emailList={emailList} setEmailList={setEmailList} onEmailAdded={handleEmailAdded} />
      {/* DisplayEmails will re-fetch whenever emailRefreshTrigger changes */}
      <DisplayEmails emailRefreshTrigger={emailRefreshTrigger} />
      <EmailManager /> Render the new combined EmailManager component
      <EmailManager /> Render the new combined EmailManager component


    </>
  );
}

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);


