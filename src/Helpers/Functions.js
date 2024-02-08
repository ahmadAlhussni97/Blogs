export const getRandomInt=(min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const sum2Number=(number1,number2)=>{
    return parseInt(eval(number1) + eval(number2))
} 
