// 1.
const primenum = (n, m) => {
  for (let i = n; i <= m; i++) {
    if (i % 2 == 0) {
      console.log(i);
    }
  }
};
primenum(2, 100);

// 2.
const globalnum = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i == 0) {
      sum += i;
    }
  }
  let str = sum.toString();
  let arr = str.split("");
  let reversedArr = arr.reverse();
  let reversedStr = reversedArr.join("");
  let reversedNum = parseInt(reversedStr);

  if (reversedNum % 2 == 0) {
    console.log("Tub son emas!");
  } else {
    console.log("Tub son");
  }
};
globalnum(14);

// 3.
const checknum = (n) => {
    let sum = 0;
    let str = n.toString();
    let arr = str.split("");

    for(let i = 0; i < arr.length; i++){
        sum += parseInt(arr[i]);
    }
    console.log(sum);
}
checknum(511)

// 5.
// const num = +prompt("Sonni kiriting");
let arr = [6, -32, 87, -12, -76, 32, 866, -111];
const findnumber = () => {
  for (let i = arr[0]; i < arr.length; i++) {
    if (num == i) {
      console.log(`Siz kiritgan ${num} raqami arrayda mavjud`);
      return;
    } else {
      console.log(`Siz kiritgan ${num} raqami arrayda mavjud emas`);
    }
  }
};
findnumber();
