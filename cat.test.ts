import { test, expect } from "@jest/globals"

test('adds 1 + 1 = 2', function () {
    const a = 1;
    const b = 2;

    const result = a + b;
    expect(result).toBe(3)
})