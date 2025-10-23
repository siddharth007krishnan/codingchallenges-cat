type CommandLineArgs = {
	flags: any,
	inputs: string[]
}

export class ArgumentParser {
	private _flags: Map<string, boolean> | undefined
	private _inputs = new Array<string>()
	private static _instance: ArgumentParser

	private constructor() {
		if (!ArgumentParser._instance) {
			this._flags = new Map<string, boolean>()
		}
	}

	private static initializeArgumentParser() {
		if (!ArgumentParser._instance) {
			this._instance = new ArgumentParser()
		}
	}

	public static parse() {
		let firstInputEncountered = false
		ArgumentParser.initializeArgumentParser()
		process.argv.forEach((element: string, _: number) => {
			if (element.charAt(0) === '-' && element.length > 1) {
				const doesIncludeOnlyHyphen = !element.includes("--") && element.includes("-")
				const doesIncludeDashes = element.includes("--")

				if (doesIncludeOnlyHyphen && !doesIncludeDashes) {
					if (element.length === 2) {
						const flag = element.split("-").join("")
						this._instance!._flags!.set(flag, true)
					} else if (element.length > 2) {
						element.split("-").join("").split("").forEach(flag => {
							this._instance._flags!.set(flag, true)
						})
					}

				} else if (doesIncludeDashes) {
					const flag = element.split("--").join("")
					this._instance!._flags?.set(flag, true)
				}
			} else {
				if (process.argv[0] === "node") {
					if (element !== "node" && !firstInputEncountered) {
						firstInputEncountered = true
					}
				} else {
					if (!firstInputEncountered) {
						firstInputEncountered = true
					} else {
						this._instance._inputs.push(element)
					}
				}
			}

		});

		return this
	}

	public static getFlags(): any {
		const obj: any = {}
		this._instance._flags?.forEach((value: boolean, key: string) => {
			obj[key] = value
		})

		return obj
	}

	public static getArguments(): any {
		return ArgumentParser.getFlags()
	}

	public static getInputs(): Array<string> {
		return this._instance._inputs
	}

	public static getCommandLineArgs(): CommandLineArgs {
		return { flags: ArgumentParser.getFlags(), inputs: ArgumentParser.getInputs() }
	}
}
