document.addEventListener('DOMContentLoaded', function() {
    // Add Generate JSON button to the button group
    const buttonGroup = document.querySelector('.button-group');
    const generateJSONBtn = document.createElement('button');
    generateJSONBtn.type = 'button';
    generateJSONBtn.id = 'generate-json-btn';
    generateJSONBtn.textContent = 'Generate JSON';
    generateJSONBtn.style.backgroundColor = '#9C27B0';
    generateJSONBtn.style.color = 'white';
    buttonGroup.appendChild(generateJSONBtn);

    // Add event listener for Generate JSON button
    generateJSONBtn.addEventListener('click', function() {
        generateJSONOutput();
    });
});

function generateJSONOutput() {
    const form = document.getElementById('introduction-form');
    const formSection = document.getElementById('form-section');
    const resultSection = document.getElementById('result-section');
    
    // Change H2 from Introduction Form to Introduction JSON
    const h2Element = document.querySelector('.secondTitle');
    if (h2Element) {
        h2Element.textContent = 'Introduction JSON';
    }
    
    // Get form data
    const formData = new FormData(form);
    
    // Get course data
    const courseDepts = formData.getAll('courseDept[]');
    const courseNums = formData.getAll('courseNum[]');
    const courseNames = formData.getAll('courseName[]');
    const courseReasons = formData.getAll('courseReason[]');
    
    // Build courses array
    const courses = [];
    for (let i = 0; i < courseDepts.length; i++) {
        courses.push({
            "department": courseDepts[i],
            "number": courseNums[i],
            "name": courseNames[i],
            "reason": courseReasons[i]
        });
    }
    
    // Build links array
    const links = [
        {
            "name": "LinkedIn",
            "href": formData.get('link1') || "#"
        },
        {
            "name": "GitHub",
            "href": formData.get('link2') || "#"
        },
        {
            "name": "freeCodeCamp",
            "href": formData.get('link3') || "#"
        },
        {
            "name": "Codecademy",
            "href": formData.get('link4') || "#"
        },
        {
            "name": "GitHub Page",
            "href": formData.get('link5') || "#"
        }
    ];
    
    // Create JSON object with exact keys from the example
    const jsonData = {
        "firstName": formData.get('firstName') || "",
        "preferredName": formData.get('nickname') || "",
        "middleInitial": (formData.get('middleName') || "").charAt(0) || "",
        "lastName": formData.get('lastName') || "",
        "divider": formData.get('divider') || "~",
        "mascotAdjective": formData.get('mascotAdjective') || "",
        "mascotAnimal": formData.get('mascotAnimal') || "",
        "image": "../images/me.png", // Default image path
        "imageCaption": formData.get('pictureCaption') || "",
        "personalStatement": formData.get('personalStatement') || "",
        "personalBackground": formData.get('personalBackground') || "",
        "professionalBackground": formData.get('professionalBackground') || "",
        "academicBackground": formData.get('academicBackground') || "",
        "subjectBackground": formData.get('subjectBackground') || "",
        "primaryComputer": formData.get('computerPlatform') || "",
        "courses": courses,
        "links": links
    };
    
    // Convert to formatted JSON string
    const jsonString = JSON.stringify(jsonData, null, 2);
    
    // Create result HTML with syntax highlighting
    const resultHTML = `
        <div class="json-output">
            <h3 class="json-output-header">Introduction Data in JSON Format</h3>
            <p>You can highlight and copy the JSON below:</p>
            <pre><code class="language-json" id="json-code">${jsonString}</code></pre>
        </div>
        <span class="reset-link" id="reset-link">Reset Form</span>
    `;
    
    // Hide form and show result
    formSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    resultSection.innerHTML = resultHTML;
    
    // Apply syntax highlighting
    if (window.hljs) {
        hljs.highlightElement(document.getElementById('json-code'));
    }
    
    // Add reset functionality
    document.getElementById('reset-link').addEventListener('click', function() {
        resultSection.classList.add('hidden');
        formSection.classList.remove('hidden');
        resultSection.innerHTML = '<span class="reset-link" id="reset-link">Reset Form</span>';
        
        // Reset H2 back to Introduction Form
        const h2Element = document.querySelector('.secondTitle');
        if (h2Element) {
            h2Element.textContent = 'Introduction Form';
        }
        
        document.getElementById('reset-link').addEventListener('click', arguments.callee);
    });
}