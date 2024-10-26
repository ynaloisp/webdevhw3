// Grade to point mapping
const gradeToPoint = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

document.getElementById("add-row").addEventListener("click", addRow);
document
  .getElementById("calculate-gpa")
  .addEventListener("click", calculateGPA);
document.getElementById("reset").addEventListener("click", resetTable);

function addRow() {
  const tableBody = document.getElementById("table-body");
  const row = document.createElement("tr");

  row.innerHTML = `
      <td><input type="text" class="course-name" placeholder="Course Name"></td>
      <td>
        <select class="grade">
          <option value="">Select</option>
          ${Object.keys(gradeToPoint)
            .map((grade) => `<option value="${grade}">${grade}</option>`)
            .join("")}
        </select>
      </td>
      <td><input type="text" class="credits" placeholder="Credits"></td>
      <td><button class="delete-row">X</button></td>
    `;

  tableBody.appendChild(row);

  // Add event listener to delete button
  row
    .querySelector(".delete-row")
    .addEventListener("click", () => row.remove());
}

function calculateGPA() {
  let totalPoints = 0;
  let totalCredits = 0;

  document.querySelectorAll("#table-body tr").forEach((row) => {
    const grade = row.querySelector(".grade").value;
    const credits = parseFloat(row.querySelector(".credits").value);

    if (grade && credits) {
      const points = gradeToPoint[grade] * credits;
      totalPoints += points;
      totalCredits += credits;
    }
  });

  const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "-";
  document.getElementById("gpa-result").textContent = `GPA: ${gpa}`;
}

function resetTable() {
  document.querySelectorAll("#table-body tr").forEach((row) => {
    row.querySelector(".course-name").value = "";
    row.querySelector(".grade").value = "";
    row.querySelector(".credits").value = "";
  });
}
