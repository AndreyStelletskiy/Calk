'use strict';

function addvalue(e){
    let display = document.getElementById("display")
    if (display.value[0]=="0" & display.value.length==1){display.value=""}
    if (display.value.length!=0){
        let ls = display.value[display.value.length - 1]
        if ((ls == "+" || ls=="-"|| ls=="*" || ls == "/"|| ls==".") & (e == "+" || e=="-"|| e=="*" || e == "/" || e==".")){display.value=display.value.substring(0, display.value.length - 1)+e}

        else if (e=="neg" & display.value[0]!="-"){display.value="-"+display.value}
        else if (e=="neg" & display.value[0]=="-"){display.value=display.value.substring(1, display.value.length)}

        else if (e=="del"){
            if (ls == "+" || ls=="-"|| ls=="*" || ls == "/"|| ls=="."){display.value=display.value.substring(0, display.value.length - 1)}
            display.value="1/("+display.value+")"}
        else if (e=="sqr"){
            if (ls == "+" || ls=="-"|| ls=="*" || ls == "/"|| ls=="."){display.value=display.value.substring(0, display.value.length - 1)}
            display.value="("+display.value+")**2"}
        else if (e=="sqrt"){
            if (ls == "+" || ls=="-"|| ls=="*" || ls == "/"|| ls=="."){display.value=display.value.substring(0, display.value.length - 1)}
            display.value="("+display.value+")**0.5"}
        else if (e=="perc"){
            display.value="("+display.value+")/100"
            calculate()}

        else if ((ls == "/") & (e == "0")){display.value = display.value}
        else{display.value=display.value+e}
    } else if(e == "+" || e=="-"|| e=="*" || e == "/"|| e=="neg" || e=="del" || e=="sqrt" || e=="sqr" || e=="perc"){
        display.value = display.value
    } else if(e=="."){
        display.value = display.value+"0."
    }else {display.value=display.value+e}
    if (display.value.length==0){display.value="0"}
    console.log(display.value)
}

document.addEventListener('keyup', function(event){
    if (event.key>=0 &event.key<10 || event.key== "+" || event.key=="-"|| event.key=="*" || event.key == "/"){addvalue(event.key)}
    if (event.key=="="|| event.key=="Enter"){calculate()}
    if (event.key=="Backspace"){del()}
    if (event.key=="Delete"){clean()}
});




function clean(e){
    if (e==="CE"){
        let display = document.getElementById("display")
        display.value ="0"
    }
    if (e==="C"){
        let display = document.getElementById("display")
        let memo = document.getElementById("mem")
        localStorage.setItem("mem","0")
        memo.value=localStorage.getItem("mem")
        display.value ="0"

    }
}

function del(){
    let display = document.getElementById("display")
    display.value=display.value.substring(0, display.value.length - 1)
    if (display.value==""){display.value="0"}
}

function calculate(){
    let display = document.getElementById("display")
    let hist = document.getElementById("hist")
    let ls = display.value[display.value.length - 1]
    if (display.value.length<3){return}
    if (display.value[display.value.length - 1]=="*" & display.value[display.value.length - 2]=="*"){display.value=display.value.substring(0, display.value.length - 2)}
    if ((ls == "+" || ls=="-"|| ls == "/" ||ls=="*")){display.value=display.value.substring(0, display.value.length - 1)}

    if (localStorage.getItem("his")){localStorage.setItem('his', localStorage.getItem("his")+'\n'+display.value+"="+eval(display.value));}
    else{localStorage.setItem('his', display.value+"="+eval(display.value));}

    display.value = eval(display.value)
    hist.value=localStorage.getItem("his")
    console.log(display.value,hist.value)

}

window.onload = function () {
    let memo = document.getElementById("mem")
    hist.value=localStorage.getItem("his")
    if (localStorage.getItem("mem")==""){
        localStorage.setItem("mem","0")
    }
    memo.value=localStorage.getItem("mem")
}

function hclean(){
    localStorage.setItem("his","")
    hist.value = localStorage.getItem("his")
}

function mem(e){
    let memo = document.getElementById("mem")
    if (e==="M+"){
        if (localStorage.getItem("mem")){localStorage.setItem('mem', eval(localStorage.getItem("mem")+'+'+eval(display.value)));}
        else{localStorage.setItem('mem', eval(display.value))}
    }
    if (e==="M-"){
        if (localStorage.getItem("mem")){localStorage.setItem('mem', eval(localStorage.getItem("mem")+'-'+eval(display.value)));}
        else{localStorage.setItem('mem', eval('-('+display.value+')'))}
    }
    if (e==="MC"){localStorage.setItem("mem","0")}
    memo.value=localStorage.getItem("mem")
    if (e=="Click"){
        display.value = display.value+localStorage.getItem("mem")
    }
}

function getLineNumber(textarea) {
    let ns = textarea.value.substr(0, textarea.selectionStart).split("\n").length
    let zn = textarea.value.split('\n')[ns-1]
    if (display.value=="0"){display.value=""}
    display.value = display.value + zn.split("=")[0]
}

