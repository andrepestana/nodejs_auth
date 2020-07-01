 class ExtendedArray extends Array {
    constructor(...items) {
        super(...items);  
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