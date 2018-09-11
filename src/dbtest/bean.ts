/**
 * Created by ghy on 2018/8/4.
 */
class User {
    constructor(obj: any) {
        console.log(obj);
        this.name = obj.six;
        this.six = obj.six;
    }

    name: string
    six: number
}

function x1(x: SomeType) {
    console.log("ss",x.count)
}
let u = new User({name: "ghy", six: 3, age: 5});
console.log(u.name);

interface SomeType {
    count: number;
}
