// ... [Previous module imports here] ...

const connectBtn = document.getElementById('connect-btn');
const sendBtn = document.getElementById('send-btn');
const msgInput = document.getElementById('msg-input');
const chatLog = document.getElementById('chat-log');

// Update UI Connection State
function setUIConnected(connected) {
    const dot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    
    if(connected) {
        dot.className = 'connected';
        statusText.innerText = 'Encrypted Link Active';
        msgInput.disabled = false;
        sendBtn.disabled = false;
        connectBtn.style.display = 'none';
    }
}

// Action: Connect
connectBtn.addEventListener('click', async () => {
    try {
        await initChat(); // From previous step
        setUIConnected(true);
        chatLog.innerHTML += `<div class="system-msg">SECURE HANDSHAKE COMPLETE.</div>`;
    } catch (e) {
        chatLog.innerHTML += `<div class="system-msg" style="color:red">ERROR: ${e.message}</div>`;
    }
});

// Action: Send Message
sendBtn.addEventListener('click', async () => {
    const text = msgInput.value;
    if(!text) return;

    // In a real makeathon, you'd call CryptoEngine.encrypt here
    // For now, we simulate the packet
    const packet = {
        id: Math.random().toString(36).substr(2, 9),
        payload: text,
        timestamp: Date.now()
    };

    await BLEManager.sendMessage(JSON.stringify(packet));
    chatLog.innerHTML += `<div class="my-msg">> ${text}</div>`;
    msgInput.value = '';
});