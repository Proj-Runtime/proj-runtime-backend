/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/

function ShowAndHide() {
    let td = document.querySelectorAll(".hide");
    for(let i = 0; i < td.length; i++) {
        if (td[i].style.display === "none") {
            td[i].style.display = null;
        } else {
            td[i].style.display = "none";
        }
    }
}

window.onload = function(){
    var dropdown = document.getElementById("statTextField");
    var showResolutionField = document.getElementById("showResolutionField");
    dropdown.addEventListener("change", function() {
        if(dropdown.value == 'Closed'){
            showResolutionField.style.display = "block";
            document.getElementById("rsltnTextField").setAttribute("required", "");
        }else{
            showResolutionField.style.display = "none";
        }
    });
}