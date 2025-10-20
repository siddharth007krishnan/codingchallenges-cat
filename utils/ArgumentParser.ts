export class ArgumentParser {
    private flags: Map<string, boolean> | undefined
    private static _instance: ArgumentParser

    private constructor() {
        if (!ArgumentParser._instance) {
            this.flags = new Map<string, boolean>()
        }
    }

    private static initializeArgumentParser() {
        if (!ArgumentParser._instance) {
            this._instance = new ArgumentParser()
        }
    }

    public static parse() {
        ArgumentParser.initializeArgumentParser()
        process.argv.forEach((element: string, index: number) => {
            // const doesIncludesOnlyHyphen = !element.includes("--") && element.includes("-")
            // const doesIncludesOnlyDashes = element.includes("--")
            // console.log(doesIncludesOnlyHyphen)
            // if (doesIncludesOnlyHyphen) {
            //     element.split("-").join("").split("").reduce((acc: Map<string, boolean>, cur: string) => {
            //         if (acc instanceof Map && !acc.has(cur)) {
            //             acc.set(cur, true)
            //         }
            //         return acc
            //     }, ArgumentParser._instance!.flags!)
            // } 
            // console.log(doesIncludesOnlyDashes)
            // if (doesIncludesOnlyDashes) {
            //     const currentFlags =  element.split("--").filter(element => element)
            //     currentFlags.forEach(flag => ArgumentParser._instance.flags!.set(flag, true))
            // }
            const doesIncludeOnlyHyphen = !element.includes("--") && element.includes("-")
            const doesIncludeDashes = element.includes("--")

            if (doesIncludeOnlyHyphen && !doesIncludeDashes) {
                if (element.length === 2) {
                    const flag = element.split("-").join("")
                    this._instance!.flags!.set(flag, true)
                } else if (element.length > 2) {
                    element.split("-").join("").split("").forEach(flag => {
                        this._instance.flags!.set(flag, true)
                    })
                }

            } else if (doesIncludeDashes) {
                const flag = element.split("--").join("")
                this._instance!.flags?.set(flag, true)
            }

        });

        return this
    }

    public static getFlags(): any {
        const obj: any = {}
        this._instance.flags?.forEach((value: boolean, key: string, m: Map<string, boolean>) => {
            obj[key] = value
        })

        return obj
    }

    public static getArguments(): any {
        return ArgumentParser.getFlags()
    }
}