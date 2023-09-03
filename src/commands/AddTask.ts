import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

import {connectDB, disconnectDB} from "../db/connect-db.js";
import {TodoModel} from "../models/Todo.model.js";


/** uses inquirer to ask the user for the task's name and details. The answers are then returned as an object. */
const  input = async () => {
    const answers = await inquirer.prompt([
        {name: 'name', message: 'Enter the name of the task: ', type: 'input'},
        {name: 'detail', message: 'Enter the details of the task: ', type: 'input'}
    ]);

    return answers;
}

 const askQuestions = async  () => {
    const todoArray = [];
    let loop = false;

    do {
        const userResponse = await  input();
        todoArray.push(userResponse);

        const confirmationQuestion = await  inquirer.prompt([{name: 'confirm', message: 'Do you want to add more tasks?', type: "confirm"}]);
        loop = confirmationQuestion.confirm ? true : false;
    } while (loop);

    return todoArray;
}

export default  async function () {
    try {
        // calling askQuestion to get array of todos
        const userResonse = await askQuestions();

        // connecting to the database
        await  connectDB();

        // Displaying a spinner with the following text using ora
        let spinner = ora('Creating the todos...').start();

        // looping over every todo in the user response
        // and saving each in the database

        for (let i=0; i<userResonse.length; i++) {
            const response = userResonse[i];
            await TodoModel.create(response);
        }

        // Stopping the spinner and displaying the success message
        spinner.stop();
        console.log(chalk.greenBright('Created the Todos!'));

        // disconnecting the database
        await disconnectDB();
    } catch (error) {
        // Error handling
        console.log("Something went wrong, Error: ", error);
        process.exit(1);
    }
}