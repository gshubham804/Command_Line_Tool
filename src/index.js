import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { nodeExpressConfig } from "./Configs/nodeExpress.js";

const existingConfig = fs.existsSync("packadge.json");
const questions = [];


const buildConfig = async () => {
    let config = {
        version: 2,
    }
      const answers = await  inquirer
          .prompt([ 
            {
              type: "text",
              name: "name",
              message: "What is the name of the project?",
              default: path.basename(process.cwd()),
            },
            {
                type: "list",
                name: "type",
                message: "What type of project?",
                choices:[
                    'node-express',
                    'static',
                    'react',
                    'vue',
                    'static-build',
                    'lambda',
                ],
              },
          ])
          config.name = answers.name;
              switch(answers.type){
                case 'node-express':
                   config = await nodeExpressConfig(config);
                   break;
              }
              console.log(config);
};

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: "PACKAGE.JSON already exists! Would you like to overwrite it?",
        default:  false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
        console.log(answers);
      } else {
        console.log("Good Bye! 👋")
      }
    });
} else {
  buildConfig();
}
