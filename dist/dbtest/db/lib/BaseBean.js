function getFunctionName(fn) {
    if (!fn) {
        return "";
    }
    if (fn.name) {
        return fn.name.toString().toLowerCase();
    }
    return ((fn.toString().trim().match(/^function\s*([^\s(]+)/) || [])[1] || '').toLowerCase();
}
function isObject(arg) {
    if (Buffer.isBuffer(arg)) {
        return true;
    }
    return Object.prototype.toString.call(arg) === '[object Object]';
}
;
function proset(key, typeValue, target) {
    Object.defineProperty(target, key, {
        set: function (newValue) {
            if (isObject(typeValue) && isObject(newValue)) {
                for (var innerkey in typeValue) {
                    target["_" + key][innerkey] = newValue[innerkey];
                }
            }
            else {
                if (typeof newValue == getFunctionName(typeValue) || (typeof newValue === 'object' && getFunctionName(typeValue) == 'array')) {
                    this["_" + key] = newValue;
                }
                else if ((newValue === undefined || newValue === null)) {
                    this["_" + key] = undefined;
                }
            }
        },
        get: function () {
            return this["_" + key];
        }
    });
}
function deepSet(target, typeValue) {
    for (var key in typeValue) {
        var tmpValue = typeValue[key];
        if (isObject(tmpValue)) {
            target["_" + key] = {};
            bindFun(target["_" + key], tmpValue);
            deepSet(target["_" + key], tmpValue);
        }
        proset(key, tmpValue, target);
    }
}
function getDeepData(target, option) {
    var obj;
    for (var key in option) {
        if (isObject(option[key])) {
            var retvalue = getDataFromObj(target[key], option[key]);
            if (!!retvalue) {
                obj = (obj || {});
                obj[key] = retvalue;
            }
        }
        else {
            if (target[key]) {
                obj = (obj || {});
                obj[key] = target[key];
            }
        }
    }
    function getDataFromObj(obj, option) {
        var retobj;
        for (var key in option) {
            if (typeof obj[key] == "object") {
                retobj = retobj || {};
                retobj[key] = getDataFromObj(obj[key], option[key]);
            }
            else {
                if (obj[key]) {
                    retobj = retobj || {};
                    retobj[key] = obj[key];
                }
            }
        }
        return retobj;
    }
    return obj;
}
function bindFun(target, option) {
    target.toJSON = function () {
        return getDeepData(target, option);
    };
}
function BaseBean(option) {
    class Bean {
        constructor(data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
        toJSON() {
            return getDeepData(this, option);
        }
    }
    for (var key in option) {
        var value = option[key];
        if (isObject(value)) {
            Bean.prototype["_" + key] = {};
            bindFun(Bean.prototype["_" + key], value);
            deepSet(Bean.prototype["_" + key], value);
        }
        proset(key, value, Bean.prototype);
    }
    return Bean;
}
module.exports = exports = BaseBean;
//# sourceMappingURL=BaseBean.js.map