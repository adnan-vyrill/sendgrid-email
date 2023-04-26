// const client = require('@sendgrid/client');
// client.setApiKey('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');


const messageScript = [
  `Hi --name--,\r\n\r\nGreetings for the New Year 2023 :)\r\n
It was really amazing to be part of MWC Barcelona and 4YFN 2023, I wanted to meet you in-person at MWC but due to my busy schedule didn't get the chance. Let's catch up here to explore possible collaboration opportunities to work together?\r\n
We offer digital transformation with managed delivery, IT staff augmentation, Outsourcing/Outstaffing and recruitment services for our clients in the EU and the US i.e. Startups, SME's and Fortune 500. Possible areas for collaboration could be Web 3.0, Blockchain, Cloud & DevOps, Ecommerce Solutions, ERPs/CRMs, Big Data, Business Intelligence, Fintech, Payment Solutions, Mobile Apps, AI/ML, AR/VR/MR etc\r\n
We can also provide you with Top 3% remote/on-site developers for long-term (full-time engineers) and short-term (contractors 3-12 months) projects in different business verticals in the US, Europe and Asia. Our rates start from $15/hr for Asian, $40/hr for EU and $65/hr for US devs with 2 weeks free trial.\r\n
Also, I would love to hear about your business, and find any opportunities to work together?\r\n
Do you have any upcoming projects in 2023 or looking to extend your team?, let's connect and grab a coffee for a 15-mins meeting: https://calendly.com/aboota/15-min-meeting\r\n
P.S. If you are not the right person, could you please forward it to the appropriate person? Thank you!\r\n
Thanks,
Adnan Boota | CEO
IYRIX TECHNOLOGIES
180 Steuart St, San Francisco, CA 94105
C/ d'Holanda, 59, 08917 Barcelona, Spain\r\n
M: +1 415 907 7575 | +34 632 504 743
adnan@iyrix.com | iyrix.com`,

  `Hi --name--, how are you doing?\r\n
I'm sure you're busy and wanted to make sure this didn't get buried!\r\n
Would love to know about your business, and your feedback about the previous email?`,

  `Hi --name--, how are you?\r\n
I think there could be many possible opportunities where we can work together and grow. Recently, we helped Telrock Systems. a London based B2B SaaS Platform for Banks, hiring a team of 4 developers within 1 month saving them $120k annually.\r\n
We can send you our complete working models with pricing starts at $15/hr. Do you have any upcoming projects in 2023 or looking to extend your team?, let's connect and grab a coffee for a 15-mins meeting: https://calendly.com/aboota/15-min-meeting`,

  `Hi --name--, did you get my previous message?\r\n
Just following up here as one of our clients requested another full-time full-stack engineer ready to start work within one week, which resulted in saving him $40k annually.\r\n
Would love to do similar for you. We can provide solutions with managed delivery or Top 3% Developers available for interview from US, Europe and Asia ready to join your company in 2-4 weeks.Please confirm, so we can send you our complete working models with pricing.\r\n
Happy to jump on a quick call to share more details, we can help you with your ongoing/upcoming projects or scale your team, let's connect and grab a coffee for a 15-mins meeting: https://calendly.com/aboota/15-min-meeting`,

  `Hi --name--, just bumping this message up in your inbox so that you couldn't lose our offer.\r\n
We have the resources to assemble a team of highly advanced software engineers, PM, and QA specialists for you. Our model will allow you to maximize the efficiency of your team.\r\n
Are you looking to extend your team or have any ongoing/upcoming projects in 2023?, let's connect and grab a coffee for a 15-mins meeting: https://calendly.com/aboota/15-min-meeting`,


  `Hi --name--, is this a good time to talk?\r\n
If it's not a good time, maybe we can catch up after some time, let's say 3 months or 6 months? Please confirm!\r\n
Please feel free to schedule a meeting in future (3 or 6 months), so we can help you grow: https://calendly.com/aboota/15-min-meeting`

];

// load emails from excel sheet
// check reply detection
// update there with variables

const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

let inputStream = Fs.createReadStream('mwc23-exhibitors.csv', 'utf8');
const results = [];


inputStream
  .pipe(new CsvReadableStream({ skipLines: true, parseNumbers: true, parseBooleans: true, trim: true }))
  .on('data', function (row) {
    results.push(row);
    // console.log('A row arrived: ', row);
  })
  .on('end', function () {
    console.log('No more rows!');
    console.log('----------------------------------');

    const emails = results.map(k => k[0]);
    const firstName = results.map(k => k[1]);
    // console.log(results.map(k => { return { email: k[0], name: k[1] } }));
    // sendEmails('MWC23 Barcelona Connect', emails, firstName);
    sendEmails();
  });





// return messageStyle(1);

const sendAccount = {
  email: 'adnan@iyrix.com',
  name: 'Adnan Boota'
};


const testData = {
  subject: 'LEAP Tech 2023 Business',
  to: [
    ['inshallah_1@yahoo.com', 'Adnan'],
    ['i.moazzam.boota@gmail.com', 'Moazzam'],
    ['i.adnan.boota@gmail.com', 'Iyrix Tech']]
};


const sendEmails = (subject = testData.subject, to = testData.to) => {

  const personalizations = to.map(k => {
    return {
      to: { email: k[0], name: k[1] },
      "substitutions": { 'name': k[1] }
    }
  })

  console.log(personalizations);
  // return '';

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey('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');
  sgMail.setSubstitutionWrappers('--', '--');

  const msg = {
    personalizations: personalizations,
    from: sendAccount,
    replyTo: sendAccount,
    subject: subject,
    // text: messageScript[1],
    content: [
      {
        type: "text/plain",
        value: messageScript[3]
      }
    ],
    sendAt: 1682484498,
    // headers: {},

  }
  sgMail
    // .send(msg)
    .sendMultiple(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
};


const messageStyle = (key) => {

  switch (key) {
    case 0:
      return messageScript[key];
    default:
      var messageThread = messageScript[key];
      for (let i = key - 1; i >= 0; i--) {
        messageThread = messageThread + `\r\n\r\n----\r\n\r\n` + messageScript[i];
        // console.log(`Iteration is #${i}`);
      }
      console.log(messageThread);
      return messageThread;
  }
};