#!/usr/bin/env node

import { ArgumentParser } from "./ArgumentParser.js"
import { CatenateFiles } from "./CatenateFiles.js"
import { fileURLToPath } from 'url'


async function main() {
    const { flags, inputs } = ArgumentParser.parse().getCommandLineArgs()
    console.log(inputs)
    
    if (inputs.length) {
        // console.log(flags)
        await CatenateFiles(inputs.filter(file => file !== fileURLToPath(import.meta.url)))
    } else {
        await CatenateFiles(["-"])
    }
}

main().then(() => {
    process.exit(0)
}).catch(err => {
    console.error(err)
    process.exit(1)
})