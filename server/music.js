const koa = require("koa");
const https = require("https");
const router = require("koa-router");
const db = require("./configs/mysql");
const bodyParser = require("koa-bodyparser");
const ssl = require("koa-sslify").default;
const fs = require("fs");
let server = new koa();

server.use(ssl());

let options = {
    key: fs.readFileSync("./ssl/3710726_cjh1004.vip.key"),
    cert: fs.readFileSync("./ssl/3710726_cjh1004.vip.pem")
}

https.createServer(options, server.callback()).listen(800)
server.use(async (ctx,next)=>{
    ctx.db = db;
    await next();
});
let routers = new router();
server.use(routers.routes());
routers.get("/swiper", async ctx=>{
   let data = await ctx.db.execute(`SELECT * FROM music_swiper`);
   ctx.body = data
})

routers.get("/scroll", async ctx=>{
    let data = await ctx.db.execute(`SELECT * FROM music_scroll`);
    ctx.body = data
})

routers.get("/music", async ctx=>{
    let data = await ctx.db.execute(`SELECT * FROM music_song ORDER BY count DESC LIMIT 6`);
    ctx.body = data
})
routers.get("/top", async ctx=>{
    let data = await ctx.db.execute("SELECT * FROM music_top ORDER BY count DESC")
    ctx.body = data
})
routers.get("/mv", async ctx=>{
    let data = await ctx.db.execute("SELECT * FROM music_top ORDER BY date DESC")
    ctx.body = data
})
routers.get("/search", async ctx=>{
    let data = await ctx.db.execute("SELECT * FROM music_aidou");
    let done = [];
    let lgh = data.length;
    while(done.length < 15){
        let num = parseInt(Math.random() * lgh)
        if (done.indexOf(data[num]) == -1) {
            done.push(data[num])
        }
    }
    ctx.body = done
})
routers.get("/listen", async ctx=>{
    let {name} = ctx.request.query;
    let data = await ctx.db.execute(`SELECT * FROM music_song WHERE musicName = "${name}"`);
    ctx.body = data;
})
routers.get("/group", async ctx=>{
    let {id} = ctx.request.query;
    let data = await ctx.db.execute(`SELECT * FROM music_group WHERE song_id = ${id}`);
    ctx.body = data;
})
routers.get("/body", async ctx=>{
    let {value} = ctx.request.query;
    let data = await ctx.db.execute(`SELECT DISTINCT * from music_song WHERE musicName like "%${value}%" or singer like "%${value}%"`);
    let done = await ctx.db.execute(`SELECT DISTINCT * from music_top WHERE title like "%${value}%" or singer like "%${value}%"`)
    ctx.body = [data,done]
})
routers.get("/video", async ctx=>{
    let {name} = ctx.request.query;
    let data = await ctx.db.execute(`SELECT * FROM music_top WHERE title = "${name}"`);
    ctx.body = data;
})
routers.get("/who", async ctx=>{
    let {name} = ctx.request.query;
    let data = await ctx.db.execute(`SELECT * FROM music_top WHERE title != "${name}"`);
    let done = [];
    let lgh = data.length;
    while(done.length < 6){
        let num = parseInt(Math.random() * lgh)
        if (done.indexOf(data[num]) == -1) {
            done.push(data[num])
        }
    }
    ctx.body = done
})