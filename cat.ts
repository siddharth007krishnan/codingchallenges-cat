import { readFile, createReadStream, ReadStream } from "node:fs";

console.log(process.argv)

readFile("./sample.txt", (err, data: NonSharedBuffer) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data.toLocaleString("utf-8"))
})

const fileReadStream: ReadStream = createReadStream("./sample.txt")

fileReadStream.on("data", (data: string | Buffer<ArrayBufferLike>) => {
    if (typeof data === "string") {
        console.log(data)
    } else {
        console.log(data.toLocaleString("utf-8"))
    }
})