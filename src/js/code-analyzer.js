import * as esprima from 'esprima';

var table = new Array();
var code_in_lines ;


const parseCode = (codeToParse) => {
    table  =[];
    code_in_lines = codeToParse.split('\n');
    let parseScript = esprima.parseScript(codeToParse,{loc:true});
    parse_start(parseScript);
    return table;
};

const eval_variables = (param_array) => {
    param_array.map (
        (x) => {
            let location = x.loc.start.line;
            let type = 'variable declaration';
            let name = x.id.name;
            let condition= '';
            let value;
            if(x.init != undefined)
                value = x.init.value;
            else
                value = '';
            table.push({location:location ,type:type,name:name,condition:condition,value:value});
        });
};

const eval_params = (param_array) => {
    param_array.map (
        (x) => {
            let location = x.loc.start.line;
            let type = 'variable declaration';
            let name = x.name;
            let condition= '';
            let value = '';
            table.push({location:location ,type:type,name:name,condition:condition,value:value});
        });
};


const eval_function_decleration = (code) => {
    let location = code.id.loc.start.line;
    let type = 'function declaration';
    let name = code.id.name;
    let condition= '';
    let value = '';
    table.push({location:location ,type:type,name:name,condition:condition,value:value});
    eval_params(code.params);
    parse_start(code.body);
};

const eval_block_statement = (statment_array) =>{
    statment_array.map (
        (x) => {
            parse_start(x);
        }
    );

};

const eval_variable_declaration = (code) => {
    eval_variables(code.declarations);
};

const eval_expression_statement = (code) =>{
    let location = code.loc.start.line;
    let type = 'assignment expression';
    let name = code.left.name;
    let condition = '';
    let line = code_in_lines[location-1];
    let start_value = code.right.loc.start.column;
    let value = line.substring(start_value,line.length-1);
    table.push({location:location ,type:type,name:name,condition:condition,value:value});

};

const eval_while_statement = (code) => {
    let location = code.loc.start.line;
    let type = 'while statement';
    let name = '';
    let start_cond = code.test.loc.start.column;
    let end_cond = code.test.loc.end.column;
    let condition = code_in_lines[location-1].substring(start_cond,end_cond);
    let value = '' ;
    table.push({location:location ,type:type,name:name,condition:condition,value:value});
    parse_start(code.body);
};

const parse_else = (code) => {
    if(code != undefined)
    {
        if (code.type != 'IfStatement') {
            parse_start(code);}
        else {
            let location = code.loc.start.line;
            let type = 'else if statement';
            let name = '';
            let start_condition = code.test.loc.start.column;
            let end_condition = code.test.loc.end.column;
            let condition = code_in_lines[location - 1].substring(start_condition, end_condition);
            let value = '';
            table.push({location: location, type: type, name: name, condition: condition, value: value});
            parse_start(code.consequent);
            parse_else(code.alternate);
        }
    }

};

const eval_if_statement = (code) => {
    let location = code.loc.start.line;
    let type = 'if statement';
    let name = '';
    let start_condition = code.test.loc.start.column;
    let end_condition = code.test.loc.end.column;
    let condition = code_in_lines[location -1].substring(start_condition,end_condition);
    let value = '';
    table.push({location:location ,type:type,name:name,condition:condition,value:value});
    parse_start(code.consequent);
    parse_else(code.alternate);
};

const eval_for_statement = (code) => {
    let location = code.loc.start.line;
    let type = 'for statement';
    let name = '';
    let start_condition = code.test.loc.start.column;
    let end_condition = code.test.loc.end.column;
    let condition = ' ' +code_in_lines[location -1].substring(start_condition,end_condition) +' ';
    let value = '';
    table.push({location:location ,type:type,name:name,condition:condition,value:value});
    //parse_start(code.consequent);
    parse_start(code.body);
};


const eval_return_statement = (code) =>{
    let location = code.loc.start.line;
    let type = 'return statement';
    let name = '';
    let start_value = code.argument.loc.start.column;
    let end_value = code.argument.loc.end.column;
    let condition ='';
    let value = code_in_lines[location-1].substring(start_value,end_value);
    table.push({location:location ,type:type,name:name,condition:condition,value:value});
};

const parse_start = (code) => {
    if (code != undefined) {
        switch (code.type) {
        case 'Program' :
            parse_start(code.body[0]);
            break;
        case 'FunctionDeclaration' :
            eval_function_decleration(code);
            break;
        case 'BlockStatement' :
            eval_block_statement(code.body);
            break;
        default :
            parsed_vars(code);

        }
    }
};

const parsed_vars = (code) => {
    switch (code.type) {
    case 'VariableDeclaration' :
        eval_variable_declaration(code);
        break;
    case 'ExpressionStatement' :
        eval_expression_statement(code.expression);
        break;
    default :
        parse_loops(code);
        break;
    }
};

const parse_loops = (code) => {
    switch (code.type) {
    case 'WhileStatement' :
        eval_while_statement(code);
        break;
    case 'IfStatement' :
        eval_if_statement(code);
        break;
    case 'ForStatement' :
        eval_for_statement(code);
        break;
    case 'ReturnStatement' :
        eval_return_statement(code);
        break;
    }

};




export {parseCode};
