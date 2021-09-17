package eu.gillespie.bscthesis.parseModel

fun printTree(tree: SFunction, level: Int) {

    for(x in 0 until level)
        print("\t")

    if(tree.name == null && tree.parameters.isEmpty()) {
        print("()\n")
        return
    }

    if(tree.parameters.isNotEmpty())
        print("(")

    print("${tree.name ?: ""}\n")

    if(tree.parameters.isEmpty())
        return

    for(x in tree.parameters) {
        printTree(x, level + 1)
    }

    for(x in 0 until level)
        print("\t")

    if(tree.parameters.isNotEmpty())
        print(")\n")
}