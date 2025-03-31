function toggleKeyMask() {
    const keyField = document.getElementById('apiKey');
    const maskCheckbox = document.getElementById('maskKey');
    keyField.type = maskCheckbox.checked ? 'password' : 'text';
}

function toggleKeyMask2() {
    const keyField = document.getElementById('apiKey2');
    const maskCheckbox = document.getElementById('maskKey2');
    keyField.type = maskCheckbox.checked ? 'password' : 'text';
}

let apiKey = null;
let apiKey2 = null; //New line

document.getElementById('confirmButton').addEventListener('click', function() {
    const userName = document.getElementById('userName').value;
    const key = document.getElementById('apiKey').value;
    const key2 = document.getElementById('apiKey2').value;                     //New line

    if (userName && key) {
        apiKey = key;
        apiKey2 = key2;                                                       //New line   
        //alert(`Welcome, ${userName}! An API Key has been provided.`);       //Quieten the console log
        document.getElementById('initialInterface').classList.add('hidden');
        document.getElementById('mainApplication').classList.remove('hidden');
    } else {
        alert("Please enter both your name and OPENAI API key.");
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('apiKey').value = '';
    document.getElementById('apiKey2').value = '';
    apiKey = null;
    apiKey2 = null;
    alert("API Key(s) cleared.");
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('uploadedImage');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('clearImageButton').classList.remove('hidden');
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.style.height = 'auto';
            imageContainer.style.height = `${img.clientHeight}px`;
            const uploadPictureWindow = document.getElementById('uploadPictureWindow');
            uploadPictureWindow.style.minHeight = `${img.clientHeight + 100}px`;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('clearImageButton').addEventListener('click', function() {
    const img = document.getElementById('uploadedImage');
    img.src = '';
    img.style.display = 'none';
    document.getElementById('clearImageButton').classList.add('hidden');
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.style.height = 'auto';
    const uploadPictureWindow = document.getElementById('uploadPictureWindow');
    uploadPictureWindow.style.minHeight = 'auto';
});

document.getElementById('readButton').addEventListener('click', async function() {
    const imageFile = document.getElementById('imageInput').files[0];
    const equationField = document.getElementById('extractedEquation');
    const statusMessage = document.getElementById('extractionStatus');
    
    if (!imageFile) {
        alert('Please select an image file first.');
        return;
    }

    try {
        equationField.disabled = true;
        statusMessage.textContent = "Extracting equation from image...";
        
        const extractedText = await extractEquationFromImage(imageFile);
        
        if (extractedText) {
            equationField.value = extractedText;
            statusMessage.textContent = "Equation extracted successfully! You can edit the text if needed.";
            setTimeout(() => statusMessage.textContent = "", 3000);
        } else {
            equationField.value = '';
            statusMessage.textContent = "No equation found in image. Please try another image.";
        }
        
        equationField.style.height = 'auto';
        equationField.style.height = `${equationField.scrollHeight}px`;
        
    } catch (error) {
        console.error('Extraction error:', error);
        equationField.value = '';
        statusMessage.textContent = "Error extracting equation. Please try again.";
    } finally {
        equationField.disabled = false;
    }
});

document.getElementById('clearEquationButton').addEventListener('click', function() {
    document.getElementById('extractedEquation').value = '';
    const extractedEquation = document.getElementById('extractedEquation');
    extractedEquation.style.height = 'auto';
    document.getElementById('extractionStatus').textContent = '';
});

// Clicking Exit button clears all fields and resets the interface 

document.getElementById('exitButton').addEventListener('click', function() {
    document.getElementById('maskKey').checked = false;
    document.getElementById('apiKey').type = 'text';
    
    document.getElementById('maskKey2').checked = false;
    document.getElementById('apiKey2').type = 'text';
    
    document.getElementById('userName').value = '';
    document.getElementById('apiKey').value = '';
    document.getElementById('apiKey2').value = '';
    apiKey = null;
    apiKey2 = null; //New line
    document.getElementById('imageInput').value = '';
    document.getElementById('uploadedImage').src = '';
    document.getElementById('uploadedImage').style.display = 'none';
    document.getElementById('clearImageButton').classList.add('hidden');
    document.getElementById('extractedEquation').value = '';
    document.getElementById('solutionOutput').innerHTML = '';
    document.getElementById('initialInterface').classList.remove('hidden');
    document.getElementById('mainApplication').classList.add('hidden');
    document.querySelectorAll('.dynamic-height').forEach(element => {
        element.style.height = 'auto';
    });
});

document.getElementById('connectButton').addEventListener('click', function() {
    alert("AR connection not implemented.");
});

document.getElementById('showButton').addEventListener('click', function() {
    alert("AR display not implemented.");
});

window.MathJax = {
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        processEscapes: true,
        packages: {'[+]': ['ams']}
        },
    options: {
        ignoreHtmlClass: 'nostem|nolatex',
        processHtmlClass: 'math-display'
            },
};