
import copy          from './copy.cmd'
const parameters = process.argv.splice(2);

const arr = [
    copy,
];

(function fireFun(index) {
    arr[index] && arr[index](parameters).then(() => {
        return fireFun(++index);
    })
})(0);
