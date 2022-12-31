#! /usr/bin/env node
import inquirer from "inquirer";



interface ansType {
    userId: string,
    userPin: number,
    accType: string,
    transType: string[],
    amount: number | string,
    transferType:string,
    otherAmout: number,
    benAmount: number,

}
console.clear()

var balance = Math.ceil(Math.random()*1000000)


async function atm ( ) {
    const answer: ansType = await inquirer.prompt([
        {
            type: 'number',
            name: 'userId',
            message: 'Plese enter your account number: ',
            validate(val){
                if ( Number(val)){
                    return true
                }
                else {
                    return 'please enter a valid account number'
                }
            }
        },
        {
            type: 'password',
            name: 'userPin',
            message: 'Plese enter your 4 digit pin: ',
            validate(val){
                if ( Number(val) && val.length == 4){
                    return true
                }
                else {
                    return 'please enter a valid pin'
                }
            }
        },
        {
            type: 'list',
            name: 'accType',
            message: 'Please select your account type',
            choices: ['current', 'saving account'],
            when(answers){
                if(answers.userId && answers.userPin){
                    console.log('Your current balance is:  ',balance)
                    return true
                }else{
                    return 'your account number or pin is not correct'
                }
            }
        },
        {
            type: 'list',
            name: 'transType',
            message: 'Please select one of these',
            choices: ['transfer money', 'cash withdrawl']
        },    
        {
            type: 'list',
            name: 'amount',
            choices: [1000, 2000, 5000, 10000, 'other amount'],
            message: 'Please select an option',
            when(answers){
            return answers.transType == 'cash withdrawl'
            }
        },
        {
            type:'number',
            name: 'otherAmout',
            message: `Please note amount should be multiple of 500 \n please enter an amount `,
            validate(value){
                if(value % 500 == 0){
                    return true
                }else{
                    return 'Please enter a multiple of 500'
                }
            },
            when(answers){
                return answers.amount == 'other amount'
            }
        },
        {
            type: 'list',
            name: 'transferType',
            choices: ['Fund transfer', 'Inter bank fund transfer'],
            when(answers){
                return answers.transType == 'transfer money';
            }
        },
        {
            type: 'number',
            name: 'benfAccNo',
            message: 'Please enter benificiary account number',
            when(answers){
                // console.clear()
                return answers.transferType;
            }
        },
        {
            type: 'number',
            name: 'benAmount',
            message: 'Please enter the amount you want to transfer',
            validate(value){
                if(value <= balance && Number(value)){
                    return true
                } else {
                    return 'you have insufficient balance or you not entered a number'
                }
            },
            when(answers){
            return answers.benfAccNo
            }
        }
    ])

    // console.log(Number(answer.amount))
    // console.log(answer.otherAmout)

    if ((answer.amount <= balance && answer.amount != 'other amount') || answer.otherAmout <= balance){
        balance -= Number(answer.amount)? Number(answer.amount) : Number(answer.otherAmout);
        console.log( `Your new balance is: ${balance}` )
    }else if(answer.benAmount <= balance) {
        balance -= Number(answer.benAmount)
        console.log( `Your new balance is: ${balance}` )
    }
}

interface Again {
    confirmed : boolean
}
let confirm: boolean = false;
const promptAgain =async () => {
    confirm = false
    let again: Again = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmed',
            message: 'would you like to do another transaction?  ',
        }
    ])
    if(again.confirmed){
        confirm = true
    }else{
        console.clear()
    }
}


do {
    await atm()
    await promptAgain()
} while (confirm);

// console.log(answer)