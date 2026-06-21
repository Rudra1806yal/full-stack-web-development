// Get form and tbody
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");

// Load existing data from localStorage
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

// Display saved data when page loads
displayDoctors();

// Form Submit Event
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.querySelector("#name").value;
  let docID = document.querySelector("#docID").value;
  let dept = document.querySelector("#dept").value;
  let exp = Number(document.querySelector("#exp").value);
  let email = document.querySelector("#email").value;
  let mbl = document.querySelector("#mbl").value;

  // Determine role
  let role = "";

  if (exp > 5) {
    role = "Senior";
  } else if (exp >= 2) {
    role = "Junior";
  } else {
    role = "Trainee";
  }

  // Create doctor object
  let doctor = {
    name,
    docID,
    dept,
    exp,
    email,
    mbl,
    role
  };

  // Add to array
  doctors.push(doctor);

  // Save to localStorage
  localStorage.setItem("doctors", JSON.stringify(doctors));

  // Refresh table
  displayDoctors();

  // Reset form
  form.reset();
});

// Function to display doctors
function displayDoctors() {
  tbody.innerHTML = "";

  doctors.forEach((doctor, index) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${doctor.name}</td>
      <td>${doctor.docID}</td>
      <td>${doctor.dept}</td>
      <td>${doctor.exp}</td>
      <td>${doctor.email}</td>
      <td>${doctor.mbl}</td>
      <td>${doctor.role}</td>
      <td style="color:red; cursor:pointer;">Delete</td>
    `;

    // Delete functionality
    tr.lastElementChild.addEventListener("click", function () {
      doctors.splice(index, 1);

      localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
      );

      displayDoctors();
    });

    tbody.appendChild(tr);
  });
}