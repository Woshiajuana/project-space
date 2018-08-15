/**
 * Created by Administrator on 2018/1/24.
 */
module.exports = {
    publicPath: '/dist',
    outputPath: '/dist',
    copyArr: [
        { from: '../src/assets/lib', to: '../dist/static/lib' },
        { from: '../src/assets/media', to: '../dist/static/media' },
    ]

};
