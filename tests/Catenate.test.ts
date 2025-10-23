import { it, test, expect, beforeAll, describe, afterAll } from "@jest/globals"
import { mkdtemp, readFile, writeFile, rm, rmdir } from "node:fs/promises"
import { CatenateFiles } from "../src/CatenateFiles.js";


describe('Cat file Tests', function () {
    const FIRST_FILE_CONTENT = "Hello"
    const SECOND_FILE_CONTENT = "How are you"
    const THIRD_FILE_CONTENT = "I am fine thank you"
    const TEMP_DIR_NAME_PATTERN = "./.temp"
    let tempDirName: string = ""
    beforeAll(async () => {
        tempDirName = await mkdtemp(TEMP_DIR_NAME_PATTERN, 'utf-8')
        expect(tempDirName).toBeDefined()

        await Promise.all([writeFile(`${tempDirName}/firstFile.txt`, FIRST_FILE_CONTENT, { encoding: 'utf-8' }), writeFile(`${tempDirName}/secondFile.txt`, SECOND_FILE_CONTENT, { encoding: 'utf-8' }), writeFile(`${tempDirName}/thirdFile.txt`, THIRD_FILE_CONTENT, { encoding: 'utf-8' })])
    })

    afterAll(async () => {
        await Promise.all([rm(`${tempDirName}/firstFile.txt`), rm(`${tempDirName}/secondFile.txt`), rm(`${tempDirName}/thirdFile.txt`)])
        await rmdir(`${tempDirName}`)
    })

    it('should concatenate 3 files', async () => {
        const data = await CatenateFiles([`${tempDirName}/firstFile.txt`, `${tempDirName}/secondFile.txt`, `${tempDirName}/thirdFile.txt`])
        console.log(data)
    })
})