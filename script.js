let file = process.argv[2].toString();
let vm = new VM();
vm.run(file);


function VM()
{
    this.commands = new Array();
    this.commands['input'] = function() {};
    this.commands['set'] = function() 
    {
        this.memory[this.instructions[this.ip + 1]] = parseInt(this.instructions[this.ip + 2]);
        this.ip += 3;
    };

    this.commands['add'] = function()
    {
        this.memory[this.instructions[this.ip + 3]] = 
            this.memory[this.instructions[this.ip + 2]] + this.memory[this.instructions[this.ip + 2]];
        this.ip += 4
    };

    this.commands['fibbonachi'] = function()
    {
        var n = parseInt(this.instructions[this.ip + 1]);
        var num1 = 1;
        var num2 = 1;
        for (i = 2; i < n;i++)
        {
            temp = num2;
            num2 = num2 + num1;
            num1 = temp;
        }
        this.memory[this.instructions[this.ip + 2]] = num2;
        this.ip += 3;
    };

    this.commands['nod'] = function()
    {
        var n = parseInt(this.instructions[this.ip + 1]);
        var num1 = this.memory[this.instructions[this.ip + 1]];
        var num2 = this.memory[this.instructions[this.ip + 2]];
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
        this.memory[this.instructions[this.ip + 3]] = nodDefault;
        this.ip += 4;
    };
    
    this.commands['output'] = function()
    {
        console.log(this.memory[this.instructions[this.ip + 1]]);
        this.ip += 2;
    };

    this.run = function(programmFile)
    {
        this.ip = 0;
        fs = require('fs');
        programmText = fs.readFileSync(programmFile);
        programmText = programmText.toString(); programmText += ' exit';
        this.instructions = programmText.split(/ |\r\n/);
        this.memory = new Array();
        //console.log(VM.instructions);
        while(this.instructions[this.ip] != 'exit')
        {
            this.commands[this.instructions[this.ip]].call(this);
        }
    }
}
