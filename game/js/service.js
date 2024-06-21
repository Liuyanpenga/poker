let socket = null;

const initWebSocket = async () => {
    if ("WebSocket" in window) {
        const wsUrl = 'ws://192.168.1.8:10099/mid/ws/SystemWebSocket';
        socket = new WebSocket(wsUrl);
        socket.onopen = openWebsocket;
        socket.onmessage = webSocketOnMessage;
        socket.onerror = webSocketOnError;
        socket.onclose = closeWebsocket;
    } else {
        alert('当前浏览器不支持webSocket')
    }
}

const openWebsocket = (e) => {
    console.log('连接成功')
}

const sendWebsocket = (msg) => {
    socket.send(msg);
}

const webSocketOnError = (e) => {
    console.log('连接失败')
}

const webSocketOnMessage = (e) => {
    window.dispatchEvent(
        new CustomEvent("onmessageWS", {
            detail: {
                data: JSON.parse(e?.data),
            },
        })
    );

}

const closeWebsocket = (e) => {
    console.log('连接关闭')
}

//断开连接
const closeSocket = () => {
    socket.close();
}

// export default { initWebSocket, sendWebsocket, closeSocket };