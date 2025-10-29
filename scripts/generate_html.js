document.addEventListener('DOMContentLoaded', function() {
    const buttonGroup = document.querySelector('.button-group');
    const generateHTMLBtn = document.createElement('button');
    generateHTMLBtn.type = 'button';
    generateHTMLBtn.id = 'generate-html-btn';
    generateHTMLBtn.textContent = 'Generate HTML';
    generateHTMLBtn.style.backgroundColor = '#FF5722';
    generateHTMLBtn.style.color = 'white';
    
    const jsonBtn = document.getElementById('generate-json-btn');
    if (jsonBtn) {
        buttonGroup.insertBefore(generateHTMLBtn, jsonBtn.nextSibling);
    } else {
        buttonGroup.appendChild(generateHTMLBtn);
    }

    generateHTMLBtn.addEventListener('click', function() {
        generateHTMLOutput();
    });
});

function generateHTMLOutput() {
    const form = document.getElementById('introduction-form');
    const formSection = document.getElementById('form-section');
    const resultSection = document.getElementById('result-section');
    
    const h2Element = document.querySelector('.secondTitle');
    if (h2Element) {
        h2Element.textContent = 'Introduction HTML';
    }
    
    const formData = new FormData(form);
    
    const courseDepts = formData.getAll('courseDept[]');
    const courseNums = formData.getAll('courseNum[]');
    const courseNames = formData.getAll('courseName[]');
    const courseReasons = formData.getAll('courseReason[]');
    
    const firstName = formData.get('firstName') || '';
    const middleName = formData.get('middleName') || '';
    const nickname = formData.get('nickname') || '';
    const lastName = formData.get('lastName') || '';
    const divider = formData.get('divider') || '|';
    const mascotAdjective = formData.get('mascotAdjective') || '';
    const mascotAnimal = formData.get('mascotAnimal') || '';
    
    let fullNameDisplay = firstName;
    if (middleName) fullNameDisplay += ` ${middleName.charAt(0)}.`;
    if (nickname) fullNameDisplay += ` "${nickname}"`;
    fullNameDisplay += ` ${lastName}`;
    
    let htmlContent = `<h2>Introduction HTML</h2>\n`;
    htmlContent += `<h3>${fullNameDisplay} ${divider} ${mascotAdjective} ${mascotAnimal}</h3>\n`;
    htmlContent += `<figure>\n`;
    htmlContent += `    <img\n`;
    htmlContent += `        src="../images/me.png"\n`;
    htmlContent += `        alt="Picture of ${firstName} ${lastName}"\n`;
    htmlContent += `    />\n`;
    htmlContent += `    <figcaption>${formData.get('pictureCaption') || ''}</figcaption>\n`;
    htmlContent += `</figure>\n`;
    htmlContent += `<ul>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Personal Background:</strong> ${formData.get('personalBackground') || ''}\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Professional Background:</strong> ${formData.get('professionalBackground') || ''}\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Academic Background:</strong> ${formData.get('academicBackground') || ''}\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Background in the Subject:</strong> ${formData.get('subjectBackground') || ''}\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Primary Computer Platform:</strong> ${formData.get('computerPlatform') || ''}\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Courses:</strong>\n`;
    htmlContent += `        <ul>\n`;
    
    for (let i = 0; i < courseDepts.length; i++) {
        htmlContent += `            <li>\n`;
        htmlContent += `                <strong>${courseDepts[i]} ${courseNums[i]} - ${courseNames[i]}:</strong> ${courseReasons[i]}\n`;
        htmlContent += `            </li>\n`;
    }
    
    htmlContent += `        </ul>\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Funny Thing:</strong> ${formData.get('funnyThing') || 'Not specified'}\n`;
    htmlContent += `    </li>\n`;
    
    const quote = formData.get('quote') || '';
    const quoteAuthor = formData.get('quoteAuthor') || '';
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Favorite Quote:</strong> "${quote}"${quoteAuthor ? ` - ${quoteAuthor}` : ''}\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `    <li>\n`;
    htmlContent += `        <strong>Something to Share:</strong> ${formData.get('shareThing') || 'Not specified'}\n`;
    htmlContent += `    </li>\n`;
    
    htmlContent += `</ul>\n`;
    
    htmlContent += `<h4>Links:</h4>\n`;
    htmlContent += `<ul>\n`;
    htmlContent += `    <li><a href="${formData.get('link1') || '#'}">LinkedIn</a></li>\n`;
    htmlContent += `    <li><a href="${formData.get('link2') || '#'}">GitHub</a></li>\n`;
    htmlContent += `    <li><a href="${formData.get('link3') || '#'}">freeCodeCamp</a></li>\n`;
    htmlContent += `    <li><a href="${formData.get('link4') || '#'}">Codecademy</a></li>\n`;
    htmlContent += `    <li><a href="${formData.get('link5') || '#'}">GitHub Page</a></li>\n`;
    htmlContent += `</ul>\n`;
    
    const escapedHTML = htmlContent
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    
    const resultHTML = `
        <div class="html-output">
            <h3>Introduction Data in HTML Format</h3>
            <p>You can highlight and copy the HTML below:</p>
            <pre><code class="language-html" id="html-code">${escapedHTML}</code></pre>
        </div>
        <span class="reset-link" id="reset-link">Reset Form</span>
    `;
    
    formSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    resultSection.innerHTML = resultHTML;
    
    if (window.hljs) {
        hljs.highlightElement(document.getElementById('html-code'));
    }
    
    document.getElementById('reset-link').addEventListener('click', function() {
        resultSection.classList.add('hidden');
        formSection.classList.remove('hidden');
        resultSection.innerHTML = '<span class="reset-link" id="reset-link">Reset Form</span>';
        
        const h2Element = document.querySelector('.secondTitle');
        if (h2Element) {
            h2Element.textContent = 'Introduction Form';
        }
        
        document.getElementById('reset-link').addEventListener('click', arguments.callee);
    });
}