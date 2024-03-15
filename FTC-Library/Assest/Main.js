const ToggleBtn=document.getElementsByClassName("toggle-btn")[0]
const BtnLinks=document.getElementsByClassName('links')[0]

ToggleBtn.addEventListener("click", function(){
    if (BtnLinks.style.display === "none") {
      BtnLinks.style.display = "flex";
      } else {
        BtnLinks.style.display = "none";
      }
    
});


BtnLinks.classList.toggle('active');