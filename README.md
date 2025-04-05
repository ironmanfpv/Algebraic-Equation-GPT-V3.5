# Algebraic Equation GPT V3.5

This repo experiments with Image text recognition API,Speech to Text API and LLMs.
A photo or an image containing Mathematics equation(s) is fed to the app.
The web application implements Cloud Vision API to extract text from the source.
Equation(s) to be solved can also be keyed in or written out, to edit the extracted text.
The extracted equation is fed to an LLM which then analyses and solves it.
A solution, together with its comprehensive explanation is output to the user.
This is the UPGRADED BETA version of previous version of Algebraic Equation GPT.

In version 1, users could input equation via camera, photo file, text input via keyboard or (iOS) stylus.<br> 
In this version, Speech to Text capabilities is added as the 5th option of query input.<br> 
Algebra Equation GPT V3.5 understand equations said in natural English language.<br>
Say the equation as you would read it out and Algebraic Equation GPT V3.5 will transcribe. 

<img src= "https://github.com/ironmanfpv/Algebraic-Equation-GPT-V3.5/blob/main/img/img%200.jpg">
<img src= "https://github.com/ironmanfpv/Algebraic-Equation-GPT-V3.5/blob/main/img/img%201.jpg">
<img src= "https://github.com/ironmanfpv/Algebraic-Equation-GPT-V3.5/blob/main/img/img%202.jpg">

# SETUP STEPS: #

Algebraic Equation GPT V3.5 was developed modularly and independently from ground up.<br>
Text, Image to Text and Speech to text scripts were incrementally integrated with the GPT.

- To run a WEB HOSTED version of Algebraic Equation GPT.

  Access https://ironmanfpv.github.io/Algebraic-Equation-GPT-V3.5/ in browser.
  Have your OPEN AI API key and your Cloud Vision API key (optional) ready. Section B,C and F applies. The rest of the sections may be skipped.

- To run a LOCAL HOSTED version of Algebraic Equation GPT3.5 and have the Image Text Extraction Capability, read all sections. 

## A. Set up Credentials ##

1.  Create a Google Cloud Project at http://cloud.google.com/
2.  Click Console>Quick Access>APIs and Services>+ Enable API and Services>Choose Cloud Vision API
3.  In the Google Cloud console, go to menu\>API &Services\>Credentials.
4.  Create your OAuth client ID : Call it Web Client 1 (Name of your choice).
5.  Click the named Web application ; (Web Client 1):
        Authorised  JavaScript origins \> URL 1 : http://localhost:8000 
        Authorised  Redirect URIs \> URL 1 : http://localhost:8000/
6.  Click Create or Save.
7.  Note your Client ID.

## B. Generate Cloud Vision API keys ##

1.  This step can be skipped if text from image recognition is not used.
2.  Under API & Services\>Credentials
3.  Create credentials \> API keys
4.  Note your API keys and copy it onto a clipboard storing it to somewhere safe.

## C. Generate OPENAI API keys ##

1.  Access OPENAI>API via Sign up or Log in.
2.  Click settings (Nut icon on top right, beside profile).
3.  Left Column, under organisation >API Keys> + Create New Secret Key.
4.  Select Key owned by you> Type in Name>Select Default project > Click Create Secret Key.
5.  Click Copy to copy the secret key. Store it somewhere safe to be used in Algebraic Equation GPT V3.5 for log in.

## D. Download Code IDE and installations  ##

1.  Install VS code and all its relevant extensions. Extensions : Python, node.
2.  In VS Code, run a copy of this project from the GitHub repository.

## E. Procedure to running a local version of Algebriac Equation GPT ##

1.  In VS code, ensure Node, NPM are updated extensions.
2.  In VS code project tab, click on index.html, close all other terminals and nodes.
2.  Call up a new terminal.
3.  In your working directory prompt, run node.
4.  In your working directory prompt, install the http-server package : npm install http-server
5.  In your working directory prompt, start a web server: npx http-server -p 8000
6.  In your browser, navigate to http://localhost:8000, or click on one of the 2 generated URL, app will load.
7.  Key in your name.
8.  Key in your OPENAI API key and click confirmed. (Ensure both name and API keys are entered.)
9.  Key in your Cloud Vision API key if you would like to use text recognition capabilities (This is optional)
10. In the Upload window, click "Choose file" for camera or select a picture (JPEG or PNG) with a Math equation.
11. In the Extract Equation Window, Click "Read" to extract equation, "Clear" to clear the window.
12. In the Extract Equation Window, Click "Say Equation" to read equation out to the GPT.
13. In the Solution and Explanation window, Click "Solve, Analyse and Explain" to seek solution.
14. If solution is cryptic or unclear, repeating Step 13 will regenerate another output.
15. Click "Exit" to end the app, resetting app to all defaults, clearing all memory.
16. AR device functions are not developed at the time of commit.

## F. Procedure to use a hosted version of Algebriac Equation GPT ##

1.  Key in your name.
2.  Key in your OPENAI API key and click confirmed. (Ensure both name and API keys are entered.)
3.  Key in your Cloud Vision API key if you would like to use text recognition capabilities (This is optional)
4.  In the Extract Equation Window, input Equation for Algebraic Equation GPT V3.5 to solve, analysed and explained.
5.  Alternatively, Click the "Say Equation" button to activate mic and record audio equation input. 
6.  Click the button again to end audio recording and have it transcribed.
7.  In the Solution and Explanation window, Click "Solve, Analyse and Explain" to seek solution.
8.  If solution is cryptic or unclear, repeating Step 7 will regenerate another output.
9.  Click "Exit" to end the app, logging out, resetting application to default.

## G. Inspiration ##

This project is built with the inspiration of offering learners algebra self-help.
Educators can also generate quick notes on equation solving explanation steps as they deem suitable. 
Educators can scale this repository accordingly. Do reference the originator of this project.
Please refer to LICENSE for details.

If you are interested in my other projects, please search google: Github ironmanfpv. 
For collaboration interests, email me @ akitaishi@gmail.com 👋
Linkedin: www.linkedin.com/in/jason-n-b515a89a  🌍

31/3/2025 (Monday)