$(function(){

    activateButton();
    submitNewIdea();
    getAllIdeas();
});


var submitNewIdea = function(){
    $('#submit-idea-button').click(()=>{
        console.log('trying to submit')
        var date = document.createElement("input")
        date.type="hidden"
        date.name="lastModified"
        date.value = new Date()
        document.getElementById('submit-idea').appendChild(date)
        document.getElementById('submit-idea').submit()
    })
}
var activateButton = function(){
   $("#add-new").click(()=>{
       //console.log("clicked");
       $(".overlay").css("display","flex");
   })
   $("#close-btn").click(()=>{
       //console.log("clicked");
       $(".overlay").css("display","none");
   })
   
}

var createIdeaLayout = function(data){
    var ss = document.getElementById('scrollable-data')
    ss.innerHTML+='<div class="idea"><div class = "left-strip"></div><div class="hero-text"><div class = "title">'+data.title+'</div><div class = "desc">'+data.description+'</div></div><div class="date-stamp"> Last modified:'+data.lastModified.split('T')[0]+'</div><a href = "'+data.github+'"><div class = "github-link"><i class = "fab fa-github"></i></div></a></div>'
}
var getAllIdeas = function(){
    fetch('/fetchIdeas').then((response)=>{
        response.json().then((data)=>{
            for(var i=0;i<data.length;i++){
                createIdeaLayout(data[i])
            }
            document.getElementById('scrollable-data').innerHTML+='<div style = "height:100px;width:100vw;display:flex;justify-content:center;flex-direction:column"><div style = "height:2px;background-color:grey;width:100%"></div></div>'
        })
        
    })
    
}