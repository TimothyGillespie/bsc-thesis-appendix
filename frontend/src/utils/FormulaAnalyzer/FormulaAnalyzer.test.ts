import FormulaAnalyzer, {getTopLevelFunctionSections} from "../../utils/FormulaAnalyzer/FormulaAnalyzer";

describe('FormulaAnayzer', () => {
    const simpleExample = 'c(e)';
    const mixedInconsistentExample = 'depth(c(t,e),x,e)size(e,v)';
    const normalExample = 'depth(c(t,e)) = size(c(t,e))';
    const deeplyNestedMixedExample = 'depth(c(a,c(d,c(f,c2(x,y,z))))) = size(c(a,c(d,c(f,c2(x,y,z)))))';
    const commaSeparatedExample = 'x,depth(c(x,y)),size(c(x,y)),y';

    describe('getFunctions()', () => {

        it('Simple example: ' + simpleExample, () => {
            expect(new FormulaAnalyzer(simpleExample).getFunctions()).toEqual({
                c: {parameterCount: 1},
            })
        });

        it('Mixed and inconsistent example: ' + mixedInconsistentExample, () => {
            expect(new FormulaAnalyzer(mixedInconsistentExample).getFunctions()).toEqual({
                depth: {parameterCount: 3},
                size: {parameterCount: 2},
                c: {parameterCount: 2},
            })
        });

        it('Normal example: ' + normalExample, () => {
            expect(new FormulaAnalyzer(normalExample).getFunctions()).toEqual({
                depth: {parameterCount: 1},
                size: {parameterCount: 1},
                c: {parameterCount: 2},
            })
        });

        it('Deeply nested mixed example: ' + deeplyNestedMixedExample, () => {
            expect(new FormulaAnalyzer(deeplyNestedMixedExample).getFunctions()).toEqual({
                depth: {parameterCount: 1},
                size: {parameterCount: 1},
                c: {parameterCount: 2},
                c2: {parameterCount: 3},
            })
        });
    });


    describe('getTopLevelFunctionSections()', () => {
        it('Simple example: ' + simpleExample, () => {
            expect(getTopLevelFunctionSections(simpleExample)).toEqual({
                c: {inside: 'e'},
            });
        });

        it('Mixed and inconsistent example: ' + mixedInconsistentExample, () => {
            expect(getTopLevelFunctionSections(mixedInconsistentExample)).toEqual({
                depth: {inside: 'c(t,e),x,e'},
                size: {inside: 'e,v'},
            })
        });

        it('Normal example: ' + normalExample, () => {
            expect(getTopLevelFunctionSections(normalExample)).toEqual({
                depth: {inside: 'c(t,e)'},
                size: {inside: 'c(t,e)'},
            })
        });

        it('Deeply nested mixed example: ' + deeplyNestedMixedExample, () => {
            expect(getTopLevelFunctionSections(deeplyNestedMixedExample)).toEqual({
                depth: {inside: 'c(a,c(d,c(f,c2(x,y,z))))'},
                size: {inside: 'c(a,c(d,c(f,c2(x,y,z))))'},
            })
        });

        it('Comma separated example: ' + commaSeparatedExample, () => {
            expect(getTopLevelFunctionSections(commaSeparatedExample)).toEqual({
                depth: {inside: 'c(x,y)'},
                size: {inside: 'c(x,y)'},
            });
        });
    });
})