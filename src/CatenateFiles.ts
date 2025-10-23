#!/usr/bin/env node

import { createReadStream, ReadStream } from "node:fs";


type FileArray = Array<string>

export function CatenateFiles(files: FileArray): Promise<void> {
	console.log("Logging file", files)
	return new Promise((resolve, reject) => {
		files.forEach(file => {
			if (file === "-" || file.length === 0) {
				process.stdin.setDefaultEncoding("utf-8")
				process.stdin.on("data", (data: Buffer) => {
					process.stdout.write(data.toString("utf-8"), err => {
						if (err) {
							reject(err)
						}
					})
				})

				process.stdin.on("error", err => {
					process.stdin.destroy(err)
					reject(err)
				})

				process.stdin.on("close", (hadError) => {
					if (hadError) {
						process.stdin.destroy()
						reject()
					}
					resolve()
				})
			} else {
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
			}


		})
	})
}


