//Call dependencies for fs and inquirer
const fs = require('fs');
const inquirer = require('inquirer');

//Define filename
const filename = "newREADME.md";

//Prompts for info about the project
const questions = [
      //Add another confirm that shows if a README file already exists -- prompt whether or not to empty contents
   
      //Project title
      //Q1
      {
         type: 'input',
         message: 'What is the name of the project?',
         name: 'projectTitle',
         validate: function (input) {
            if (input.length < 5) {
               return 'Project title must be greater than 5 characters.';
            }
            return true;
         }
      },
   
   //Description
      //Q2
      {
         type: 'input', //Change back to 'editor' and re-enable validation once testing is done
         message: 'Enter a description of the project that is at least 3 lines:',
         name: 'projectDescription',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         // validate: function (text) {
         //    if (text.split('\n').length < 3) {
         //       return 'Description must be at least 3 lines.';
         //    }
         //    return true;
         // }
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
         type: 'input', //Change back to 'editor' if deemed necessary
         message: 'Provide instructions for installing the project. Use markdown formatting for multi-step instructions if necessary.',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         name: 'installation'
      },

   //Usage
      //Q5
      {
         type: 'input',//Change back to 'editor' if deemed necessary
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
               name: 'MIT License',
               checked: true
            },
            {
               name: 'ISC License'
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
         type: 'input', //Change back to 'editor' if deemed necessary
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
         type: 'input', //Change back to 'editor' if deemed necessary
         message: 'List collaborators with links to their GitHub profiles, attribute third-party assets and their creators, and link any tutorials or other resources.',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         name: 'credits',
         when: function (data) {
            return data.confirmCredits;
         }
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
         type: 'input', //Change back to 'editor' if deemed necessary
         message: 'Add instructions for testing the project. ',
         default: 'Edit contents here (removing these instructions), then save and close window to return to the program and continue.',
         name: 'testInstructions',
         when: function (data) {
            return data.confirmTests;
         }
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

//Function to write README file
function writeFile(data) {
   
   console.log(data);

//Functioning but not quite right version (works, but puts things out of order due to no async/promises)
   //Append title
   fs.appendFile(filename, 
      `# ${JSON.parse(JSON.stringify(data.projectTitle))}\n`, 
      (err) => {
         (err) ? console.error(err) : console.log("Title added successfully!")
      }
   );

   //Append description
   fs.appendFile(filename, 
      `### Description \n ${JSON.parse(JSON.stringify(data.projectDescription))}\n`, 
      (err) => {
         (err) ? console.error(err) : console.log("Description added successfully!")
      }
   );

   //Append TOC if confirm is true
   if (data.includeTOC === true) {
      fs.appendFile(filename, 
         `### Table of Contents \n - [Installation](#installation)\n - [Usage](#usage)\n - [License](#license)\n - [How to contribute](#contribute)\n - [Credits (conditional)](#credits)\n - [Test instructions (conditional)](#tests)\n - [Questions](#questions)\n `, 
         (err) => {
            (err) ? console.error(err) : console.log("TOC generated successfully!")
         }
      )
   };

   //Append installation instructions
   fs.appendFile(filename, 
      `### Installation \n ${JSON.parse(JSON.stringify(data.installation))}\n`, 
      (err) => {
         (err) ? console.error(err) : console.log("Installation instructions added successfully!")
      }
   );

   //Append usage instructions
   fs.appendFile(filename, 
      `### Usage \n ${JSON.parse(JSON.stringify(data.usage))}\n`, 
      (err) => {
         (err) ? console.error(err) : console.log("Usage instructions added successfully!")
      }
   );

   //Append licence info
   fs.appendFile(filename, 
      `### License \n Licensed under the following: ${JSON.parse(JSON.stringify(data.license.join(', ')))}\n`, 
      (err) => {
         (err) ? console.error(err) : console.log("License info added successfully!")
      }
   );

   //Append contribution instructions
   fs.appendFile(filename, 
      `### Contribute \n ${JSON.parse(JSON.stringify(data.contribution))}\n`, 
      (err) => {
         (err) ? console.error(err) : console.log("Contribution instructions added successfully!")
      }
   );

   //Append credits if confirm is true
   if (data.confirmCredits === true) {
      fs.appendFile(filename, 
         `### Credits \n ${JSON.parse(JSON.stringify(data.credits))}\n`, 
         (err) => {
            (err) ? console.error(err) : console.log("Credits added successfully!")
         }
      );
   } 
   
   //Append test instructions if confirm is true
   if (data.confirmTests === true) {
      fs.appendFile(filename, 
         `### Tests \n ${JSON.parse(JSON.stringify(data.testInstructions))}\n`, 
         (err) => {
            (err) ? console.error(err) : console.log("Test instructions added successfully!")
         }
      );
   }

   //Append questions
   fs.appendFile(filename, 
      `### Questions \n If you have any questions about the project, please feel free to message at **${JSON.parse(JSON.stringify(data.email))}**, or connect with me on GitHub: **[${JSON.parse(JSON.stringify(data.username))}](https://github.com/${JSON.parse(JSON.stringify(data.username))})** \n`, 
      (err) => {
         (err) ? console.error(err) : console.log("Questions section added successfully!")
      }
   );

}

//Function to initialize program
function init() {
   inquirer.prompt(questions).then((data) => {
      writeFile(data);
   })
}

//Function call to initialize program
init();