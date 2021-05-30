/**
 * Adds the corresponding index to an iterable. Can be destructed with const [index, item] of enumerate(...)
 *
 * @param iterable The iterable object which should receive an index
 */
function* enumerate(iterable: Iterable<any>) {
	let i = 0;

	for (const x of iterable) {
		yield [i, x];
		i++;
	}
}

export default enumerate;
