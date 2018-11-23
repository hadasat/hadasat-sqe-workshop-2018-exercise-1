import assert from 'assert';
import { parseCode} from '../src/js/code-analyzer';

let if_code = 'if( 10 > 2){let a =10;}else if (2<5) {let b =20;} else {c = 10}';

describe('if and else if', () => {
    it('is parsing assinment operator', () => {
        assert.equal(
            parseCode(if_code)[0].type,
            'if statement');
    });
    it('is parsing assinment operator', () => {
        assert.equal(
            parseCode(if_code)[1].type,
            'variable declaration');
    });
    it('is parsing assinment operator', () => {
        assert.equal(
            parseCode(if_code)[2].type,
            'else if statement');
    });

});

let code_while = 'function binarySearch(x){\n' +
    '    let low, high, mid;\n' +
    '    low = 0;\n' +
    '    high = n - 1;\n' +
    '    while (low <= high) {\n' +
    '        mid = (low + high)/2;\n' +
    '    }\n' +
    '    return -1;\n' +
    '}';

let for_code = 'function binarySearch(){\n' +
    '        let low,i =0;\n' +
    '        low = 0;\n' +
    '        high = n - 1;\n' +
    '        for (i = 0; low <= high; i++) {\n' +
    '            mid = (low + high)/2;\n' +
    '        }\n' +
    '        return -1;\n' +
    '    }';

describe('while and loop', () => {
    it('while', () => {
        assert.equal(
            parseCode(code_while)[7].type,
            'while statement');
    });
    it('for', () => {
        assert.equal(
            parseCode(for_code)[5].type,
            'for statement');
    });
    it('function decleration', () => {
        assert.equal(
            parseCode(code_while)[0].type,
            'function declaration');
    });
    it('variable declaration', () => {
        assert.equal(
            parseCode(for_code)[2].type,
            'variable declaration');
    });
    it('variable declaration value null', () => {
        assert.equal(
            parseCode(for_code)[1].value,
            '');
    });
    it('variable declaration value 0', () => {
        assert.equal(
            parseCode(for_code)[2].value,
            '0');
    });
    it('return', () => {
        assert.equal(
            parseCode(for_code)[7].type,
            'return statement');
    });

});
