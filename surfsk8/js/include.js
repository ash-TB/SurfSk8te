function includeHTML(){
    var z, i, elmnt, file, xhttp;
    // loop all html elements
    z=document.getElementsByTagName("*");
    for(i=0; i<z.length; i++){
        elmnt = z[i]
        file = elmnt.getAttribute("w3-include-html");
        if (file){
            http =new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4){
                    if(this.status == 200){elmnt.innerHTML =this.responseText;}
                    if(this.status == 404){elmnt.innerHTML ="PAGE NOT FOUND.";}
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
    }
}