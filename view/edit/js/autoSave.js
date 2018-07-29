/**
 * Created by cyl on 2018/7/29.
 */
const TIME = 10;
module.exports = function (vueInstance) {
    let lastName = vueInstance.name;
    let doc = vueInstance.mdstr;
    setInterval(function () {
        if (lastName != vueInstance.name || doc != vueInstance.mdstr) {
            console.log("需要自动保存");
            vueInstance.save(false);
        }
        lastName = vueInstance.name;
        doc = vueInstance.mdstr;
    }, TIME * 1000)
}