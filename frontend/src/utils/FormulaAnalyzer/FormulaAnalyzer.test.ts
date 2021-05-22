import FormulaAnalyzer, {getTopLevelFunctionSections} from "../../utils/FormulaAnalyzer/FormulaAnalyzer";

describe('FormulaAnayzer', () => {
    const simpleExample = 'c(e)';
    const mixedInconsistentExample = 'depth(c(t,e),x,e)size(e,v)';
    const normalExample = 'depth(c(t,e)) = size(c(t,e))';
    const deeplyNestedMixedExample = 'depth(c(a,c(d,c(f,c2(x,y,z))))) = size(c(a,c(d,c(f,c2(x,y,z)))))';
    const commaSeparatedExample = 'x,depth(c(x,y)),size(c(x,y)),y';
    const mixedParameterCountExample = 'depth(c(a,c(d,x,g,c(f,c(x,y,z))))) + size(x,y,z) = size(c(a,c(d,c(f,c(x,y,z)))))'

    describe('getFunctions()', () => {

        it('Simple example: ' + simpleExample, () => {
            expect(new FormulaAnalyzer(simpleExample).getFunctions()).toEqual([{
                    name: 'c',
                    parameterCount: 1,
                },
            ])
        });

        it('Mixed and inconsistent example: ' + mixedInconsistentExample, () => {
            expect(new FormulaAnalyzer(mixedInconsistentExample).getFunctions()).toEqual([
                {
                    name: 'c',
                    parameterCount: 2,
                },{
                    name: 'depth',
                    parameterCount: 3
                },{
                    name: 'size',
                    parameterCount: 2
                },
            ]);
        });

        it('Normal example: ' + normalExample, () => {
            expect(new FormulaAnalyzer(normalExample).getFunctions()).toEqual([
                {
                    name: 'c',
                    parameterCount: 2,
                },{
                    name: 'depth',
                    parameterCount: 1
                },{
                    name: 'size',
                    parameterCount: 1
                },
            ])
        });

        it('Deeply nested mixed example: ' + deeplyNestedMixedExample, () => {
            expect(new FormulaAnalyzer(deeplyNestedMixedExample).getFunctions()).toEqual([
                {
                    name: 'c',
                    parameterCount: 2
                },{
                    name: 'c2',
                    parameterCount: 3
                },{
                    name: 'depth',
                    parameterCount: 1
                },{
                    name: 'size',
                    parameterCount: 1
                },
            ])
        });

        it('Mixed Parameter Count Example: ' + mixedParameterCountExample, () => {
            expect(new FormulaAnalyzer(mixedParameterCountExample).getFunctions()).toEqual([
                {
                    name: 'c',
                    parameterCount: 2
                },{
                    name: 'c',
                    parameterCount: 3
                },{
                    name: 'c',
                    parameterCount: 4
                },{
                    name: 'depth',
                    parameterCount: 1
                },{
                    name: 'size',
                    parameterCount: 1
                },{
                    name: 'size',
                    parameterCount: 3
                }
            ])
        });
    });


    describe('getTopLevelFunctionSections()', () => {
        it('Simple example: ' + simpleExample, () => {
            expect(getTopLevelFunctionSections(simpleExample)).toEqual({
                c: {inside: ['e']},
            });
        });

        it('Mixed and inconsistent example: ' + mixedInconsistentExample, () => {
            expect(getTopLevelFunctionSections(mixedInconsistentExample)).toEqual({
                depth: {inside: ['c(t,e),x,e']},
                size: {inside: ['e,v']},
            })
        });

        it('Normal example: ' + normalExample, () => {
            expect(getTopLevelFunctionSections(normalExample)).toEqual({
                depth: {inside: ['c(t,e)']},
                size: {inside: ['c(t,e)']},
            })
        });

        it('Deeply nested mixed example: ' + deeplyNestedMixedExample, () => {
            expect(getTopLevelFunctionSections(deeplyNestedMixedExample)).toEqual({
                depth: {inside: ['c(a,c(d,c(f,c2(x,y,z))))']},
                size: {inside: ['c(a,c(d,c(f,c2(x,y,z))))']},
            })
        });

        it('Comma separated example: ' + commaSeparatedExample, () => {
            expect(getTopLevelFunctionSections(commaSeparatedExample)).toEqual({
                depth: {inside: ['c(x,y)']},
                size: {inside: ['c(x,y)']},
            });
        });

        it('Mixed Parameter Count Example: ' + mixedParameterCountExample, () => {
            expect(getTopLevelFunctionSections(mixedParameterCountExample)).toEqual({
                depth: {inside: ['c(a,c(d,x,g,c(f,c(x,y,z))))']},
                size: {inside: ['x,y,z', 'c(a,c(d,c(f,c(x,y,z))))']},
            });
        });
    });
})