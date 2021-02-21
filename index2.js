//Call dependencies for fs, inquirer, and util
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

//Set alias for using util to asynchronously write a file
const asyncWrite = util.promisify(fs.writeFile);

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
      when: function (input) {
         return input.confirmCredits;
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
      when: function (input) {
         return input.confirmTests;
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
function generate(input) {
   
   console.log(input);

   // `# ${input.projectTitle}\n
   // ### Description \n ${input.projectDescription}\n`

   // if (input.includeTOC === true) {
   //    `### Table of Contents \n - [Installation](#installation)\n - [Usage](#usage)\n - [License](#license)\n - [How to contribute](#contribute)\n - [Credits (conditional)](#credits)\n - [Test instructions (conditional)](#tests)\n - [Questions](#questions)\n `
   // };

   // `### Installation \n ${input.installation}\n
   // ### Usage \n ${input.usage}\n
   // ### License \n Licensed under the following: ${input.license.join(', ')}\n
   // ### Contribute \n ${input.contribution}\n`

   // if (input.confirmCredits === true) {
   //    `### Credits \n ${input.credits}\n`
   // }

   // if (input.confirmTests === true) {
   //    `### Tests \n ${input.testInstructions}\n`
   // }
   
   // `### Questions \n If you have any questions about the project, please feel free to message at **${input.email}**, or connect with me on GitHub: **[${input.username}](https://github.com/${input.username})** \n`

}

//Function to initialize program 
function init() {
   inquirer.prompt(questions)
      .then(input => asyncWrite("filename", generate(input)))
      .catch(err => console.error(err));
}

//Function call to initialize program
init();