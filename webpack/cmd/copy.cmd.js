import WowCool                          from 'wow-cool'
import Path                             from 'path'
import fs                               from 'fs'
import config                           from '../config'

const stat = fs.stat;
const { copyArr } = config;

class Copy {
    start (src, dst) {
        fs.exists(dst, (exists) => {
            if (exists) {
                this.copy(src, dst);
            } else {//存在
                this.mkDirsSync(dst);
                this.copy(src, dst)
            }
        });
        return this;
    }

    mkDirsSync (dirpath, mode) {
        try
        {
            if (!fs.existsSync(dirpath)) {
                let pathtmp;
                dirpath.split(/[/\\]/).forEach(function (dirname) {  //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                    if (pathtmp) {
                        pathtmp = Path.join(pathtmp, dirname);
                    } else {
                        pathtmp = dirname;
                    }
                    if (!fs.existsSync(pathtmp)) {
                        if (!fs.mkdirSync(pathtmp, mode)) {
                            return false;
                        }
                    }
                });
            }
            return true;
        } catch(e) {
            return false;
        }
    }

    copy (src, dst) {
        //读取目录
        fs.readdir(src, (err,paths) => {
            if (err) throw err;
            paths.forEach((path) => {
                let _src = src + '/' + path;
                let _dst = dst + '/' + path;
                let readable;
                let writable;
                stat(_src, (err,st) =>{
                    if (err) throw err;
                    if (st.isFile()) {
                        readable = fs.createReadStream(_src);//创建读取流
                        writable = fs.createWriteStream(_dst);//创建写入流
                        readable.pipe(writable);
                    } else if (st.isDirectory()){
                        this.copy(_src, _dst);
                    }
                });
            });
        });
    }
}
export default((arr_parameter) => new Promise((resolve, reject) => {
    let num_app_index = WowCool.findFirstIndexForArr(arr_parameter, (item) => {
        return item === '--copy' || item === '-c';
    });
    if (num_app_index) return resolve();
    const copy = new Copy();
    if (copyArr) {
        copyArr.forEach((item, index) => {
            copy.start(Path.join(__dirname, item.from), Path.join(__dirname, item.to));
        })
    }
    return resolve();
}));







