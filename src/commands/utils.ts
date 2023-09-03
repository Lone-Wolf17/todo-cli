import inquirer from "inquirer";

export const getTaskCode = async () => {
    try {
        // Prompting the user to enter teh todo code
        const answers = await inquirer.prompt([
            {name: 'code', message: 'Enter the code of the todo: ', type : 'input'}
        ]);

        // Trimming user's response so that the todo code does not contain any starting or trailing white spaces
        return answers.code.trim();
    } catch (err) {
        console.log('Something went wrong... \n', err);
    }
}