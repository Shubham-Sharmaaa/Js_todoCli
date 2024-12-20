const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
program.name("todo")
.description("todo app")
.version("1.0.0");

file = "todofile.json";
program.command("add ")
    .argument("<string>","string to add")
    .argument("<time>","time")
    .action((string,time)=>{
        let fdata;
        fs.readFile(file,"utf8",(err,data)=>{
            if(err) return console.log(err);
            else{
                fdata = JSON.parse(data);
                for(let i = 0;i<fdata.length;i++){
                    fdata[i].id = i+1;
                }
                let tod =new Date();
                fdata.push({id:fdata.length+1,todo:string,Time:time,date: tod.getDate()+" "+tod.getMonth()+" "+tod.getFullYear(), done:false});
                fs.writeFile(file,JSON.stringify(fdata,null,2),"utf8",(err)=>{
                    if(err) return console.error(err);
                    else {
                        console.log("succesfully appended");
                    };
                });
            };
        });
    });
program.command("delete <id>")
        .action((id)=>{
            let fdata;
            fs.readFile(file,"utf8",(err,data)=>{
                if(err) return console.log(err);
                else{
                    fdata=JSON.parse(data);
                    fdata.splice(id-1,1);
                    for(let i = 0;i<fdata.length;i++){
                        fdata[i].id=i+1;
                    }
                    fs.writeFile(file,JSON.stringify(fdata,null,2),"utf8",(err)=>{
                        if (err) return console.error(err);
                        else{
                            console.log("successfully deleted");
                        };
                    });
                };
            });
        });
program.command("done <id>")
.action((id)=>{
    let fdata;
    fs.readFile(file,"utf-8",(err,data)=>{
        if(err) return console.log(err);
        else{
            fdata = JSON.parse(data);
            fdata[id-1].done=true;
            fs.writeFile(file,JSON.stringify(fdata, null,2),"utf8",(err)=>{
                if(err) return console.log(err);
                else{
                    console.log("Great work!!");
                }
            })
        }
    })
})
program.command("showTodo")
    .action(()=>{
        let fdata;
        fs.readFile(file,"utf-8", (err,data)=>{
            fdata=JSON.parse(data);
            for(let i=0;i<fdata.length;i++){
                console.log(`${i+1}.)`+ fdata[i].todo);
            }
        })
    })
program.parse();
