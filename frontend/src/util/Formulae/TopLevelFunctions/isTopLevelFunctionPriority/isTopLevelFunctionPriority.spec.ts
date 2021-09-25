import isTopLevelFunctionPriority from "./isTopLevelFunctionPriority";

describe('isTopLevelFunctionPriority', () => {
  // @ts-ignore
  it.each([
      ['(depth_with_max(c(x,y)) = depth_with_condition(c(x,y)))', true],
      ['(depth_with_condition(c(x,y)) <= size(c(x,y))) and (depth_with_max(c(x,y)) = depth_with_condition(c(x,y)))', false]
    ]
  )(`%s evaluates to %s`, (input: string, expected: boolean) => {
    expect(isTopLevelFunctionPriority(input)).toEqual(expected)
  })
})
