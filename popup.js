(() => {
	const MESSAGE_RESET = '초기화 되었습니다.';
	const MESSAGE_CONNECTION_SUCCESS = '연동되었습니다.';
	const MESSAGE_CONNECTION_FAIL = '연동에 실패하였습니다.<br>입력하신 정보를 다시 확인해주세요.';

	const init = () => {
		chrome.storage.local.get(
			['srt-macro-bot-token', 'srt-macro-chat-id'],
			function (result) {
				if (result['srt-macro-bot-token'] && result['srt-macro-chat-id']) {
					document.getElementById('bot-token').value = result['srt-macro-bot-token'];
					document.getElementById('chat-id').value = result['srt-macro-chat-id'];
				}
			}
		);
	}

	const save = () => {
		const botToken = document.getElementById('bot-token').value;
		const chatId = document.getElementById('chat-id').value;

		const msg = encodeURI('SRT Macro: 예약 알림이 연동되었습니다.');
		const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${msg}`;

		fetch(url).then(response => {
		if (response.status === 200) {
			chrome.storage.local.set(
				{
					'srt-macro-bot-token': botToken,
					'srt-macro-chat-id': chatId
				},
				function() {
					setMessage(MESSAGE_CONNECTION_SUCCESS);
				}
			);

		} else {
			setMessage(MESSAGE_CONNECTION_FAIL);
		}
		}).catch(err => {
			setMessage(MESSAGE_CONNECTION_FAIL);
			console.error(err)
		});
	}

	const reset = () => {
		document.getElementById('bot-token').value = '';
		document.getElementById('chat-id').value = '';
		chrome.storage.local.remove('srt-macro-bot-token');
		chrome.storage.local.remove('srt-macro-chat-id');
		setMessage(MESSAGE_RESET);
	}

	const setMessage = message => {
		document.getElementById('message').innerHTML = message;
	}

	init();
	document.getElementById('button-save').addEventListener('click', save);
	document.getElementById('button-reset').addEventListener('click', reset);
})();
