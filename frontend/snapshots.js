module.exports = {
  "__version": "8.6.0",
  "depth <= size example with max function": {
    "1": "tree1, tree2 ∈ NAryTree\n\ntree0 = c(tree1, tree2)\ntree3 = cBase\n\ndepth(tree0) = 1\ndepth(tree1) = 0\ndepth(tree2) = ( - 1 )\ndepth(tree3) = 0\n\nsize(tree0) = 0\nsize(tree1) = 0\nsize(tree2) = ( - 1 )\nsize(tree3) = 1"
  },
  "depth <= size example without max function": {
    "1": "tree1, tree2 ∈ NAryTree\n\ntree0 = c(tree1, tree2)\ntree3 = cBase\n\ndepth(tree0) = 1\ndepth(tree1) = 0\ndepth(tree2) = ( - 1 )\ndepth(tree3) = 0\n\nsize(tree0) = 0\nsize(tree1) = 0\nsize(tree2) = ( - 1 )\nsize(tree3) = 1"
  },
  "depth <= size example with max function (propositional logic)": {
    "1": "formula1, formula3, formula4, formula6, formula7, formula9, formula10, formula12, formula13, formula15, formula16 ∈ PLFormula\n\nformula0 = lnot(formula1)\nformula2 = lImplicationLeft(formula3, formula4)\nformula5 = lImplicationRight(formula6, formula7)\nformula8 = land(formula9, formula10)\nformula11 = lEquivalency(formula12, formula13)\nformula14 = lor(formula15, formula16)\nformula17 = lvariable\n\ndepth(formula0) = 1\ndepth(formula1) = 0\ndepth(formula2) = ( - 10448 )\ndepth(formula3) = ( - 10449 )\ndepth(formula4) = ( - 10450 )\ndepth(formula5) = ( - 33425 )\ndepth(formula6) = ( - 33426 )\ndepth(formula7) = ( - 33427 )\ndepth(formula8) = ( - 279 )\ndepth(formula9) = ( - 280 )\ndepth(formula10) = ( - 281 )\ndepth(formula11) = ( - 58710 )\ndepth(formula12) = ( - 58711 )\ndepth(formula13) = ( - 58712 )\ndepth(formula14) = ( - 14216 )\ndepth(formula15) = ( - 14217 )\ndepth(formula16) = ( - 14218 )\ndepth(formula17) = 0\n\nsize(formula0) = 1\nsize(formula1) = 0\nsize(formula2) = ( - 10448 )\nsize(formula3) = ( - 10449 )\nsize(formula4) = 0\nsize(formula5) = ( - 33425 )\nsize(formula6) = ( - 33426 )\nsize(formula7) = 0\nsize(formula8) = ( - 280 )\nsize(formula9) = ( - 280 )\nsize(formula10) = ( - 1 )\nsize(formula11) = ( - 58710 )\nsize(formula12) = ( - 58711 )\nsize(formula13) = 0\nsize(formula14) = ( - 14216 )\nsize(formula15) = ( - 14217 )\nsize(formula16) = 0\nsize(formula17) = 1"
  }
}
