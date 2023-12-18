let file = process.argv[2].toString();
let vm = new VM();
vm.run(file);


function VM()
{
    this.commands = new Array();
    this.commands['input'] = function() {};
    this.commands['set'] = function() 
    {
        this.memory[this.instructions[this.ip + 1]] = parseFloat(this.instructions[this.ip + 2]);
        this.ip += 3;
    };

    this.commands['add'] = function() // fromMemcell fromMemcell toMemcell
    {
        this.memory[this.instructions[this.ip + 3]] = 
            this.memory[this.instructions[this.ip + 2]] + this.memory[this.instructions[this.ip + 1]];
        this.ip += 4
    };
    this.commands['sqrt'] = function() // frommemcell tomemcell
    {
        this.memory[this.instructions[this.ip + 2]] = Math.sqrt(this.memory[this.instructions[this.ip + 1]]);
        this.ip += 3;
    };
    this.commands['divide'] = function() // frommemcell frommemcell tomemcell
    {
        this.memory[this.instructions[this.ip + 3]] = this.memory[this.instructions[this.ip + 1]] / this.memory[this.instructions[this.ip + 2]];
        this.ip += 4;
    };
    this.commands['floor'] = function() // frommemcell tomemcell
    {
        this.memory[this.instructions[this.ip + 2]] = Math.floor(this.memory[this.instructions[this.ip + 1]]);
        this.ip += 3;
    };
    this.commands['mod'] = function() // frommemcell n tomemcell
    {
        var n = parseFloat(this.instructions[this.ip + 2]);
        this.memory[this.instructions[this.ip + 3]] = this.memory[this.instructions[this.ip + 1]] % n;
        this.ip += 4;
    };
    
    this.commands['pow'] = function() // frommemcell n tomemcell
    {
        var n = parseFloat(this.instructions[this.ip + 2]);
        this.memory[this.instructions[this.ip + 3]] = Math.pow(this.memory[this.instructions[this.ip + 1]], n);
        this.ip += 4;
    };
    
    this.commands['gcd'] = function() // fromCell fromCell toCell
    {
        var num1 = this.memory[this.instructions[this.ip + 1]];
        var num2 = this.memory[this.instructions[this.ip + 2]];
        nodDefault = -1;
        if (num1 > num2)
        {
            temp = num1;
            num1 = num2;
            num2 = temp;
        }
        for (nod = 2; nod <= num1;nod++)
            if (num1 % nod == 0 && num2 % nod == 0)
                nodDefault = nod;
        this.memory[this.instructions[this.ip + 3]] = nodDefault;
        this.ip += 4;
    };

    this.commands['lcm'] = function() // fromCell fromCell toCell
    {
        var num1 = this.memory[this.instructions[this.ip + 1]];
        var num2 = this.memory[this.instructions[this.ip + 2]];
        var start = num1 * num2;
        if (num1 > num2)
        {
            temp = num1;
            num1 = num2;
            num2 = temp;
        }
        for (start = num1 * num2; start >= num2; start--)
            if (start % num1 == 0 && start % num2 == 0)
                this.memory[this.instructions[this.ip + 3]] = start;
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
