const headers = {"Authorization": `Bearer ${'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'}`};
const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-large";
const chatContainer = document.querySelector('#chat-output');
const inputField = document.querySelector('#chat-input');

async function query(payload) {
  const data = JSON.stringify(payload);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: data
  });
  return await response.json();
}

async function submitChat() {
  const input = inputField.value;
  if (input) {
    const data = await query(input);
    const chatResponse = document.createElement('div');
    chatResponse.classList.add('chat-message');
    chatResponse.classList.add('chatbot');
    chatResponse.innerHTML = data["generated_text"];
    chatContainer.appendChild(chatResponse);
    inputField.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

inputField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    submitChat();
  }
});
