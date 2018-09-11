class User {
    constructor(obj) {
        console.log(obj);
        this.name = obj.six;
        this.six = obj.six;
    }
}
function x1(x) {
    console.log("ss", x.count);
}
let u = new User({ name: "ghy", six: 3, age: 5 });
console.log(u.name);
//# sourceMappingURL=bean.js.map