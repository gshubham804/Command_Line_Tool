import inquirer from "inquirer";
import { promises as fsPromises } from 'fs';

const baseConfig = {
    name: "node-server-express-example",
    version: 2,
    builds: [
      {
        src: "src/index.js",
        use: "@shubh/node-server",
      },
    ],
    "routes": [
      {
          "src":"/.*", "dest":"src/index.js"
      }
    ]
  };

  export const nodeExpressConfig = async(config) => {
    let mainFile = 'src/index.js';

    try {
         // Dynamically import package.json (ESM way)
         const packageJSONPath = process.cwd() + '/package.json';
         const packageJSON = JSON.parse(await fsPromises.readFile(packageJSONPath, 'utf-8'));
         console.log("packageJSON", packageJSON);
         mainFile = packageJSON.main || mainFile;
    } catch (error) {
        console.log("error>>>>>>>",error);
    }
    const answers  = await inquirer.prompt([
        {
            type:'text',
            name:'main',
            message:'What is the path to your express entry point?',
            default: mainFile,

        }
    ])
    console.log(answers);
    
    return {
        ...config,
        ...baseConfig,
    };
};

  