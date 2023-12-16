let counter = 0;

const intervalId = setInterval(() => {
    console.log(`Hello`);
    counter += 1;

    if (counter == 5){
        console.log('Finish');
        clearInterval(intervalId)
    }

}, 1000);
