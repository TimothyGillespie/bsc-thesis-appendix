package eu.gillespie.bscthesis.exceptions

class UnknownTypeExpection(type: String) : Exception("The type ${type} is not known.")