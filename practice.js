const add = (a,b)=>{
    return a + b;
}
const calculator = (add)=>{
    return add;
}

//const randomFunc = calculator;

//randomFunc(add)

//radomFunc(add)
const randomFunc = (add)=>{
    // calculator(add)
    return calculator();
}
