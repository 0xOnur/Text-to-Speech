const textarea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechBTN = document.querySelector('.submit');

let synth = speechSynthesis;
let isSpeaking = true;

function voiceSpeech() {
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.text = voice.name;
        voiceList.add(option);
        console.log(option);
    }
};

synth.addEventListener('voiceschanged', voiceSpeech);

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utterance.voice = voice;
        }
    };
    speechSynthesis.speak(utterance);
};

speechBTN.addEventListener('click', (e) => {
    e.preventDefault();
    if(textarea.value !== '') {
        if(!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            if(isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBTN.innerHTML = ('Pause Speech');
            }
            else {
                synth.pause();
                isSpeaking = true;
                speechBTN.innerHTML = ('Resume Speech');
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBTN.innerHTML = ('Convert To Speech');
                }
            })
        }
        else {
            speechBTN.innerHTML = 'Convert To Speech';
        }
    };
});



