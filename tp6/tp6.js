var http = require('http')
var axios = require('axios')
var fs = require('fs')
var { parse } = require('querystring')



function recuperaInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}



function geraPagina(type) {
    let pagHtml =
        `
   <html>
   <head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
       <title>To Do List</title>
       <meta charset="utf-8">
       <link rel="stylesheet" href="w3.htm">
   </head>
   <body>
       <h1>Tarefas</h1>
       <div class="w3-container w3-teal">
           <h2>Nova Tarefa</h2>
       </div>
         
         <form class="w3-container" action="/pendentes" method="POST">
         <p>
         <label class="w3-text-teal"><b>Id</b></label>
         <input class="w3-input w3-border w3-green" type="text" name="id">
         </p>
           <p>
           <label class="w3-text-teal"><b>Descrição</b></label>
           <input class="w3-input w3-border w3-green" type="text" name="descricao">
           </p>
           <p>
           <label class="w3-text-teal"><b>Responsável</b></label>
           <input class="w3-input w3-border w3-green" type="text" name="responsavel">
           </p>
       <p>
           <label class="w3-text-teal"><b>Data Limite</b></label>
           <input class="w3-input w3-border w3-green" type="text" name="data_limite">
       </p>  
           <input class="w3-btn w3-blue" type="submit" value="Registar">
           <input class="w3-btn w3-blue" type="reset" value="Limpar"> 
         </form>
         <div class="w3-container w3-teal">
           <h3>Pendentes</h3>
       </div>
        `


    switch (type) {
        case "pendentes":
            pendentes.forEach(tp => {
                pagHtml += `
            
            <p> id Tarefa : ${tp.id} </p> 
            <p> Descrição : ${tp.descricao} </p>
            <p> Responsável : ${tp.responsavel} </p>
            <p> Data limite : ${tp.data_limite} </p> 
        
            </body>
                </html>
                `
            });

        case "resolvidas":
            tarefas.forEach(tp => {
                pagHtml += `   
                    <p> id Tarefa : ${tp.id} </p> 
                    <p> Descrição : ${tp.descricao} </p>
                    <p> Responsável : ${tp.responsavel} </p>
                    <p> Data limite : ${tp.data_limite} </p> 
                
                    </body>
                        </html>
                        `
            });

        case "canceladas":
            canceladas.forEach(tp => {
                pagHtml += `   
                            <p> id Tarefa : ${tp.id} </p> 
                            <p> Descrição : ${tp.descricao} </p>
                            <p> Responsável : ${tp.responsavel} </p>
                            <p> Data limite : ${tp.data_limite} </p> 
                        
                            </body>
                                </html>
                                `
            });
    }

    return pagHtml

}

var server = http.createServer(function (req, res) {

    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)


    switch (req.method) {
        case "GET":
            // GET tarefas
            if ((req.url == "/") || (req.url == "/tarefas")) {

                axios.get("http://localhost:3000/pendentes")
                    .then(response => {
                        pendentes = response.data

                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write(geraPagina(pendentes))
                        res.end()
                    })
                    .catch(function (erro) {
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write("<p>Não foi possível obter tarefas pendentes")
                        res.end()
                    })


                axios.get("http://localhost:3000/resolvidas")
                    .then(response => {
                        resolvidas = response.data
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write(geraPagina(resolvidas))
                        res.end()

                    })
                    .catch(function (erro) {
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write("<p>Não foi possível obter tarefas resolvidas")
                        res.end()
                    });

                axios.get("http://localhost:3000/canceladas")
                    .then(response => {
                        canceladas = response.data
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write(geraPagina(canceladas))
                        res.end()

                    })
                    .catch(function (erro) {
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write("<p>Não foi possível obter tarefas Canceladas")
                        res.end()
                    });

            }
            // GET pendentes
            else if ((req.url == "/pendentes")) {

                axios.get("http://localhost:3000/pendentes")

                    .then(response => {


                        tarP = response.data
                        let tarefasPendentes = ` `
                        tarP.forEach(t => {

                            tarefasPendentes += ` <p>  id : ${t.id} </p> `


                        });
                        geraPagina += tarefasPendentes
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write(geraPagina());
                        res.end()


                    })
                    .catch(function (erro) {
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.write("<p>Não foi possível obter o registo de aluno")
                        res.end()
                    })
            }
            // GET registo alunos
            else if (req.url == "/alunos/registo") {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write(geraFormAluno(d))
                res.end()
            }
            // GET w3.css
            else if (/w3.css$/.test(req.url)) {
                fs.readFile("w3.css", function (erro, dados) {
                    if (!erro) {
                        res.writeHead(200, { 'Content-Type': 'text/css;charset=utf-8' })
                        res.write(dados)
                        res.end()
                    }
                })
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " " + req.url + " não suportado.</p>")
                res.end()
            }
            break
        case "POST":
            if (req.url == '/tarefas') {
                
                recuperaInfo(req, function (info)  {
                    console.log('POST de tarefa' + JSON.stringify(info))

                    axios.post("http://localhost:3000/tarefas/", info)
                        .then(response => {
                            let a = response.data

                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Erro no POST")
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                })


                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })

                res.write('<p>Recebi um POST dum aluno</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p> POST" + req.url + " não suportado.</p>")
                res.end()


            }

            break
        default:
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.write("<p>" + req.method + " não suportado.</p>")
            res.end()
    }
})

server.listen(7777)
console.log('Servidor à escuta na porta 7777')