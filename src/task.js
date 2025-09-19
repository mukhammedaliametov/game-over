// 1.
const primenum = (n, m) => {
    for(let i = n; i <= m; i++){
        if(i % 2 == 0){
            console.log(i);
        }
    }
}
primenum(2, 100);

// 2.
const globalnum = (n) => {
    let sum = 0;
    for(let i = 1; i <= n; i++){
        if(n % i == 0){
            sum += i;
        }
    }
    let str = sum.toString();
    let arr = str.split("");
    let reversedArr = arr.reverse();
    let reversedStr = reversedArr.join("");
    let reversedNum = parseInt(reversedStr);

    if(reversedNum % 2 == 0){
        console.log('Tub son emas!');
    }else{
        console.log('Tub son');
    }
}
globalnum(14);
