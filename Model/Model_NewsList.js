const  db=require('../dao/dataBase');

function NewsList(){
    this.parse=(page,urlquery)=>{
        db.Custom('select count(*) from newslist',urlquery,(rows,urlquery)=>{
            urlquery.allNum = rows[0]['count(*)'];//给对象添加numb个数
            urlquery.pnum = Math.ceil(urlquery.allNum/urlquery.pages);
            //开始和结束
                 var ned = urlquery.pageID*urlquery.pages;
                 var nst = (ned-urlquery.pages>0)?(ned-urlquery.pages)+1:1;
            var sql ="select * from newslist where id>="+nst+" and id<="+ned+";"; 
            db.Custom(sql,urlquery,(rows,urlquery)=>{
             var json ={
                "pnum":urlquery.pnum, //一共有多少页面
                "content":rows, //根据提供的数据查到的当前页面data
                      }               
                global.response.writeHead(200,{"Content-Type":"application/json",'Access-Control-Allow-Origin':'*'});
                global.response.end(JSON.stringify(json));
            });

         });
         
    }
}
var newsList=new NewsList();
exports.parse = newsList.parse;