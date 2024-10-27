const courseContainer = document.querySelector('.table-container tbody');
const addCourseBtn = document.getElementById('add-row-btn');
const calcGpaBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('reset-btn');
const displayGpa = document.getElementById('gpa-result');

//grade point values
const gradePointMap = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
};

// adding a new row
function appendCourseRow() {
    const courseRow = document.createElement('tr');
    courseRow.classList.add('course-row');
    courseRow.innerHTML = `
        <td><input type="checkbox" class="row-check" checked></td>
        <td><input type="text" placeholder="Course Name"></td>
        <td>
            <select class="grade-select">
                <option value="">--</option>
                ${Object.entries(gradePointMap).map(([grade, _]) => `<option value="${grade}">${grade}</option>`).join('')}
            </select>
        </td>
        <td><input type="number" class="credits" min="0" step="0.5" placeholder="Credits"></td>
        <td><button type="button" class="remove-btn">X</button></td>
    `;
    courseContainer.appendChild(courseRow);

    
    courseRow.querySelector('.remove-btn').addEventListener('click', () => {
        courseRow.remove();
    });
}

//calculating gpa
function computeGPA() {
    let accumulatedCredits = 0;
    let weightedGrades = 0;

    courseContainer.querySelectorAll('.course-row').forEach(row => {
        const isSelected = row.querySelector('.row-check').checked;
        const grade = row.querySelector('.grade-select').value;
        const credits = parseFloat(row.querySelector('.credits').value);

        if (isSelected && grade && !isNaN(credits)) {
            accumulatedCredits += credits;
            weightedGrades += credits * gradePointMap[grade];
        }
    });

    const calculatedGPA = accumulatedCredits > 0 ? (weightedGrades / accumulatedCredits).toFixed(2) : '0.00';
    displayGpa.textContent = calculatedGPA;
}

// Function to reset form
function resetForm() {
    courseContainer.querySelectorAll('.course-row').forEach(row => {
        const isSelected = row.querySelector('.row-check').checked;
        if (isSelected) {
            row.querySelector('.grade-select').value = '';
            row.querySelector('.credits').value = '';
        }
    });
    displayGpa.textContent = '0.00';
}


addCourseBtn.addEventListener('click', appendCourseRow);
calcGpaBtn.addEventListener('click', computeGPA);
clearBtn.addEventListener('click', resetForm);


appendCourseRow();
