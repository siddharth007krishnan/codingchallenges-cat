import { expect, describe, it, beforeAll, afterAll } from "@jest/globals"
import { ArgumentParser } from "../src/ArgumentParser.js"

describe("It should parse the command line arguments properly", () => {
	const OLD_PROCESS_ARGV = process.argv


	afterAll(() => {
		process.argv = OLD_PROCESS_ARGV;
		expect(process.argv).toBe(OLD_PROCESS_ARGV)
	})

	it("should parse the command line arguments with hyphens", () => {
		process.argv = ["node", __filename, "-it", "-w", "sample.txt", "name.txt"]
		const flags = ArgumentParser.parse().getFlags()
		expect(flags.i).toBeTruthy()
		expect(flags.t).toBeTruthy()
		expect(flags.w).toBeTruthy()
	})

	it("should parse the command line arguments with hyphens", () => {
		process.argv = ["node", __filename, "-it", "-w"]
		const args = ArgumentParser.parse().getArguments()
		expect(args.i).toBeTruthy()
		expect(args.t).toBeTruthy()
		expect(args.w).toBeTruthy()
	})

	it("should parse the command line argument with dashes", () => {
		process.argv = ["node", "--watch", "--build", "--debug", __filename]

		const flags = ArgumentParser.parse().getFlags()
		expect(flags.watch).toBeTruthy()
		expect(flags.build).toBeTruthy()
		expect(flags.debug).toBeTruthy()
	})

	it("should parse the command line argument with dashes", () => {
		process.argv = ["node", "--watch", "--build", "--debug", __filename]

		const args = ArgumentParser.parse().getArguments()
		expect(args.watch).toBeTruthy()
		expect(args.build).toBeTruthy()
		expect(args.debug).toBeTruthy()
	})

	it("should parse the command line arguments with dashes and hyphens in random order", () => {
		process.argv = ["node", "-i", __filename, "-wc", "--watch", "--debug", "-m"]

		const flags = ArgumentParser.parse().getFlags()

		expect(flags.i).toBeTruthy()
		expect(flags.w).toBeTruthy()
		expect(flags.c).toBeTruthy()
		expect(flags.watch).toBeTruthy()
		expect(flags.debug).toBeTruthy()
		expect(flags.m).toBeTruthy()
	})

	it("should parse the command line arguments with dashes and hyphens in random order", () => {
		process.argv = ["node", "-i", __filename, "-wc", "--watch", "--debug", "-m", "--show-tabs"]
		console.log(__filename)
		const args = ArgumentParser.parse().getArguments()

		expect(args.i).toBeTruthy()
		expect(args.w).toBeTruthy()
		expect(args.c).toBeTruthy()
		expect(args.watch).toBeTruthy()
		expect(args.debug).toBeTruthy()
		expect(args.m).toBeTruthy()
		console.log(args)
		console.log(OLD_PROCESS_ARGV)
		expect(args["show-tabs"]).toBeTruthy()
	})

	it("should parse the command line arguments and return any inputs provided as part of the command line", () => {
		process.argv = ["node", "-i", __filename, "-wc", "--watch", "--debug", "-m", "--show-tabs"]
		console.log(__filename)
		const { flags, inputs } = ArgumentParser.parse().getCommandLineArgs()
		console.log("flags --- inputs", flags, inputs)
		expect(flags.i).toBeTruthy()
		expect(flags.w).toBeTruthy()
		expect(flags.c).toBeTruthy()
		expect(flags.watch).toBeTruthy()
		expect(flags.debug).toBeTruthy()
		expect(flags.m).toBeTruthy()
		console.log(flags, inputs)
		console.log(OLD_PROCESS_ARGV)
		expect(flags["show-tabs"]).toBeTruthy()
		expect(inputs).toHaveLength(0)
	})

	it("Should parse the command line arguments and return the inputs and flags provided when the command does not contain the node runtime path as input", () => {
		process.argv = [__filename, "-it", "-w", "--watch", "--debug", "-m", "--show-tabs", "sample.txt", "-", "sample2.txt"]
		const { flags, inputs } = ArgumentParser.parse().getCommandLineArgs()
		console.log(flags, inputs)
		expect(flags.i).toBeTruthy()
		expect(flags.t).toBeTruthy()
		expect(flags.w).toBeTruthy()
		expect(flags.watch).toBeTruthy()
		expect(inputs.includes("sample.txt")).toBeTruthy()
		expect(inputs.includes("-")).toBeTruthy()
		expect(inputs.includes("sample2.txt")).toBeTruthy()
	})
})
