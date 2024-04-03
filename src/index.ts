#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { exec } from 'child_process'
import util from 'util'
import figlet from 'figlet'

// Promisify the exec function
const execAsync = util.promisify(exec)
const figletPromise = util.promisify(figlet)

const init = async (): Promise<void> => {
  // Affichage du message ASCII
  try {
    const data: unknown = await figletPromise('Flapi')
    console.log(chalk.blueBright(data))
  } catch (error) {
    console.error('Failed to generate ASCII art:', error)
    return // Quit early if there's an error
  }

  // Messages de bienvenue
  console.log(chalk.blueBright(`Welcome to create-flapi-app CLI tool`))
  console.log(chalk.yellowBright("Let's set up your new Flapi project...\n"))

  // Création et exécution de la commande
  const program: Command = new Command()
  program
    .name('create-flapi-app')
    .version('1.0.0')
    .description('CLI tool for creating a new Flapi application')
    .argument('<project-name>', 'Name of the Flapi project to create')
    .action(async (projectName: string): Promise<void> => {
      // Check if the project directory already exists
      const projectPath: string = path.resolve(process.cwd(), projectName)
      if (fs.existsSync(projectPath)) {
        console.error(chalk.red(`\nError: A folder named ${projectName} already exists. Choose a different name.\n`))
        process.exit(1)
      }

      // Create the project directory
      const dirSpinner = ora('Creating project directory...').start()
      fs.mkdirSync(projectPath, { recursive: true })
      dirSpinner.succeed('Project directory created.')

      // Clone the Flapi starter kit
      const downloadSpinner = ora('Downloading the Flapi starter kit...').start()
      try {
        await execAsync('git clone git@github.com:FlapiBusiness/flapi-starterkit-frontend.git .', { cwd: projectPath })
        downloadSpinner.succeed('Starter kit downloaded.')
      } catch (error) {
        downloadSpinner.fail('Failed to download the Flapi starter kit.')
        console.error(error)
        process.exit(1)
      }

      // Install dependencies
      const installSpinner = ora('Installing dependencies...').start()
      try {
        await execAsync('npm install', { cwd: projectPath })
        installSpinner.succeed('Dependencies installed.')
      } catch (error) {
        installSpinner.fail('Failed to install dependencies.')
        console.error(error)
        process.exit(1)
      }

      // Print success message and next steps
      console.log(
        chalk.white(`
╭──────────────────────────────────────────────────────────────────╮
│    Your Flapi project has been created successfully!             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│    ${chalk.blueBright('> cd ' + projectName)}                                                       │
│    ${chalk.blueBright('> npm run dev')}                                                 │
│    ${chalk.blueBright('> Open http://localhost:3000')}                                  │
│                                                                  │
│    ${chalk.white('> Have any questions?')}                                         │ 
│    ${chalk.white('> Join our Discord server - https://discord.gg/flapi')}          │
│                                                                  │
╰──────────────────────────────────────────────────────────────────╯
    `),
      )
    })

  await program.parseAsync(process.argv)
}

init()
