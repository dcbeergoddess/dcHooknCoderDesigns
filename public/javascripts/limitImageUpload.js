const form = document.querySelector("form");
const fileInput = document.querySelector("input[type=file]")
 
form.addEventListener("submit", function() {
  if(fileInput.files.length > 3) {
    e.preventDefault();
    req.flash('error', 'You Have Uploaded More Than 3 Images!');
  }
});