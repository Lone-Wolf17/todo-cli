import inquirer from 'inquirer'
import ora from 'ora';
import chalk from 'chalk';

import TodoModel, {TodoClass} from '../models/Todo.model.js'
import {connectDB, disconnectDB} from '../db/connect-db.js'
import {Status} from "../constants/enums.js";
import {getTaskCode} from "./utils.js";

const askUpdateQuestion = async (todo: TodoClass) => {
    try {
        // prompt the user to update the todo data
        const update = await inquirer.prompt([
            {name: 'name', message: 'Update the name?', type: 'input', default: todo.name},
            {name: 'detail', message: 'Update the Description?', type: 'input', default: todo.detail},
            {name: 'status', message: 'Update the status?', type: 'list', choices: Object.values(Status), default: todo.status}
        ]);

        return update;
    } catch (err) {
        console.log('Something went wrong... \n', err);
    }
}

export default  async function updateTask() {
    try {
        // obtain the task code entered by the user
        const taskCode = await  getTaskCode();

        // connect to DB
        await connectDB();

        // start the spinner
        const spinner = ora('Finding the todo...').start();

        // Finding the todo which the user wants to update
        const todo = await TodoModel.findOne({code: taskCode});

        // stop the spinner
        spinner.stop();

        // check if the todo exists or not
        if (!todo) {
            console.log(chalk.redBright('Could not find a Todo with the code you provided.'))
        } else {
            console.log(chalk.blueBright('Type the updated properties. Press Enter if you don\'t want to update the data.'));

            // Get the user's response of the updated data by calling [askUpdatedQuestion] method
            const update = await  askUpdateQuestion(todo);

            // If user marked status as completed, we delete the todo else we update the data
            if (update.status == Status.Completed) {
                // change the spinner text and start it again
                spinner.text = 'Deleting the todo';
                spinner.start();

                // delete the todo
                await  TodoModel.deleteOne({_id: todo._id});

                // stop spinner and display the success message
                spinner.stop()
                console.log(chalk.greenBright('Deleted the todo.'))
            } else {
                // Update the todo
                spinner.text = 'Updating to the todo';
                spinner.start();

                await  TodoModel.updateOne({_id: todo._id}, update, {runValidators: true});
                spinner.stop();
                console.log(chalk.greenBright('Updated the todo.'))
            }
        }

        // Disconnect from DB
        await disconnectDB();
    } catch (err) {
        // Error Handling
        console.log('Something went wrong, Error: ', err)
        process.exit(1)
    }
}