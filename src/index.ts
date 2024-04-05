#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import type { Ora } from 'ora';
import { exec } from 'child_process';
import util from 'util';
import figlet from 'figlet';

const execAsync: (command: string) => Promise<{ stdout: string; stderr: string }> = util.promisify(exec);
const figletPromise: (text: string) => Promise<string> = util.promisify(figlet);

const init: () => Promise<void> = async (): Promise<void> => {
  try {
    const data: string = await figletPromise('Flapi');
    console.log(chalk.blueBright(data));
  } catch (error) {
    console.error('Failed to generate ASCII art:', error);
    return; // Quit early if there's an error
  }

  console.log(chalk.blueBright(`Welcome to create-flapi-app CLI tool`));
  console.log(chalk.yellowBright("Let's set up your new Flapi project...\n"));

  const program: Command = new Command();
  program
    .name('create-flapi-app')
    .version('1.0.0')
    .description('CLI tool for creating a new Flapi application')
    .argument('<project-name>', 'Name of the Flapi project to create')
    .action(async (projectName: string): Promise<void> => {
      const projectPath: string = path.resolve(process.cwd(), projectName);
      if (fs.existsSync(projectPath)) {
        console.error(chalk.red(`\nError: A folder named ${projectName} already exists. Choose a different name.\n`));
        process.exit(1);
      }

      const dirSpinner: Ora = ora('Creating project directory...').start();
      fs.mkdirSync(projectPath, { recursive: true });
      dirSpinner.succeed('Project directory created.');

      const downloadSpinner: Ora = ora('Downloading the Flapi starter kit...').start();
      try {
        await execAsync('git clone git@github.com:FlapiBusiness/flapi-starterkit-frontend.git .', { cwd: projectPath });
        downloadSpinner.succeed('Starter kit downloaded.');
      } catch (error) {
        downloadSpinner.fail('Failed to download the Flapi starter kit.');
        console.error(error);
        process.exit(1);
      }

      const installSpinner: Ora = ora('Installing dependencies...').start();
      try {
        await execAsync('npm install', { cwd: projectPath });
        installSpinner.succeed('Dependencies installed.');
      } catch (error) {
        installSpinner.fail('Failed to install dependencies.');
        console.error(error);
        process.exit(1);
      }

      console.log(chalk.white(`Your Flapi project has been created successfully!`));
    });

  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error('Erreur lors du parsing des arguments de la ligne de commande', error);
  }
};

init();
