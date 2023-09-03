import mongoose from  'mongoose';
import ora from  'ora';
import chalk from 'chalk';
import EnvVars from "../constants/EnvVars.js";


export const connectDB = async () => {
    try {
        const spinner = ora('Connecting to the database...').start();
        await mongoose.connect(EnvVars.MONGO_URI);
        spinner.stop();
        console.log(chalk.greenBright('Successfully connected to database!!!'))
    } catch (error) {
        console.log(chalk.redBright('Error: '), error);
        process.exit(1);
    }
}

export async function disconnectDB () {
    try {
        await mongoose.disconnect();
        console.log(chalk.greenBright('Disconnected from the database.'));
    } catch (err) {
        console.log(chalk.redBright('Error: '), err);
        process.exit(1)
    }
}