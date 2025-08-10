let dropdown=document.querySelector("#options");
let panel=document.querySelector("#panel1");
let allgroups=document.querySelectorAll("optgroup");
let button=document.querySelector("#bttn");
let container1=document.querySelector(".container1");
let input=document.querySelector("input");
let from=document.querySelector("#from");
let to=document.querySelector("#to");
let result=document.querySelector("#result");

  

function choice(){
     allgroups.forEach((group) => {
        if(group.label===dropdown.value){
           group.style.display="block";
         }else{
            group.style.display="none";
         }
   });
}
 dropdown.addEventListener("change",()=>{
     panel.innerText=dropdown.value;
     choice();
 });

 
 const conversions=()=>{
   let value=input.value;
    let fromunit=from.value;
   let tounit=to.value;
   if(value===""||value<0){
    calcresult=" ";
    return;
   }
    const currencies=["USD","INR","EUR"];
    if(currencies.includes(fromunit)&& currencies.includes(tounit)){
      getfacts(fromunit,tounit,value);
    }

    if(fromunit==="minute" && tounit==="seconds"){
        calcresult= value*60 + tounit;
   } else if(fromunit==="minute" && tounit==="hours"){
       calcresult= value/60 + tounit ;
    } else if(fromunit==="seconds" && tounit==="hours"){
      calcresult=value/3600 + tounit;
   } else if(fromunit==="seconds" && tounit==="minute"){
      calcresult=value/60 + tounit;
   } else if(fromunit==="hours" && tounit==="minute"){
      calcresult=value*60 + tounit;
   } else if(fromunit==="hours" && tounit==="seconds"){
      calcresult=value*3600 + tounit;
   } else if(fromunit==="meter" && tounit==="centimeter"){
       calcresult= value*100 + tounit;
   } else if(fromunit==="meter" && tounit==="kilometer"){
      calcresult= value*1000 + tounit;
   } else if(fromunit==="kilometer" && tounit==="centimeter"){
      calcresult= value*100000 + tounit;
   } else if(fromunit==="centimeter" && tounit==="meter"){
      calcresult= value*100 + tounit;
   } else if(fromunit==="centimeter" && tounit==="kilometer"){
      calcresult= value/100000 + tounit;
   } else if(fromunit==="kilometer" && tounit==="meter"){
      calcresult= value*1000 + tounit;
   } else if(fromunit==="gram" && tounit==="kilogram"){
       calcresult= value/1000 + tounit;
   } else if(fromunit==="kilogram" && tounit==="gram"){
       calcresult= value*1000 + tounit;
   } else if(fromunit==="kelvin" && tounit==="celsius"){
      calcresult= value - 273.15 + tounit;
   } else if(fromunit==="kelvin" && tounit==="farenheit"){
      calcresult=(value-273.15)*9/5+32  + tounit;
   }  else if(fromunit==="celsius" && tounit==="kelvin"){
        calcresult= value+273.15 + tounit;
   }  else if(fromunit==="celsius" && tounit==="farenheit"){
        calcresult= (value*9/5)+32 + tounit;
   }  else if(fromunit==="farenheit" && tounit==="celsius"){
        calcresult= (value-32)*5/9 + tounit;
   }  else if(fromunit==="farenheit" && tounit==="kelvin"){
        calcresult=( value-32)*5/9+273.15 + tounit;
   }  else if(fromunit==="m/s" && tounit==="km/h"){
        calcresult= value*3.6+ tounit;
   }  else if(fromunit==="km/h" && tounit==="m/s"){
        calcresult= value/3.6+ tounit;
   } else if(fromunit==="litre" && tounit==="millilitre"){
         calcresult= value*1000 + tounit;
   }  else if(fromunit==="millilitre" && tounit==="litre"){
        calcresult= value/1000+ tounit;
   }  
}


 async function getfacts(fromunit,tounit,value){
   if(value===""||value<0){
    calcresult=" ";
    return;
   }
   const URL=`https://api.frankfurter.app/latest?from=${fromunit}&to=${tounit}`;
   let response=await fetch(URL);
   let data =await response.json();
   calcresult=data.rates[tounit] + tounit;
    
 }

input.addEventListener("input",conversions);
from.addEventListener("change",conversions,);
to.addEventListener("change",conversions,);

button.addEventListener("click",()=>{
   getfacts();
    result.textContent=calcresult;
   container1.classList.add("hidden");
   setTimeout(()=>{
      container1.classList.remove("hidden");
   },2000);
  
 });