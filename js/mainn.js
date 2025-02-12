// Get elements from the DOM
var siteNameinput = document.getElementById('siteName');
var siteUrlinput = document.getElementById('siteUrl');
var invalidName = document.getElementById('invalid-name');
var invalidUrl = document.getElementById('invalid-url');
var errorMessage = document.getElementById('errorMessage');
var arrBookmark = [];

// Check if there is stored data in LocalStorage and load it
if (localStorage.getItem('item')) {
  try {
    arrBookmark = JSON.parse(localStorage.getItem('item'));
    display();
  } catch (e) {
    console.error("Error reading from localStorage", e);
    arrBookmark = [];
  }
}

// Function to validate the site name input
function validateName() {
  var nameRegx = /^[A-Za-z][A-Za-z0-9_]{2,15}$/;
  if (nameRegx.test(siteNameinput.value)) {
    siteNameinput.classList.remove("is-invalid");
    siteNameinput.classList.add("is-valid");
    invalidName.classList.add("d-none");
    return true;
  } else {
    siteNameinput.classList.remove("is-valid");
    siteNameinput.classList.add("is-invalid");
    invalidName.classList.remove("d-none");
    return false;
  }
}

// Function to validate the site URL input
function validateUrl() {
  var urlRegx = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
  if (urlRegx.test(siteUrlinput.value)) {
    siteUrlinput.classList.remove("is-invalid");
    siteUrlinput.classList.add("is-valid");
    invalidUrl.classList.add("d-none");
    return true;
  } else {
    siteUrlinput.classList.add("is-invalid");
    siteUrlinput.classList.remove("is-valid");
    invalidUrl.classList.remove("d-none");
    return false;
  }
}

// Function to add a new site to the bookmark list
function addBook() {
  if (siteNameinput.value === "" || siteUrlinput.value === "") {
    errorMessage.classList.remove("d-none");
    setTimeout(function() {
      errorMessage.classList.add("d-none");
    }, 3000);
  } else {
    // Validate input before adding
    if (validateName() && validateUrl()) {
      var objbookmark = {
        siteName: siteNameinput.value,
        siteUrl: siteUrlinput.value
      };
      arrBookmark.push(objbookmark);
      localStorage.setItem('item', JSON.stringify(arrBookmark)); // Store data in LocalStorage
      display(); // Update site display
      clear(); // Clear input fields
      remove_Validate(); // Remove validation classes
    } else {
      alert("Please enter valid data");
    }
  }
}

// Function to display the saved bookmarks
function display() {
  var cartona = "";
  for (var i = 0; i < arrBookmark.length; i++) {
    cartona += `
                  <tr>
                <td>${i + 1}</td>
                <td>${arrBookmark[i].siteName}</td>
                <td> <a href="${arrBookmark[i].siteUrl}" class="btn btn-danger" target="_blank">visit</a></td>
                <td><button onclick="setvalue(${i})" class="btn bg-info text-light "> update</button></td>
                <td><button class="btn btn-success text-light " onclick="deleteitem(${i})">delete</button></td>
              </tr>`;
  }
  document.getElementById('tableBody').innerHTML = cartona;
}

// Function to clear input fields
function clear() {
  siteNameinput.value = "";
  siteUrlinput.value = "";
}

// Function to delete a bookmark from the list
function deleteitem(index) {
  arrBookmark.splice(index, 1);
  localStorage.setItem('item', JSON.stringify(arrBookmark));
  display();
}

var update;
// Function to set values for updating a bookmark
function setvalue(index) {
  update = index;
  document.getElementById("submitBtn").classList.replace('d-block', 'd-none');
  document.getElementById("updateBtn").classList.replace('d-none', 'd-block');
  siteNameinput.value = arrBookmark[index].siteName;
  siteUrlinput.value = arrBookmark[index].siteUrl;
}

// Function to update an existing bookmark
function updatevalue() {
  arrBookmark[update].siteName = siteNameinput.value;
  arrBookmark[update].siteUrl = siteUrlinput.value;
  display();
  clear();
  remove_Validate();
  localStorage.setItem('item', JSON.stringify(arrBookmark));
  document.getElementById("updateBtn").classList.replace('d-block', 'd-none');
  document.getElementById("submitBtn").classList.replace('d-none', 'd-block');
}

// Function to search for bookmarks based on input
function search(input) {
  let cartona = "";
  for (let i = 0; i < arrBookmark.length; i++) {
    if (arrBookmark[i].siteName.toLowerCase().includes(input.toLowerCase()) ||
      arrBookmark[i].siteUrl.toLowerCase().includes(input.toLowerCase())) {
      cartona += `
                  <tr>
                <td>${i + 1}</td>
                <td>${arrBookmark[i].siteName.replace(input, `<span class="text-info">${input}</span>`)}</td>
                <td> <a href="${arrBookmark[i].siteUrl}" class="btn btn-danger text-light ">visit</a></td>
                <td><button onclick="setvalue(${i})" class="btn bg-info text-light "> update</button></td>
                <td><button class="btn btn-success text-light " onclick="deleteitem(${i})">delete</button></td>
              </tr>`;
    }
  }
  document.getElementById('tableBody').innerHTML = cartona;
}

// Function to remove validation classes from input fields
function remove_Validate() {
  siteNameinput.classList.remove("is-valid");
  siteUrlinput.classList.remove("is-valid");
}
