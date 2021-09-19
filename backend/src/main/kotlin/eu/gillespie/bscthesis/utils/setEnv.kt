package eu.gillespie.bscthesis.utils

import java.lang.reflect.Field
import java.util.*


// Base on https://stackoverflow.com/a/7201825
@Throws(Exception::class)
fun setEnv(newenv: Map<String, String>?) {
    try {
        val processEnvironmentClass = Class.forName("java.lang.ProcessEnvironment")
        val theEnvironmentField: Field = processEnvironmentClass.getDeclaredField("theEnvironment")
        theEnvironmentField.isAccessible = true
        val env = theEnvironmentField.get(null) as MutableMap<String, String>
        env.putAll(newenv!!)
        val theCaseInsensitiveEnvironmentField: Field =
            processEnvironmentClass.getDeclaredField("theCaseInsensitiveEnvironment")
        theCaseInsensitiveEnvironmentField.isAccessible = true
        val cienv = theCaseInsensitiveEnvironmentField.get(null) as MutableMap<String, String>
        cienv.putAll(newenv)
    } catch (e: NoSuchFieldException) {
        val classes: Array<Class<*>> = Collections::class.java.declaredClasses
        val env = System.getenv()
        for (cl in classes) {
            if ("java.util.Collections\$UnmodifiableMap" == cl.name) {
                val field: Field = cl.getDeclaredField("m")
                field.isAccessible = true
                val obj: Any = field.get(env)
                val map = obj as MutableMap<String, String>
                map.clear()
                map.putAll(newenv!!)
            }
        }
    }
}
