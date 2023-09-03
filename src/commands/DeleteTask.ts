import ora from 'ora';
import chalk from 'chalk';

import {connectDB, disconnectDB} from "../db/connect-db";
import {TodoModel} from "../models/Todo.model";
import {getTaskCode} from "./utils";

export default  async  function deleteTask() {
    try {
        // Obtain the todo code provided by the user
        const taskCode = await getTaskCode();

        // connect to the DB
        await connectDB();

        // starting the spinner
        const spinner = ora('Finding and deleting the todo...').start();

        // Delete the task
        const response = await TodoModel.deleteOne({code: taskCode});

        // Stop the spinner
        spinner.stop();

        // Checking the delete operation
        if (response.deletedCount === 0) {
            console.log(chalk.redBright('Could not find any todo matching the provided name. Deletion failed.'))
        } else {
            console.log(chalk.greenBright('Deleted Task Successfully'))
        }

        // Disconnect from the DB
        await disconnectDB();
    } catch (err) {
        // Error handling
        console.log('Something went wrong, Error: ', err)
        process.exit(1)
    }
}