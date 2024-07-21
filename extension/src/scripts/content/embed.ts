window.addEventListener(
	"message",
	(event) => {
		if (event.source !== window) {
			return;
		}
		if (event.data.type && event.data.type === "SPAREBEATTER_SETOVERWRITE") {
            window[event.data.key]=event.data.value
		}
	},
	false,
);
