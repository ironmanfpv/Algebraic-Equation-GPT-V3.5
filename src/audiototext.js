let mediaRecorder;
let audioChunks = [];
let recording = false;
let audioContext;
let sourceNode;

// Universal audio format converter
async function convertAudioToWav(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000
    });
    
    const audioData = await audioContext.decodeAudioData(arrayBuffer);
    const wavBuffer = encodeWAV(audioData.getChannelData(0), 
                      audioData.sampleRate,
                      audioData.numberOfChannels);
    
    return new Blob([wavBuffer], { type: 'audio/wav' });
}

function encodeWAV(input, sampleRate, numChannels) {
    const buffer = new ArrayBuffer(44 + input.length * 2);
    const view = new DataView(buffer);

    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + input.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2 * numChannels, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, input.length * 2, true);

    const floatTo16BitPCM = (output, offset, input) => {
        for (let i = 0; i < input.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    };

    floatTo16BitPCM(new DataView(buffer, 44), 0, input);
    return buffer;
}

document.getElementById('sayEquationButton').addEventListener('click', async function(e) {
    try {
        if (recording) {
            mediaRecorder.stop();
            recording = false;
            this.classList.remove('recording');
            return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                sampleRate: 16000,
                channelCount: 1,
                noiseSuppression: false,
                echoCancellation: false,
                autoGainControl: false
            }
        });

        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus',
            audioBitsPerSecond: 16000
        });

        recording = true;
        audioChunks = [];
        
        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
        
        mediaRecorder.onstop = async () => {
            try {
                const originalBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const wavBlob = await convertAudioToWav(originalBlob);
                await transcribeAudio(wavBlob);
            } catch (error) {
                console.error('Processing error:', error);
                showTranscriptionStatus(`Error: ${error.message}`, true);
            } finally {
                stream.getTracks().forEach(track => track.stop());
            }
        };

        mediaRecorder.start();
        this.classList.add('recording');
    } catch (err) {
        handleRecordingError(err);
    }
});

async function transcribeAudio(audioBlob) {
    const equationField = document.getElementById('extractedEquation');
    const statusMessage = document.getElementById('extractionStatus');
    
    if (!apiKey) {
        showTranscriptionStatus('No API Key provided', true);
        return;
    }

    try {
        equationField.disabled = true;
        showTranscriptionStatus("Processing audio...", false);

        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.wav');
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'json');

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiKey}` },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        showTranscriptionResult(data.text);
    } catch (error) {
        console.error('Transcription error:', error);
        showTranscriptionStatus(`Error: ${error.message}`, true);
    } finally {
        equationField.disabled = false;
    }
}

function showTranscriptionResult(text) {
    const equationField = document.getElementById('extractedEquation');
    const statusMessage = document.getElementById('extractionStatus');
    
    equationField.value = text || '';
    equationField.style.height = `${equationField.scrollHeight}px`;
    
    statusMessage.textContent = text 
        ? "Transcription successful!" 
        : "No speech detected";
    
    setTimeout(() => statusMessage.textContent = "", 3000);
}

function showTranscriptionStatus(message, isError) {
    const statusMessage = document.getElementById('extractionStatus');
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? '#cc0000' : '#666';
}

function handleRecordingError(error) {
    console.error('Recording error:', error);
    showTranscriptionStatus(`Recording failed: ${error.message}`, true);
    document.getElementById('sayEquationButton').classList.remove('recording');
    recording = false;
}