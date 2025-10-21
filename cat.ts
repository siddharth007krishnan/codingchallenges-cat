import { createReadStream, ReadStream } from "node:fs";


type FileArray = Array<string>

export function CatenateFiles(files: FileArray): Promise<void> {
    return new Promise((resolve, reject) => {
        files.forEach(file => {

            const fileReadStream: ReadStream = createReadStream(file)
            fileReadStream.on("data", (data: string | Buffer<ArrayBufferLike>) => {
                if (typeof data === "string") {
                    process.stdout.write(data, err => {
                        reject(err)
                    })
                    // console.log(data) 
                } else {
                    process.stdout.write(data.toString("utf-8"), err => {
                        if (err) {
                            reject(err)
                        }
                    })
                    // console.log(data.toString("utf-8"))
                }
            })

            fileReadStream.on("error", err => {
                fileReadStream.destroy(err)
                reject(err)
            })

            fileReadStream.on("close", () => {
                resolve()
            })
        })
    })
}


// async function main() {
//     await CatenateFiles(["./sample.txt", "./sample.txt", "./sample.txt"])
// }

// main().then(() => {
//     process.exit(0)
// }).catch(err => {
//     console.error(err)
//     process.exit(1)
// })