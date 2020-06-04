 class ExtendedArray extends Array {
    constructor(name, ...items) {
        super(...items);
        this.name = name;     
    }
    pushDefined(item) {
        if(item) this.push(item);
    }
    pushArray(arr) {
        if(arr && arr.length) {
            arr.forEach(e => {
                this.push(e)
            });
        }
    }
}

module.exports = ExtendedArray