//Call dependencies
   //Require fs
   const fs = require('fs');
   //Require inquirer
      //Refer to examples in the documentation repo for implementing the corresponding prompts (remove this comment before submitting)
   const inquirer = require('inquirer');

//Prompt for info about the repo
   const questions = [
      //Add another confirm that shows if a README file already exists -- prompt whether or not to empty contents
   
      //Project title
      //Q1
      {
         type: 'input',
         message: 'What is the name of the project?',
         name: 'projectTitle',
         validate: function (input) {
            if (input.length < 10) {
               return 'Project title must be greater than 10 characters.';
            }
            return true;
         }
      },
   
   //Description
      //Q2
      {
         type: 'editor',
         message: 'Enter a description of the project that is at least 3 lines:',
         name: 'projectDescription',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         validate: function (text) {
            if (text.split('\n').length < 3) {
               return 'Description must be at least 3 lines.';
            }
            return true;
         }
      },

   //Table of contents
      //Links to other sections of README
      //This isn't input by user -- it gets generated from the functionality itself, but prompt user to include or not
      //Q3
      {
         type: 'confirm',
         message: 'Do you want a table of contents?',
         name: 'includeTOC',
      },


   //Installation instructions
      //Q4
      {
         type: 'editor',
         message: 'Provide instructions for installing the project. Use markdown formatting for multi-step instructions if necessary.',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         name: 'installation'
      },

   //Usage
      //Q5
      {
         type: 'editor',
         message: 'Provide instructions for using the application. Use markdown formatting for multi-step instructions and linking screenshots.',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         name: 'usage'
      },


   //License info (list of options)
      //Populate corresponding badge and notice; include a 'none' option
      //Q6
      {
         type: 'checkbox',
         message: 'What licence(s) should be referenced? Select "None" if the desired option is not listed and manually add it later.',
         name: 'license',
         choices: [
            {
               name: 'MIT',
               checked: true
            },
            {
               name: 'ISC'
            },
            {
               name: 'Apache License 2.0'
            },
            {
               name: 'GNU GPLv3'
            },
            {
               name: 'None'
            }
         ],
         // validate: function (answer) {
         //    if (answer.length > 1 && answer[4].checked === true) {
         //       return '"None" cannot be selected when one or more other selections are active.'
         //    }
         //    return true
         // }
      },


   //Contribution guidelines
      //Q7
      {
         type: 'editor',
         message: 'Provide details on how others can contribute to the project. ',
         name: 'contribution',
         default: 'Please email me at {enter your email} if you would like to contribute' 
      },

   //Credits
      //Q8
      {
         type: 'confirm',
         message: 'Do you have any collaborators or other attributions to acknowledge?',
         name: 'confirmCredits'
      },   
   

      //Q9
      {
         type: 'editor',
         message: 'List collaborators with links to their GitHub profiles, attribute third-party assets and their creators, and link any tutorials or other resources.',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         name: 'credits'
      },


   //Test instructions
      //Q10
      {
         type: 'confirm',
         message: 'Does the project have test instructions? (y/N)',
         name: 'confirmTests'
      },   

      //Q11
      {
         type: 'editor',
         message: 'Add instructions for testing the project. ',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         name: 'testInstructions'
      },

   //Questions section
      //Q12
      {
         type: 'prompt',
         message: 'Enter your GitHub username: ',
         name: 'username'
      },

      //Q13
      {
         type: 'prompt',
         message: 'Enter email address users and contributers can reach you at: ',
         name: 'email'
      }
   ]

//Initiate prompts
// inquirer.prompt(questions).then((response) => {
//    fs.appendFile("READMEtest.md", `section: ${JSON.stringify(response)}\n`, (err) => {
//       (err) ? console.error(err) : console.log("README generated successfully!")
//    });
// });

//Actually -- probably would be easier to have the above block (47-51) run with each prompt, wouldn't it? So do inquirer.prompt(questions[0]) ... and append each piece in that way for each question index?

inquirer.prompt(questions[0]).then((response) => {
   fs.appendFile("NewReadmeTest.md", `## ${JSON.parse(JSON.stringify(response.projectTitle))}\n *** \n`, (err) => {
      (err) ? console.error(err) : console.log("Q1 response logged successfully!")
   });
});