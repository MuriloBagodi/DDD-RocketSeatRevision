import { expect, test } from "vitest";
import { type Either, left, right } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (!shouldSuccess) {
    return left("error");
  }
  return right(10);
}


test("success result", () => {
  const result = doSomething(true)

  expect(result.isRight()).toEqual(true)
  expect(result.isLeft()).toEqual(false)
})

test("error result", () => {
  const error = doSomething(false)

  expect(error.isLeft()).toEqual(true)
  expect(error.isRight()).toEqual(false)
})