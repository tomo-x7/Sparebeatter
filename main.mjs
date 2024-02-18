;(async () => {
    await import(chrome.runtime.getURL('html2canvas.js'))
  })()
html2canvas(document.getElementById("rerere"), {
	onrendered: (canvas) => {
		//imgタグのsrcの中に、html2canvasがレンダリングした画像を指定する。
		const imgData = canvas.toDataURL();
		console.log(imgData);
	}
});

let button;
const mo = new MutationObserver((_record, _observer) => {
	button = document.getElementsByClassName('tweet')[0];
	if (!button) {
		try{
		const newbtn = document.createElement('button');
		newbtn.classList.add('btn', 'btn-sm', 'btn-link', 'text-light')
		newbtn.innerHTML = '<img _ngcontent-uyk-c47="" src="https://beta.sparebeat.com/assets/images/twitter.svg" style="width: 24px; height: 24px;">'
		newbtn.style.position = 'absolute';
		newbtn.style.top = '460px';
		newbtn.style.right = '40px'
		button.replaceWith(newbtn)
		console.log('fin')

		newbtn.addEventListener('click', () => {
			html2canvas(document.getElementById("rerere"), {
				onrendered: (canvas) => {
					//imgタグのsrcの中に、html2canvasがレンダリングした画像を指定する。
					const imgData = canvas.toDataURL();
					console.log(imgData);
				}
			});
			mo.disconnect();
		})
		mo.disconnect();
	}catch(e){}
	}
});
const config = {
	childList: true,
	attributes: false,
	characterData: false,
	subtree: true,//孫以降のノードの変化も検出
};
mo.observe(document.body, config);

