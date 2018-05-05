window.onload = function() {
	document.getElementById('submit').onclick = event => {
		event.preventDefault();

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/add');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.responseType = 'Type';
		xhr.onload = () => {
			alert("submit done!");
		};
		const content = {
			name : document.getElementById('name').value, 
			sname : document.getElementById('sname').value, 
			phone : document.getElementById('phone').value, 
			etps : document.getElementById('etps').value, 
			adrs : document.getElementById('adrs').value, 
			email : document.getElementById('email').value
		};
		xhr.send(JSON.stringify(content));
	};
}
