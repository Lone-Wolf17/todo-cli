import chalk from 'chalk';
import ora from 'ora';

import {connectDB, disconnectDB} from "../db/connect-db.js";
import { TodoModel} from "../models/Todo.model.js";
import inquirer from "inquirer";
import {Status} from "../constants/enums.js";

const optionAll = "all";
const askStatusFilterQuestion = async () => {
    try {
        // prompt the user to update the todo data
        const response = await inquirer.prompt([
            {
                name: 'filter',
                message: 'Select Todo Status filter?',
                type: 'list',
                choices: [...Object.values(Status), optionAll],
                default: optionAll
            }
        ]);

        return response.filter;
    } catch (err) {
        console.log('Something went wrong... \n', err);
    }
}
export  default  async function readTask () {
    try {

        const statusFilter = await askStatusFilterQuestion();

        let filter: {status?: Status} = {};

        if (statusFilter != optionAll) {
            filter.status = statusFilter;
        }
        // connecting to the database
        await  connectDB();

        /// start the spinner
        const spinner = ora(`Fetching ${statusFilter} Todos...`).start();

        // fetching all the todos from the database
        const todos = await TodoModel.find(filter);

        // stopping the spinner
        spinner.stop();

        // check if todos exist or not
        if (todos.length === 0) {
            console.log(chalk.blueBright(`You do not have any ${statusFilter !== optionAll && statusFilter} tasks yet!` ));
        } else {
            todos.forEach(todo => {
                console.log(
                    chalk.cyanBright('Todo Code: ') + todo.code + '\n',
                    chalk.blueBright('Name: ') + todo.name + '\n',
                    chalk.yellowBright('Description: ') + todo.detail + '\n',
                    chalk.blue('Status: ') + todo.status + '\n'
                )
            })
        }
        console.log(chalk.magentaBright('Count: '), todos.length);
        // disconnect from the database
        await  disconnectDB();
    } catch (error) {
        /// Error Handling
        console.log(`Something went wrong, Error: `, error);
        process.exit(1);
    }
}