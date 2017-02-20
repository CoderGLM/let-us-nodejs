import fs from 'fs';
import path from 'path';

const params = process.argv.slice(2);

if (params.length < 3) {
    console.log("ERROR: 参数不足");
    showHelp();
    process.exit(0);
}

traverse(params[0], params[1], params[2]);

function traverse(dir = process.cwd(), target = "", dist = "") {
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
            if (params[3]) {
                traverse(which, target, dist);
            } else {
                console.log(`${file} is a directory, skipped.`);
            }
        } else {
            replaceSingleFile(which, target, dist)
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
    console.log("用法：babel-node replace.js <目录> <待替换字符串> <目标字符串>[ <recursive>]\n");
    console.log("--------------------------------------");
}