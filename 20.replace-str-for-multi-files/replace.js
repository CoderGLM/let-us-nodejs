import fs from 'fs';
import path from 'path';

const params = process.argv.slice(2);

if (params.length < 3) {
    console.log("ERROR: 参数不足");
    showHelp();
    process.exit(0);
}

traverse(params[0], params[1], params[2], params[3], params[4]);

function traverse(dir = process.cwd(), target = "", dist = "", recursive = false, filetype = "") {
    let files = fs.readdirSync(dir);
    if (!files.length) {
        console.error(`"${dir}" is empty`);
        process.exit(0);
        return;
    }
    files.forEach(file => {
        let which = path.join(dir, file);
        let stat = fs.statSync(which);
        if (stat.isDirectory()) {
            if (recursive) {
                traverse(which, target, dist);
            } else {
                console.log(`${file} is a directory, skipped.`);
            }
        } else {
            (path.extname(which) === filetype || !filetype) && replaceSingleFile(which, target, dist)
        }
    });
    console.log('Done')
}

function replaceSingleFile(which, target, dist) {
    console.log(`正在处理"${which}"`);
    var content = fs.readFileSync(which, 'utf-8');
    content = content.replace(target, dist);
    fs.writeFileSync(which, content);
    console.log(`"${which}"处理完成`);
}

function showHelp() {
    console.log("--------------------------------------");
    console.log("说明：替换指定目录下文件中字符串为指定字符串\r\n");
    console.log("用法：babel-node replace.js <目录> <待替换字符串> <目标字符串>[ <recursive>][ <file-type>]\n");
    console.log("示例：babel-node replace.js ~/Desktop/repDir 1 2 true .js");
    console.log("--------------------------------------");
}