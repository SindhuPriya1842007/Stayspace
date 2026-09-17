const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const root = __dirname;
const port = 5500;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
const server = http.createServer((req,res)=>{
  let urlPath = decodeURIComponent((req.url||'/').split('?')[0]);
  if(urlPath === '/') urlPath='/index.html';
  const file = path.join(root,urlPath);
  if(!file.startsWith(root)) {res.writeHead(403); return res.end('Forbidden');}
  fs.stat(file,(err,st)=>{
    let target=file;
    if(!err && st.isDirectory()) target=path.join(file,'index.html');
    fs.readFile(target,(e,data)=>{
      if(e){res.writeHead(404,{'Content-Type':'text/plain'}); return res.end('404 Not Found: '+urlPath);}
      const ext=path.extname(target).toLowerCase();
      res.writeHead(200,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':'no-cache'}); res.end(data);
    });
  });
});
server.listen(port,'127.0.0.1',()=>{
  const url=`http://127.0.0.1:${port}/`;
  console.log(`StayScape running at ${url}`);
  exec(`start "" "${url}"`);
});
