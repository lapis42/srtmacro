const sendMessageToTelegram = () => {
	chrome.storage.local.get(
		['srt-macro-bot-token', 'srt-macro-chat-id'],
		function (result) {
			const msg = encodeURI('예약을 시도하였습니다. 예약을 확인해주세요.');
			const url = `https://api.telegram.org/bot${result['srt-macro-bot-token']}/sendmessage?chat_id=${result['srt-macro-chat-id']}&text=${msg}`;

			fetch(url);
		}
	);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message && message.type == 'playSound') {
    sendMessageToTelegram();
    sendResponse(true);
  }
});
