// ================ INITIALIZATION ================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initTheme();
  renderSubjects();
  setupEventListeners();
  updateOverallProgress();
});

// ================ THEME MANAGEMENT ================
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  
  // Check saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });
}

// ================ SUBJECT DATA & PROGRESS ================
const subjects = {
  Mathematics: {
    chapters: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Some Applications of Trigonometry",
      "Circles",
      "Constructions",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability"
    ]
  },
  Science: {
    physics: [
      "Light - Reflection and Refraction",
      "Human Eye and Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Sources of Energy"
    ],
    chemistry: [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Periodic Classification of Elements"
    ],
    biology: [
      "Life Processes",
      "Control and Coordination",
      "How do Organisms Reproduce?",
      "Heredity and Evolution",
      "Our Environment",
      "Management of Natural Resources"
    ]
  },
  English: {
    books: {
      "First Flight": [
        "A Letter to God",
        "Nelson Mandela: Long Walk to Freedom",
        "Two Stories about Flying",
        "From the Diary of Anne Frank",
        "The Hundred Dresses–I",
        "The Hundred Dresses–II",
        "Glimpses of India",
        "Mijbil the Otter",
        "Madam Rides the Bus",
        "The Sermon at Benares",
        "The Proposal"
      ],
      "Footprints Without Feet": [
        "A Triumph of Surgery",
        "The Thief's Story",
        "The Midnight Visitor",
        "A Question of Trust",
        "Footprints without Feet",
        "The Making of a Scientist",
        "The Necklace",
        "The Hack Driver",
        "Bholi",
        "The Book That Saved the Earth"
      ]
    }
  },
  "Social Science": {
    history: [
      "The Rise of Nationalism in Europe",
      "Nationalism in India",
      "The Making of a Global World",
      "The Age of Industrialisation",
      "Print Culture and the Modern World"
    ],
    geography: [
      "Resources and Development",
      "Water Resources",
      "Agriculture",
      "Minerals and Energy Resources",
      "Manufacturing Industries",
      "Life Lines of National Economy"
    ],
    politicalScience: [
      "Power-sharing",
      "Federalism",
      "Democracy and Diversity",
      "Gender, Religion and Caste",
      "Popular Struggles and Movements",
      "Political Parties",
      "Outcomes of Democracy",
      "Challenges to Democracy"
    ],
    economics: [
      "Development",
      "Sectors of the Indian Economy",
      "Money and Credit",
      "Globalisation and the Indian Economy",
      "Consumer Rights"
    ]
  },
  Hindi: {
    chapters: [
      "सूरदास",
      "तुलसीदास",
      "देव",
      "जयशंकर प्रसाद",
      "सूर्यकांत त्रिपाठी 'निराला'",
      "नागार्जुन",
      "गिरिजा कुमार माथुर",
      "ऋतुराज",
      "मंगलेश डबराल",
      "स्वयं प्रकाश",
      "रामवृक्ष बेनीपुरी",
      "यशपाल",
      "सर्वेश्वर दयाल सक्सेना",
      "मन्नू भंडारी",
      "महावीर प्रसाद द्विवेदी",
      "यतीन्द्र मिश्र",
      "भदंत आनंद कौसल्यायन"
    ]
  }
};

const progressColors = {
  Mathematics: "#4caf50",
  Science: "#f44336",
  English: "#2196F3",
  "Social Science": "#ff9800",
  Hindi: "#9c27b0"
};

// Resource data for each chapter
const chapterResources = {
  "Mathematics": {
    "Real Numbers": {
      videoLectures: [
        { title: "Introduction to Real Numbers", url: "https://youtu.be/example1", duration: "15:23" },
        { title: "Euclid's Division Lemma", url: "https://youtu.be/example2", duration: "12:45" }
      ],
      studyMaterials: [
        { title: "NCERT Chapter PDF", url: "https://ncert.nic.in/textbook/pdf/iemh1dd.pdf" },
        { title: "Important Formulas", url: "https://example.com/formulas" }
      ],
      pyqs: [
        { title: "2023 Board Questions", url: "https://example.com/pyq2023" },
        { title: "Last 5 Years Questions", url: "https://example.com/last5years" }
      ],
      recommendedBooks: [
        { title: "RD Sharma Solutions", url: "https://example.com/rdsharma" },
        { title: "RS Aggarwal Guide", url: "https://example.com/rsaggarwal" }
      ]
    }
    // Add resources for other chapters similarly
  },
  "Science": {
    "Light - Reflection and Refraction": {
      videoLectures: [
        { title: "Introduction to Light", url: "https://youtu.be/example3", duration: "18:30" },
        { title: "Laws of Reflection", url: "https://youtu.be/example4", duration: "14:15" }
      ],
      studyMaterials: [
        { title: "NCERT Chapter PDF", url: "https://ncert.nic.in/textbook/pdf/iesc1dd.pdf" },
        { title: "Important Diagrams", url: "https://example.com/diagrams" }
      ],
      pyqs: [
        { title: "2023 Board Questions", url: "https://example.com/pyq2023" },
        { title: "Important Numericals", url: "https://example.com/numericals" }
      ],
      recommendedBooks: [
        { title: "Lakhmir Singh Solutions", url: "https://example.com/lakhmir" },
        { title: "Science Exemplar", url: "https://example.com/exemplar" }
      ]
    }
    // Add resources for other chapters similarly
  }
  // Add resources for other subjects similarly
};

// ================ RENDER SUBJECTS ================
function renderSubjects() {
  const subjectList = document.getElementById('subjectList');
  subjectList.innerHTML = '';
  
  Object.keys(subjects).forEach(subject => {
    const subjectCard = document.createElement('div');
    subjectCard.className = 'subject-card';
    subjectCard.dataset.subject = subject;
    
    const progress = calculateSubjectProgress(subject);
    
    subjectCard.innerHTML = `
      <div class="subject-header">
        <i class="fas ${getSubjectIcon(subject)} subject-icon"></i>
        <h3>${subject}</h3>
        <i class="fas fa-chevron-down toggle-arrow"></i>
      </div>
      <div class="chapter-list">
        ${renderSubjectChapters(subject)}
      </div>
      <div class="progress-container">
        <div class="progress-label">Progress: ${progress}%</div>
        <div class="progress-pill" style="--progress: ${progress}%; --color: ${progressColors[subject]}"></div>
      </div>
    `;
    
    // Toggle chapter list visibility
    const header = subjectCard.querySelector('.subject-header');
    header.addEventListener('click', () => {
      subjectCard.classList.toggle('open');
      
      // If this is the selected subject, update main content
      if (subjectCard.classList.contains('open')) {
        selectedSubject = subject;
        displaySubjectContent(subject);
        updateSubjectProgress(subject);
      } else {
        selectedSubject = null;
        document.getElementById('subjectDisplay').classList.add('hidden');
      }
    });
    
    // Add event listeners to chapter checkboxes
    const checkboxes = subjectCard.querySelectorAll('.chapter-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const chapterItem = this.closest('.chapter-item');
        const subject = chapterItem.dataset.subject;
        const chapter = chapterItem.dataset.chapter;
        updateCheckboxState(subject, chapter, this.checked);
        updateSubjectProgress(subject);
        updateOverallProgress();
      });
    });
    
    subjectList.appendChild(subjectCard);
  });
}

function getSubjectIcon(subject) {
  const icons = {
    Mathematics: 'fa-square-root-alt',
    Science: 'fa-flask',
    English: 'fa-book-open',
    "Social Science": 'fa-globe',
    Hindi: 'fa-language'
  };
  return icons[subject] || 'fa-book';
}

function renderSubjectChapters(subject) {
  let chapters = [];
  if (subject === 'Science') {
    chapters = [...subjects[subject].physics, ...subjects[subject].chemistry, ...subjects[subject].biology];
  } else if (subject === 'Social Science') {
    chapters = [...subjects[subject].history, ...subjects[subject].geography, 
                ...subjects[subject].politicalScience, ...subjects[subject].economics];
  } else if (subject === 'English') {
    chapters = [...subjects[subject].books["First Flight"], ...subjects[subject].books["Footprints Without Feet"]];
  } else {
    chapters = subjects[subject].chapters || [];
  }
  
  return chapters.map(chapter => {
    const isCompleted = isChapterCompleted(subject, chapter);
    return `
      <div class="chapter-item" data-subject="${subject}" data-chapter="${chapter}">
        <input type="checkbox" class="chapter-checkbox" ${isCompleted ? 'checked' : ''}>
        <span class="chapter-title">${chapter}</span>
        <i class="fas fa-chevron-right chapter-arrow"></i>
      </div>
    `;
  }).join('');
}

// ================ PROGRESS CALCULATION ================
function calculateSubjectProgress(subject) {
  let chapters = [];
  if (subject === 'Science') {
    chapters = [...subjects[subject].physics, ...subjects[subject].chemistry, ...subjects[subject].biology];
  } else if (subject === 'Social Science') {
    chapters = [...subjects[subject].history, ...subjects[subject].geography, 
                ...subjects[subject].politicalScience, ...subjects[subject].economics];
  } else if (subject === 'English') {
    chapters = [...subjects[subject].books["First Flight"], ...subjects[subject].books["Footprints Without Feet"]];
  } else {
    chapters = subjects[subject].chapters || [];
  }

  if (chapters.length === 0) return 0;

  let completedCount = 0;
  chapters.forEach(chapter => {
    if (isChapterCompleted(subject, chapter)) completedCount++;
  });

  return Math.round((completedCount / chapters.length) * 100);
}

function calculateOverallProgress() {
  let totalChapters = 0;
  let completedChapters = 0;

  Object.keys(subjects).forEach(subject => {
    let chapters = [];
    if (subject === 'Science') {
      chapters = [...subjects[subject].physics, ...subjects[subject].chemistry, ...subjects[subject].biology];
    } else if (subject === 'Social Science') {
      chapters = [...subjects[subject].history, ...subjects[subject].geography, 
                  ...subjects[subject].politicalScience, ...subjects[subject].economics];
    } else if (subject === 'English') {
      chapters = [...subjects[subject].books["First Flight"], ...subjects[subject].books["Footprints Without Feet"]];
    } else {
      chapters = subjects[subject].chapters || [];
    }

    totalChapters += chapters.length;
    chapters.forEach(chapter => {
      if (isChapterCompleted(subject, chapter)) completedChapters++;
    });
  });

  return totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
}

function updateSubjectProgress(subject) {
  const progress = calculateSubjectProgress(subject);
  
  // Update subject card progress
  const subjectCard = document.querySelector(`.subject-card[data-subject="${subject}"]`);
  if (subjectCard) {
    subjectCard.querySelector('.progress-label').textContent = `Progress: ${progress}%`;
    subjectCard.querySelector('.progress-pill').style.setProperty('--progress', `${progress}%`);
  }
  
  // Update main display if this is the current subject
  if (selectedSubject === subject) {
    document.getElementById('subjectProgressText').textContent = `${progress}%`;
    document.getElementById('subjectProgressFill').style.width = `${progress}%`;
  }
}

function updateOverallProgress() {
  const progress = calculateOverallProgress();
  document.getElementById('overallProgressText').textContent = `${progress}%`;
  
  // Update progress ring
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (progress / 100) * circumference;
  document.querySelector('.progress-ring-fill').style.strokeDashoffset = offset;
  
  // Update chapter counts
  const counts = getChapterCounts();
  document.getElementById('completedChapters').textContent = counts.completed;
  document.getElementById('totalChapters').textContent = counts.total;
}

function getChapterCounts() {
  let completed = 0;
  let total = 0;
  
  Object.keys(subjects).forEach(subject => {
    let chapters = [];
    if (subject === 'Science') {
      chapters = [...subjects[subject].physics, ...subjects[subject].chemistry, ...subjects[subject].biology];
    } else if (subject === 'Social Science') {
      chapters = [...subjects[subject].history, ...subjects[subject].geography, 
                  ...subjects[subject].politicalScience, ...subjects[subject].economics];
    } else if (subject === 'English') {
      chapters = [...subjects[subject].books["First Flight"], ...subjects[subject].books["Footprints Without Feet"]];
    } else {
      chapters = subjects[subject].chapters || [];
    }
    
    chapters.forEach(chapter => {
      total++;
      if (isChapterCompleted(subject, chapter)) completed++;
    });
  });
  
  return { completed, total };
}

// ================ CHAPTER MANAGEMENT ================
function isChapterCompleted(subject, chapter) {
  return localStorage.getItem(`chapter-${subject}-${chapter}`) === 'completed';
}

function updateCheckboxState(subject, chapter, isChecked) {
  localStorage.setItem(`chapter-${subject}-${chapter}`, isChecked ? 'completed' : '');
}

// ================ MAIN CONTENT DISPLAY ================
let selectedSubject = null;

function displaySubjectContent(subject) {
  const subjectDisplay = document.getElementById('subjectDisplay');
  subjectDisplay.classList.remove('hidden');
  
  document.getElementById('subjectTitle').innerHTML = `
    <i class="fas ${getSubjectIcon(subject)}"></i> ${subject} Chapters
  `;
  
  document.getElementById('currentSubjectName').textContent = subject;
  document.getElementById('subjectProgressFill').style.background = progressColors[subject];
  
  const chapterList = document.getElementById('chapterList');
  chapterList.innerHTML = '';
  
  let chapters = [];
  if (subject === 'Science') {
    chapters = [
      { category: 'Physics', items: subjects[subject].physics },
      { category: 'Chemistry', items: subjects[subject].chemistry },
      { category: 'Biology', items: subjects[subject].biology }
    ];
  } else if (subject === 'Social Science') {
    chapters = [
      { category: 'History', items: subjects[subject].history },
      { category: 'Geography', items: subjects[subject].geography },
      { category: 'Political Science', items: subjects[subject].politicalScience },
      { category: 'Economics', items: subjects[subject].economics }
    ];
  } else if (subject === 'English') {
    chapters = [
      { category: 'First Flight', items: subjects[subject].books["First Flight"] },
      { category: 'Footprints Without Feet', items: subjects[subject].books["Footprints Without Feet"] }
    ];
  } else {
    chapters = [{ category: subject, items: subjects[subject].chapters }];
  }
  
  chapters.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'chapter-category';
    
    const categoryHeader = document.createElement('h4');
    categoryHeader.textContent = category.category;
    categoryDiv.appendChild(categoryHeader);
    
    const chapterItems = document.createElement('div');
    chapterItems.className = 'chapter-items';
    
    category.items.forEach(chapter => {
      const isCompleted = isChapterCompleted(subject, chapter);
      
      const chapterDiv = document.createElement('div');
      chapterDiv.className = 'chapter-item-detailed';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'chapter-checkbox-detailed';
      checkbox.checked = isCompleted;
      checkbox.addEventListener('change', function() {
        updateCheckboxState(subject, chapter, this.checked);
        updateSubjectProgress(subject);
        updateOverallProgress();
        renderSubjects(); // Refresh subject cards
      });
      
      const chapterTitle = document.createElement('span');
      chapterTitle.className = 'chapter-title-detailed';
      chapterTitle.textContent = chapter;
      
      // Add click event to show resources
      chapterTitle.addEventListener('click', () => {
        showChapterResources(subject, chapter);
      });
      
      chapterDiv.appendChild(checkbox);
      chapterDiv.appendChild(chapterTitle);
      chapterItems.appendChild(chapterDiv);
    });
    
    categoryDiv.appendChild(chapterItems);
    chapterList.appendChild(categoryDiv);
  });
  
  // Update subject progress in main display
  const progress = calculateSubjectProgress(subject);
  document.getElementById('subjectProgressText').textContent = `${progress}%`;
  document.getElementById('subjectProgressFill').style.width = `${progress}%`;
}

// ================ CHAPTER RESOURCES ================
function showChapterResources(subject, chapter) {
  const modal = document.getElementById('resourcesModal');
  const title = document.getElementById('resourcesTitle');
  title.innerHTML = `<i class="fas fa-book"></i> ${chapter} Resources`;
  
  // Clear previous resources
  document.getElementById('videoLectures').innerHTML = '';
  document.getElementById('studyMaterials').innerHTML = '';
  document.getElementById('pyqs').innerHTML = '';
  document.getElementById('recommendedBooks').innerHTML = '';
  
  // Get resources for this chapter (fallback to default if none)
  const resources = chapterResources[subject]?.[chapter] || getDefaultResources(subject, chapter);
  
  // Populate video lectures
  resources.videoLectures.forEach(video => {
    const item = document.createElement('div');
    item.className = 'resource-item';
    item.innerHTML = `
      <i class="fas fa-video resource-icon"></i>
      <a href="${video.url}" target="_blank" class="resource-link">${video.title} (${video.duration})</a>
    `;
    document.getElementById('videoLectures').appendChild(item);
  });
  
  // Populate study materials
  resources.studyMaterials.forEach(material => {
    const item = document.createElement('div');
    item.className = 'resource-item';
    item.innerHTML = `
      <i class="fas fa-file-pdf resource-icon"></i>
      <a href="${material.url}" target="_blank" class="resource-link">${material.title}</a>
    `;
    document.getElementById('studyMaterials').appendChild(item);
  });
  
  // Populate PYQs
  resources.pyqs.forEach(pyq => {
    const item = document.createElement('div');
    item.className = 'resource-item';
    item.innerHTML = `
      <i class="fas fa-question-circle resource-icon"></i>
      <a href="${pyq.url}" target="_blank" class="resource-link">${pyq.title}</a>
    `;
    document.getElementById('pyqs').appendChild(item);
  });
  
  // Populate recommended books
  resources.recommendedBooks.forEach(book => {
    const item = document.createElement('div');
    item.className = 'resource-item';
    item.innerHTML = `
      <i class="fas fa-book resource-icon"></i>
      <a href="${book.url}" target="_blank" class="resource-link">${book.title}</a>
    `;
    document.getElementById('recommendedBooks').appendChild(item);
  });
  
  // Show modal
  modal.style.display = 'block';
  
  // Close modal when clicking on X
  document.querySelector('#resourcesModal .close').onclick = function() {
    modal.style.display = 'none';
  };
  
  // Close modal when clicking outside
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function getDefaultResources(subject, chapter) {
  // Return default resources when specific ones aren't available
  return {
    videoLectures: [
      { title: `${chapter} Full Chapter Explanation`, url: "https://youtube.com/search?q=" + encodeURIComponent(`${subject} ${chapter}`), duration: "20:00" }
    ],
    studyMaterials: [
      { title: "NCERT Textbook PDF", url: "https://ncert.nic.in/textbook.php" },
      { title: "Revision Notes", url: "https://example.com/notes" }
    ],
    pyqs: [
      { title: "Previous Year Questions", url: "https://example.com/pyqs" }
    ],
    recommendedBooks: [
      { title: "Reference Book Solutions", url: "https://example.com/reference" }
    ]
  };
}

// ================ PLANNER FUNCTIONALITY ================
function setupPlanner() {
  const plannerBtn = document.getElementById('plannerBtn');
  const modal = document.getElementById('plannerModal');
  const closeBtn = document.querySelector('#plannerModal .close');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const calendarDays = document.getElementById('calendarDays');
  
  plannerBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    renderCalendar();
  });
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
  });
  
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    
    const taskId = Date.now();
    const task = {
      id: taskId,
      text: taskText,
      completed: false,
      date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD
    };
    
    saveTask(task);
    renderTasks();
    taskInput.value = '';
  }
  
  function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function renderTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const today = new Date().toISOString().split('T')[0];
    
    tasks.filter(task => task.date === today).forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.dataset.id = task.id;
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
      
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      if (task.completed) {
        taskText.classList.add('completed');
      }
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.addEventListener('click', () => deleteTask(task.id));
      
      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
    });
  }
  
  function toggleTaskComplete(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  
  function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
  
  function renderCalendar() {
    calendarDays.innerHTML = '';
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
      const header = document.createElement('div');
      header.className = 'calendar-header';
      header.textContent = day;
      calendarDays.appendChild(header);
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day empty';
      calendarDays.appendChild(emptyCell);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';
      dayCell.textContent = day;
      
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const dayTasks = tasks.filter(task => task.date === dateStr);
      
      if (dayTasks.length > 0) {
        const taskIndicator = document.createElement('div');
        taskIndicator.className = 'task-indicator';
        taskIndicator.textContent = dayTasks.length;
        dayCell.appendChild(taskIndicator);
      }
      
      if (day === now.getDate() && month === now.getMonth()) {
        dayCell.classList.add('today');
      }
      
      dayCell.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(cell => {
          cell.classList.remove('selected');
        });
        dayCell.classList.add('selected');
        document.getElementById('taskDate').textContent = `${day}/${month + 1}/${year}`;
        renderTasks();
      });
      
      calendarDays.appendChild(dayCell);
    }
    
    // Select today by default
    const todayCell = document.querySelector(`.calendar-day:not(.empty):contains("${now.getDate()}")`);
    if (todayCell) {
      todayCell.classList.add('selected');
      document.getElementById('taskDate').textContent = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    }
    
    renderTasks();
  }
}

// ================ ANALYTICS FUNCTIONALITY ================
function showAnalytics() {
  document.getElementById('analyticsDisplay').classList.remove('hidden');
  document.getElementById('subjectDisplay').classList.add('hidden');
  updateAnalyticsData();
}

function updateAnalyticsData() {
  // Update subject progress bars in analytics
  const analyticsContainer = document.getElementById('analyticsSubjects');
  analyticsContainer.innerHTML = '';
  
  Object.keys(subjects).forEach(subject => {
    const progress = calculateSubjectProgress(subject);
    
    const subjectAnalytics = document.createElement('div');
    subjectAnalytics.className = 'analytics-subject';
    
    subjectAnalytics.innerHTML = `
      <div class="analytics-subject-header">
        <span class="analytics-subject-name">${subject}</span>
        <span class="analytics-subject-percent">${progress}%</span>
      </div>
      <div class="analytics-progress-bar">
        <div class="analytics-progress-fill" style="width: ${progress}%; background: ${progressColors[subject]}"></div>
      </div>
    `;
    
    analyticsContainer.appendChild(subjectAnalytics);
  });
  
  // Generate study patterns (sample data)
  const studyPatterns = [
    { day: 'Monday', hours: 2.5 },
    { day: 'Tuesday', hours: 3 },
    { day: 'Wednesday', hours: 2 },
    { day: 'Thursday', hours: 4 },
    { day: 'Friday', hours: 1.5 },
    { day: 'Saturday', hours: 5 },
    { day: 'Sunday', hours: 1 }
  ];
  
  const patternsContainer = document.getElementById('studyPatterns');
  patternsContainer.innerHTML = '';
  
  studyPatterns.forEach(pattern => {
    const patternItem = document.createElement('div');
    patternItem.className = 'study-pattern';
    
    patternItem.innerHTML = `
      <div class="pattern-day">${pattern.day}</div>
      <div class="pattern-bar-container">
        <div class="pattern-bar" style="width: ${(pattern.hours / 5) * 100}%"></div>
      </div>
      <div class="pattern-hours">${pattern.hours} hrs</div>
    `;
    
    patternsContainer.appendChild(patternItem);
  });
  
  // Create performance chart
  createPerformanceChart();
  
  // Create completion chart
  createCompletionChart();
}

function createPerformanceChart() {
  const ctx = document.getElementById('performanceChart').getContext('2d');
  const subjectNames = Object.keys(subjects);
  const subjectProgress = subjectNames.map(subject => calculateSubjectProgress(subject));
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: subjectNames,
      datasets: [{
        label: 'Progress %',
        data: subjectProgress,
        backgroundColor: subjectNames.map(subject => progressColors[subject]),
        borderColor: subjectNames.map(subject => progressColors[subject]),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

function createCompletionChart() {
  const ctx = document.getElementById('completionChart').getContext('2d');
  const counts = getChapterCounts();
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Remaining'],
      datasets: [{
        data: [counts.completed, counts.total - counts.completed],
        backgroundColor: ['#4caf50', '#e0e0e0'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// ================ DOUBT SOLVER ================
function solveDoubt() {
  const doubtText = document.getElementById('doubtInput').value.trim();
  if (!doubtText) return;
  
  const doubtDisplay = document.getElementById('doubtDisplay');
  doubtDisplay.innerHTML = `
    <h3>Your Doubt:</h3>
    <p>${doubtText}</p>
    <div class="doubt-resources">
      <h4>Suggested Resources:</h4>
      <ul>
        <li><a href="https://ncert.nic.in/textbook.php" target="_blank">NCERT Official Website</a></li>
        <li><a href="https://khanacademy.org" target="_blank">Khan Academy</a></li>
        <li><a href="https://www.toppr.com/guides/" target="_blank">Toppr Guides</a></li>
        <li><a href="https://www.learncbse.in/" target="_blank">Learn CBSE</a></li>
      </ul>
    </div>
  `;
  doubtDisplay.classList.remove('hidden');
  
  // Clear input
  document.getElementById('doubtInput').value = '';
}

// ================ EVENT LISTENERS ================
function setupEventListeners() {
  // Motivation and Topper Interviews
  document.getElementById('motivationBtn').addEventListener('click', () => {
    window.open('https://youtube.com/playlist?list=PLTW7KORe8vkX3fr2JDnQTMou-MT9-9LIV', '_blank');
  });
  
  document.getElementById('topperBtn').addEventListener('click', () => {
    window.open('https://youtu.be/l2GT0apSoDE', '_blank');
  });
  
  // Analytics
  document.getElementById('analyticsBtn').addEventListener('click', showAnalytics);
  
  // Doubt Solver
  document.getElementById('solveDoubtBtn').addEventListener('click', solveDoubt);
  
  // Setup planner
  setupPlanner();
  
  // Close modals when clicking on X
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
}