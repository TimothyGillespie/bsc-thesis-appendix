import getTopLevelPriorityContent from "./getTopLevelPriorityContent";

describe('getTopLevelPriorityContent', () => {
  // @ts-ignore
  it.each([
      ['(depth_with_max(c(x,y)) = depth_with_condition(c(x,y)))', 'depth_with_max(c(x,y)) = depth_with_condition(c(x,y))'],
      ['( depth_with_max(c(x, y)) = depth_with_condition(c(x, y)) )', 'depth_with_max(c(x, y)) = depth_with_condition(c(x, y))'],
      ['(depth_with_condition(c(x,y)) <= size(c(x,y))) and (depth_with_max(c(x,y)) = depth_with_condition(c(x,y)))', null]
    ]
  )(`%s evaluates has the content of %s`, (input: string, expected: string | null) => {
    expect(getTopLevelPriorityContent(input)).toEqual(expected)
  })
})
