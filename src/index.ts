#!/usr/bin/env node

import {Command} from 'commander';

import addTask from "./commands/AddTask.js";
import readTask from "./commands/ReadTask.js";
import updateTask from "./commands/UpdateTask.js";
import deleteTask from "./commands/DeleteTask.js";

// create an instance of the Command class
const program = new Command();

// set up the name and description of the CLI tool
program.name('todo').description('Your terminal task manager!!').version('1.0.0');

// Define a command called 'add'
program.command('add').description('Create a new Todo.').action(addTask);

// Define a command called 'read'
program.command('read').description('Reads all the Todos').action(readTask);

// Define a command called 'update'
program.command('update')
    .description('Updates a Todo.')
    .action(updateTask);

// Define a command called 'delete'
program.command('delete').description('Deletes a Todo')
    .action(deleteTask);

// Parse the command-line arguments and execute the corresponding actions
program.parse();
