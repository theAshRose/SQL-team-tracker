# SQL-team-tracker:

## Description

Here we have a wonderful, wonderful managerial tool. [Here is a link to the application](https://thedomconrad.github.io/employee-sum/)
With this tool one may store and organize employees, roles and departments. You may use this command prompt program to edit them as well. Enjoy! 

NOTE: If you will take a look at the code you will notice our functions are NOT camelCase. This is done by design - read more about it in the code snippet below!

## How to use

Type 'node index.js' into your cammand line to get started. For help, refer to this short and sweet [video](https://youtu.be/rEool94YysA). You may view employees, departments and roles in a number of different ways - as well as add them! Functionality to delete is intended to be added but for now this MVP works sweetly and with no bugs :).

## Screenshot of app result

![screenshot](https://cdn.discordapp.com/attachments/408481106040717322/1037230359290589184/unknown.png)

## the Code!
Here we are showcasing the function which calls all of our mySQL, prompts and functions to trigger! Most people did a series of 'if' statements or some sort of switch case. What was done here is the user can select from choices in the initial prompt. Their choice gets broken down to lower case, the spaces all removed and then parenthesis added to the end. That string is then executed as a function using the eval() method. Therefore the rest of our functions which trigger other prompts and mySQL are all in lower case. This is unconventional but i thought it was fun and creative. 


```
           function prompt1() { //this function is the reason most of our functions are NOT camelCase
    inquirer.prompt(initialPrompt).then(userInput => {
        let promptVal = Object.values(userInput) //
        let babyFunction = promptVal.toString().toLowerCase().replace(/\s/g, '') + "()"//getting that value ready to be executed as a function
        eval(babyFunction);//we use the "evil" eval method to instantiate a string as a function instead of using a long list of switch cases or if statements
    })
}
```

## Author Links
[Linkedin](https://www.linkedin.com/in/dominic-conradson-76638b172/)---
[GitHub](https://github.com/theDomConrad/)---
[Portfolio](https://thedomconrad.github.io/Dominic-Conradson-Portfolio/)---
