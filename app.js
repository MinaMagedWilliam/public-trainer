// Function to load study materials (embedded to avoid CORS issues)
async function loadStudyMaterials() {
  console.log('Loading embedded study materials...');
  
  // This is where you would normally fetch from xray_data.json
  // But since we're having CORS issues with local files, we'll embed the data here
  const embeddedData = [
    {
      title: "Pit and Fissure Sealant",
      content: "prevention of caries in deep pits and fissures of teeth.",
      image: "images/puplic photos_Page1.png"
    },
    {
      title: "fluoride varnish",
      content: "1- ion exhange 2- decrease surface energy 3- add remineralization 4- bacterial inhibition 5- smoother surface",
      image: "images/puplic photos_Page2.png"
    },
    {
        title: "fluoride gel in styrofoam disposable tray",
        content: "",
        image: "images/puplic photos_Page3.png"
      },
      {
        title: "fluoride foam in styrofoam disposable tray",
        content: "",
        image: "images/puplic photos_Page4.png"
      },
      {
        title: "ionic toothbrush",
        content: "",
        image: "images/puplic photos_Page5.png"
      },
      {
        title: "elecric toothbrush",
        content: "rotation, up and down, elliptical",
        image: "images/puplic photos_Page6.png"
      },
      {
        title: "fones brushing technique",
        content: "rotatory movment",
        image: "images/puplic photos_Page7.png"
      },
      {
        title: "charter brushing technique",
        content: "vibratory movment",
        image: "images/puplic photos_Page8.png"
      },
  ];
  
  console.log('Successfully loaded embedded data:', embeddedData);
  return embeddedData;
}

// Current item index
let currentIndex = 0;
let studyMaterials = []; // Will be populated from JSON

// Function to display current study item
function displayStudyItem(index) {
  const studyContainer = document.getElementById('study-container');
  const item = studyMaterials[index];
  
  // Create HTML for the study item
  const html = `
    <div class="study-item">
      <h2>${item.title}</h2>
      <div class="study-content">
        <p>${item.content}</p>
        ${item.image ? `<img src="${item.image}" alt="${item.title}" />` : ''}
      </div>
    </div>
  `;
  
  studyContainer.innerHTML = html;
}

// Function to update navigation button states
function updateNavigationButtons() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === studyMaterials.length - 1;
}

// Event listeners for navigation buttons
document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayStudyItem(currentIndex);
    updateNavigationButtons();
  }
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentIndex < studyMaterials.length - 1) {
    currentIndex++;
    displayStudyItem(currentIndex);
    updateNavigationButtons();
  }
});

// Initialize the study container with the first item when page loads
window.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM fully loaded, initializing study mode...');
  // Show loading state
  document.getElementById('study-container').innerHTML = '<div class="loading">Loading study materials...</div>';
  
  try {
    // Fetch study materials
    studyMaterials = await loadStudyMaterials();
    
    console.log(`Loaded ${studyMaterials.length} study materials`);
    
    if (studyMaterials.length > 0) {
      displayStudyItem(currentIndex);
      // Enable or disable navigation buttons based on available items
      updateNavigationButtons();
    } else {
      document.getElementById('study-container').innerHTML = '<p>No study materials available. Please check xray_data.json file.</p>';
    }
  } catch (error) {
    console.error('Failed to initialize study mode:', error);
    document.getElementById('study-container').innerHTML = 
      `<p>Error loading study materials. See console for details.</p>
       <p>Error: ${error.message}</p>`;
  }
});

// For Test Mode
if (window.location.pathname.includes('test.html')) {
  loadXrayData().then(data => {
    const container = document.getElementById('test-container');
    const randomItem = data[Math.floor(Math.random() * data.length)];
    
    container.innerHTML = `
      <img src="images/${randomItem.image}" alt="X-ray">
      <input type="text" id="diagnosisInput" placeholder="Enter your diagnosis">
      <button onclick="checkAnswer('${randomItem.diagnosis}')">Submit</button>
      <p id="result"></p>
    `;
  });
}

function checkAnswer(correctDiagnosis) {
  const userInput = document.getElementById('diagnosisInput').value.trim().toLowerCase();
  const correct = correctDiagnosis.trim().toLowerCase();
  const result = document.getElementById('result');
  
  if (userInput === correct) {
    result.textContent = '✅ Correct!';
    result.style.color = 'green';
  } else {
    result.textContent = `❌ Wrong. Correct: ${correctDiagnosis}`;
    result.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const testContainer = document.getElementById('test-container');
  
  if (testContainer) {
    // Display loading message
    testContainer.innerHTML = '<p>Loading data...</p>';
    
    // Fetch data from JSONPlaceholder API (example public API)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Display the fetched data
        let html = '<h2>Fetched Data</h2>';
        html += '<ul class="user-list">';
        
        data.forEach(user => {
          html += `
            <li class="user-item">
              <h3>${user.name}</h3>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Phone:</strong> ${user.phone}</p>
              <p><strong>Website:</strong> ${user.website}</p>
            </li>
          `;
        });
        
        html += '</ul>';
        html += '<button id="refresh-btn">Refresh Data</button>';
        
        testContainer.innerHTML = html;
        
        // Add refresh functionality
        document.getElementById('refresh-btn').addEventListener('click', function() {
          location.reload();
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        testContainer.innerHTML = `
          <div class="error-message">
            <h2>Error Loading Data</h2>
            <p>${error.message}</p>
            <button id="retry-btn">Retry</button>
          </div>
        `;
        
        document.getElementById('retry-btn').addEventListener('click', function() {
          location.reload();
        });
      });
  }
});

// Function to initialize test mode
function initializeTestMode() {
  const testContainer = document.getElementById('test-container');
  
  if (testContainer) {
    console.log('Initializing test mode...');
    testContainer.innerHTML = '<p>Loading test materials...</p>';
    
    loadStudyMaterials()
      .then(data => {
        testContainer.innerHTML = '';
        startQuiz(data, testContainer);
      })
      .catch(error => {
        console.error('Error loading test materials:', error);
        testContainer.innerHTML = `
          <div class="error-message">
            <h2>Error Loading Test Materials</h2>
            <p>${error.message}</p>
            <button id="retry-btn">Retry</button>
          </div>
        `;
        
        document.getElementById('retry-btn').addEventListener('click', function() {
          initializeTestMode();
        });
      });
  }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy to avoid modifying the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

// Function to start the quiz
function startQuiz(data, container) {
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Shuffle the data to randomize question order
  const shuffledData = shuffleArray(data);
  const totalQuestions = shuffledData.length;
  
  function showQuestion(index) {
    const item = shuffledData[index];
    
    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-progress">Question ${index + 1} of ${totalQuestions} | Score: ${score}</div>
        <div class="quiz-image">
          <img src="${item.image}" alt="X-ray image" onerror="this.src='images/placeholder.png'">
        </div>
        <div class="quiz-form">
          <label for="answer-input">What is the title/diagnosis of this image?</label>
          <input type="text" id="answer-input" placeholder="Type your answer here" autocomplete="off">
          <button id="submit-answer">Submit Answer</button>
        </div>
        <div id="feedback" class="quiz-feedback"></div>
      </div>
    `;
    
    // Focus on the input field
    setTimeout(() => {
      const input = document.getElementById('answer-input');
      if (input) input.focus();
    }, 100);
    
    // Handle form submission
    document.getElementById('submit-answer').addEventListener('click', checkUserAnswer);
    document.getElementById('answer-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') checkUserAnswer();
    });
    
    function checkUserAnswer() {
      const userAnswer = document.getElementById('answer-input').value.trim();
      const correctAnswer = item.title.trim();
      const feedback = document.getElementById('feedback');
      
      // Make answer checking more lenient - user doesn't need to write the full title
      // Consider correct if:
      // 1. Key words from user's answer match parts of the correct title
      // 2. OR if similarity is still above threshold
      const userWords = userAnswer.toLowerCase().split(/\s+/);
      const correctWords = correctAnswer.toLowerCase().split(/\s+/);
      
      // Check if user has typed significant keywords from the title
      let keywordsMatched = 0;
      for (const userWord of userWords) {
        if (userWord.length < 3) continue; // Skip very short words
        
        for (const correctWord of correctWords) {
          if (correctWord.length < 3) continue; // Skip very short words
          
          // Check if words are similar enough (handles spelling mistakes)
          if (calculateSimilarity(userWord, correctWord) > 0.7) {
            keywordsMatched++;
            break;
          }
        }
      }
      
      // If user matched enough keywords or overall similarity is good enough
      const keywordThreshold = Math.min(2, Math.floor(correctWords.length / 2));
      const overallSimilarity = calculateSimilarity(userAnswer.toLowerCase(), correctAnswer.toLowerCase());
      const isCorrect = (keywordsMatched >= keywordThreshold) || (overallSimilarity >= 0.6);
      
      if (isCorrect) {
        score++;
        feedback.innerHTML = `
          <div class="correct">
            <h3>✅ Correct!</h3>
            <p>The full answer is: ${correctAnswer}</p>
          </div>
        `;
      } else {
        feedback.innerHTML = `
          <div class="incorrect">
            <h3>❌ Incorrect</h3>
            <p>The correct answer is: ${correctAnswer}</p>
            <p>Your answer was: ${userAnswer}</p>
          </div>
        `;
      }
      
      // Add next button
      feedback.innerHTML += `
        <button id="next-question" class="next-btn">
          ${currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
        </button>
      `;
      
      document.getElementById('next-question').addEventListener('click', function() {
        if (currentQuestionIndex < totalQuestions - 1) {
          currentQuestionIndex++;
          showQuestion(currentQuestionIndex);
        } else {
          showResults();
        }
      });
      
      // Disable input and submit button
      document.getElementById('answer-input').disabled = true;
      document.getElementById('submit-answer').disabled = true;
    }
  }
  
  function showResults() {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    container.innerHTML = `
      <div class="quiz-results">
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${totalQuestions} (${percentage}%)</p>
        <div class="results-feedback">
          ${percentage >= 80 ? 
            '<p>Excellent! You have great knowledge of these X-rays.</p>' : 
            percentage >= 60 ? 
            '<p>Good job! Keep studying to improve.</p>' : 
            '<p>You might need more practice with these X-rays.</p>'}
        </div>
        <button id="restart-quiz">Restart Quiz</button>
      </div>
    `;
    
    document.getElementById('restart-quiz').addEventListener('click', function() {
      currentQuestionIndex = 0;
      score = 0;
      showQuestion(currentQuestionIndex);
    });
  }
  
  // Start with the first question
  showQuestion(currentQuestionIndex);
}

// Function to calculate text similarity (Levenshtein distance based)
function calculateSimilarity(str1, str2) {
  // If either string is empty, return 0
  if (!str1.length || !str2.length) return 0;
  
  // If the strings are identical, return 1
  if (str1 === str2) return 1;
  
  // Create a matrix of distances
  const matrix = Array(str1.length + 1).fill().map(() => Array(str2.length + 1).fill(0));
  
  // Initialize first row and column
  for (let i = 0; i <= str1.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= str2.length; j++) matrix[0][j] = j;
  
  // Fill the matrix
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  // Calculate the maximum possible distance
  const maxDistance = Math.max(str1.length, str2.length);
  // Calculate normalized similarity (1 - normalized distance)
  return 1 - (matrix[str1.length][str2.length] / maxDistance);
}

// Initialize test mode if we're on the test page
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('test-container')) {
    initializeTestMode();
  }
});
