import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        print_table(parsedCode);
    });
});

const print_table = (table) =>{
    document.write('<table style="width:50%"> \n' +
        '<tr> \n' +
        '<th>location</th>' +
        '<th>type</th>' +
        '<th>name</th>' +
        '<th>condition</th>' +
        '<th>value</th>' +
        '</tr>' +
        '<tr>' );
    for (let i=0; i<table.length; i++) {
        document.write('<tr><td>' + table[i].location + '</td>');
        document.write('<td>' + table[i].type + '</td>');
        document.write('<td>' + table[i].name + '</td>');
        document.write('<td>' + table[i].condition + '</td>');
        document.write('<td>' + table[i].value + '</td></tr>');
    }
    return;
};
