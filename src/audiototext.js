let mediaRecorder;
let audioChunks = [];
let recording = false;

document.getElementById('sayEquationButton').addEventListener('click', async function(e) {
    e.preventDefault();
    if (recording) {
        // Stop recording
        mediaRecorder.stop();
        recording = false;
        this.classList.remove('recording');
    } else {
        // Start recording
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            recording = true;
            
            mediaRecorder.ondataavailable = function(event) {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async function() {
                const mimeType = mediaRecorder.mimeType;
                const audioBlob = new Blob(audioChunks, { type: mimeType });
                await transcribeAudio(audioBlob);
                audioChunks = [];
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            this.classList.add('recording');
        } catch (err) {
            alert('Error accessing microphone: ' + err.message);
            recording = false;
            this.classList.remove('recording');
        }
    }
});

async function transcribeAudio(audioBlob) {
    const equationField = document.getElementById('extractedEquation');
    const statusMessage = document.getElementById('extractionStatus');
    
    if (!apiKey) {
        alert('No API Key provided');
        return;
    }

    const formData = new FormData();
    
    // Generate appropriate file extension from MIME type
    const mimeType = audioBlob.type;
    const extension = mimeType.split('/')[1].split(';')[0];
    formData.append('file', audioBlob, `recording.${extension}`);
    formData.append('model', 'whisper-1');

    try {
        equationField.disabled = true;
        statusMessage.textContent = "Transcribing audio...";
        
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        if (data.text) {
            equationField.value = data.text;
            statusMessage.textContent = "Transcription successful!";
            setTimeout(() => statusMessage.textContent = "", 3000);
        } else {
            equationField.value = '';
            statusMessage.textContent = "No speech detected in audio.";
        }
        
        equationField.style.height = 'auto';
        equationField.style.height = `${equationField.scrollHeight}px`;
        
    } catch (error) {
        console.error('Transcription error:', error);
        equationField.value = '';
        statusMessage.textContent = `Transcription failed: ${error.message}`;
    } finally {
        equationField.disabled = false;
    }
}