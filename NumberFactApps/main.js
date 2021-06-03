let input=document.getElementById('input');

input.addEventListener('input',getfact);


function getfact(e){
    e.preventDefault();
    if(input.value==''){
        output='';
        document.getElementById('output').innerHTML=output;
    }
    else{
        fetch('http://numbersapi.com/'+input.value).then((res)=>{
        return res.text();
    }).then((facts)=>{
        output='<h3> Number fact </h3>';
        output+=`<p>${facts}</p>`;
        document.getElementById('output').innerHTML=output;
    })
    }

}

document.getElementById('up').addEventListener('click',upfun);
document.getElementById('down').addEventListener('click',downfun);

function upfun(e){
    e.preventDefault();
    if(input.value==''){
        input.value=1;
    }
    else{
        input.value=input.value+1;
    }
    fetch('http://numbersapi.com/'+input.value).then((res)=>{
        return res.text();
    }).then((facts)=>{
        output='<h3> Number fact </h3>';
        output+=`<p>${facts}</p>`;
        document.getElementById('output').innerHTML=output;
    })
}

function downfun(e){
    e.preventDefault();
    if(input.value==null){
        input.value=-1;
    }
    else{
        input.value=input.value-1;
    }
    fetch('http://numbersapi.com/'+input.value).then((res)=>{
        return res.text();
    }).then((facts)=>{
        output='<h3> Number fact </h3>';
        output+=`<p>${facts}</p>`;
        document.getElementById('output').innerHTML=output;
    })
}