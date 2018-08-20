import React from 'react';

const About = () => {
  return(
    <div className="starter-template">
      <div className="about" >
        <h1>About MathPay</h1>
        <h2>Reason</h2>
        <p className="lead">
          For years, one of my primary struggles as a teacher has been motivation.
          I know that students are supposed to be intrinsically motivated to succeed,
          but the reality is that we all like a little bit of a tangible payout for
          our efforts.  For this reason, I have implemented a reward system this year for my
          class.  Students will be able to earn digital tokens in a few different
          ways.
        </p>
        <h2>Earning MathPay</h2>
        <ol className="lead">
          <li>Show up to class and be on time.  Every day that you show up on time, you will earn <strong>1 MathPay Token</strong></li>
          <li>Do Google Classroom assignments.  Certain teacher selected assignments will pay 10% of the total grade.  For example, a 100 would pay <strong>10 MathPay Tokens</strong>.</li>
          <li>Solve math problems.  For each unit, I will post problems on this site.  The reward starts at <strong>10 MathPay Tokens</strong> and increases until someone gets it right.</li>
          <li>Get and fulfill a classroom job.</li>
        </ol>
        <h2>Using MathPay</h2>
        <p className="lead">
          You will login to the app with your Google account.  All of your tokens are stored
          against your username.  They will stay in your account when you logout.  The app
          runs on a test cryptocurrency network, which you don't need to understand, except for
          the fact that you pay transaction fees when you make a purchase, usually just <strong>1 MathPay Token</strong>.
        </p>
        <p className="lead">
          You can buy physical goods, like candy and giftcards from the store tab.  If you buy
          a physical thing, then you will need to show me your receipt, which is emailed to you
          after your purchase, and I will hand the goods over.  If it's a digital good, like a
          music jukebox token, then you will receive it right away.
        </p>
        <p className="lead">
          In some ways, this app is a work in progress.  If you discover a glitch
          or a bug, please let me know by telling me or emailing wbasinger@villagetechschools.org.
        </p>
      </div>
    </div>
  )
}

export default About;
