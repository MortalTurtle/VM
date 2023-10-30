let file = process.argv[2].toString();
let vm = new VM();
vm.run(file);


function VM()
{
    this.commands = new Array();
    this.commands['input'] = function() {};
    this.commands['set'] = function() 
    {
        VM.memory[VM.instructions[VM.ip + 1]] = parseInt(VM.instructions[VM.ip + 2]);
        VM.ip += 3;
    };

    this.commands['add'] = function()
    {
        VM.memory[VM.instructions[VM.ip + 3]] = 
            VM.memory[VM.instructions[VM.ip + 2]] + VM.memory[VM.instructions[VM.ip + 2]];
        VM.ip += 4
    };

    this.commands['fibbonachi'] = function()
    {
        var n = parseInt(VM.instructions[VM.ip + 1]);
        var num1 = 1;
        var num2 = 1;
        for (i = 2; i < n;i++)
        {
            temp = num2;
            num2 = num2 + num1;
            num1 = temp;
        }
        VM.memory[VM.instructions[VM.ip + 2]] = num2;
        VM.ip += 3;
    };

    this.commands['nod'] = function()
    {
        var n = parseInt(VM.instructions[VM.ip + 1]);
        var num1 = VM.memory[VM.instructions[VM.ip + 1]];
        var num2 = VM.memory[VM.instructions[VM.ip + 2]];
        nodDefault = -1;
        var flag = false;
        if (num1 > num2)
        {
            temp = num1;
            num1 = num2;
            num2 = temp;
        }
        for (nod = 2; i < num1;nod++)
            if (num1 % nod == 0 && num2 % nod == 0)
            {
                nodDefault = nod;
                break;
            }
        VM.memory[VM.instructions[VM.ip + 3]] = nodDefault;
        VM.ip += 4;
    };
    
    this.commands['output'] = function()
    {
        console.log(VM.memory[VM.instructions[VM.ip + 1]]);
        VM.ip += 2;
    };

    this.run = function(programmFile)
    {
        VM.ip = 0;
        fs = require('fs');
        programmText = fs.readFileSync(programmFile);
        programmText = programmText.toString(); programmText += ' exit';
        VM.instructions = programmText.split(/ |\r\n/);
        VM.memory = new Array();
        //console.log(VM.instructions);
        while(VM.instructions[VM.ip] != 'exit')
        {
            this.commands[VM.instructions[VM.ip]].call();
        }
    }
}