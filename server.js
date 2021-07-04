const app = require('express')();
const multipartMiddleware = require('connect-multiparty')();
const bodyParser = require('body-parser');
const fs = require("fs");
const cmd = require('node-cmd')
const { Notification } = require('electron')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api', multipartMiddleware, function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    let postForm = req.body;
    let jsonFile
    switch (postForm.module){
        case "list":
            // 讀伺服器列表
            jsonFile = JSON.parse(fs.readFileSync("config/list.json", "utf-8"));
            // 返回 Json 數據
            res.json(jsonFile);
            // Break switch
            break;
        case "add":
            // 讀伺服器列表
            jsonFile = JSON.parse(fs.readFileSync("config/list.json", "utf-8"));
            // 判斷非空
            if (postForm.server_name && postForm.server_pass && postForm.server_ip && postForm.server_info){
                // Add 伺服器列表
                jsonFile.push({"server_name": postForm.server_name, "server_ip": postForm.server_ip, "server_pass": postForm.server_pass, "server_info": postForm.server_info})
                // 寫伺服器列表
                fs.writeFile('config/list.json', JSON.stringify(jsonFile), (err) => {
                    if(err){res.json({"status": "update_error"})}
                })
                res.json({"status": "add_ok"})
            }else{
                res.json({"status": "postform_error"})
            }
            // Break switch
            break;
        case "shell":
            cmd.run('echo '+postForm.pass+'| clip')
            cmd.run("start ssh root@"+postForm.ip)
            new Notification({ title: "伺服器密碼已複製", body: "請右鍵CMD窗口進行請求" }).show()
            res.json({"status": "shell_ok"})
            break;
        default:
            res.json({"status": "module_error"})
            // Break switch
            break;
    }
});

app.listen(18089, () => {
    console.log("Start Server...")
})
