async function extractEquationFromImage(image) {
    
    try {
        console.log('Starting image extraction process...');

        // Step 1: Convert the image to a base64 string
        const reader = new FileReader();
        const imageBase64 = await new Promise((resolve, reject) => {
            reader.onload = () => {
                console.log('Image successfully converted to base64.');
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = (error) => {
                console.error('Error converting image to base64:', error);
                reject(error);
            };
            reader.readAsDataURL(image);
        });

        console.log('Base64 image data:', imageBase64);

        // Step 2: Prepare the request payload for Google Cloud Vision API
        const requestPayload = {
            requests: [
                {
                    image: {
                        content: imageBase64,
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION',
                        },
                    ],
                },
            ],
        };

        console.log('Request payload:', JSON.stringify(requestPayload, null, 2));

        // Step 3: Send the image to Google Cloud Vision API
        
        //const apiKey = 'Your Cloud Vision API key'; // Replace with your own API key within ''if hard coding for local hosted version  
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey2}`;

        console.log('Sending request to Google Cloud Vision API...');

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload),
        });

        console.log('API response status:', response.status);

        // Step 4: Check if the request was successful
        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('API request failed:', errorResponse);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Step 5: Parse the JSON response
        const data = await response.json();

        console.log('API response data:', JSON.stringify(data, null, 2));

        // Step 6: Extract the text from the response
        const extractedText = data.responses[0]?.fullTextAnnotation?.text;

        console.log('Extracted text:', extractedText);

        // Step 7: Return the extracted text (equation)
        return extractedText || null;
    } catch (error) {
        console.error('Error extracting equation from image:', error);
        return null; // Return null or handle the error as needed
    }
}