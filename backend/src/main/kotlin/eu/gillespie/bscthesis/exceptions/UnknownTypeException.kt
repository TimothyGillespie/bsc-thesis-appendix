package eu.gillespie.bscthesis.exceptions

import eu.gillespie.bscthesis.information.AvailableTypes

class UnknownTypeException(type: AvailableTypes) : Exception("The type ${type.toTypeDescription()} is not known.")