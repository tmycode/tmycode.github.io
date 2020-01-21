import { ConsoleApp } from '/lib/consoleApp';

async function main (){
    let app = new ConsoleApp();

    while(true){
        let value = await app.readWithPrompt("type expression here: ");

        let result;
        try {
            result = window.eval(value);
        }
        catch(e){
            result = e.message;
        }

        app.write("result: "+ result);
    }
}

main();
