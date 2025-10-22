import { expect, describe, it, beforeAll, afterAll } from "@jest/globals"
import { ArgumentParser } from "./ArgumentParser.js"

describe("It should parse the command line arguments properly", () => {
    const OLD_PROCESS_ARGV = process.argv


    afterAll(() => {
        process.argv = OLD_PROCESS_ARGV;
        expect(process.argv).toBe(OLD_PROCESS_ARGV)
    })

    it("should parse the command line arguments with hyphens", () => {
        process.argv = ["node", __filename, "-it", "-w"]
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
})