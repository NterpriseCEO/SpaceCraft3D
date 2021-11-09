function random(num1,num2) {
    var num = Math.floor((Math.random() * (num1-num2) + num1).toFixed(4));
    return num;
}