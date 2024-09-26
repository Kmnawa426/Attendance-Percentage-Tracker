// Get DOM elements
const studentInput = document.getElementById('student-name-input');
const addStudentBtn = document.getElementById('add-student-btn');
const studentList = document.getElementById('student-list');

// Load students and percentages from localStorage
let students = JSON.parse(localStorage.getItem('students')) || {};

function updateLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Add student event listener
addStudentBtn.addEventListener('click', () => {
    const name = studentInput.value.trim();
    if (name && !students[name]) {
        students[name] = 100;  // Initialize student with 100% 
        addStudentToList(name, students[name]);
        updateLocalStorage();
    }
    studentInput.value = '';  // Clear input field
});

// Add student to the UI
function addStudentToList(name, percentage) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${name}</span>
        <span class="percentage">${percentage}%</span>
        <div>
            <button class="percentage-btn" onclick="decreasePercentage('${name}')">-3</button>
            <button class="percentage-btn" onclick="increasePercentage('${name}')">+1</button>
        </div>
    `;
    studentList.appendChild(li);
}

// Load all students on page load
Object.keys(students).forEach(name => addStudentToList(name, students[name]));

// Decrease percentage by 3
function decreasePercentage(name) {
    if (students[name] >= 3) {
        students[name] -= 3;
    } else {
        students[name] = 0;  // Ensure it doesn't go below 0
    }
    updateStudentUI(name);
    updateLocalStorage();
}

// Increase percentage by 1
function increasePercentage(name) {
    if (students[name] < 100) {
        students[name] += 1;
    }
    updateStudentUI(name);
    updateLocalStorage();
}

// Update the percentage display for a student
function updateStudentUI(name) {
    const percentageElements = document.querySelectorAll('.percentage');
    percentageElements.forEach(el => {
        if (el.previousElementSibling.textContent === name) {
            el.textContent = `${students[name]}%`;
        }
    });
}
