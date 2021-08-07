/* 
 * 
 * Git Repo : https://github.com/jayhasgin/hcaptcha-badge 
 * License : GPL-3.0 [https://github.com/jayhasgin/hcaptcha-badge/blob/main/LICENSE]
 * 
 * Usage
 * ------
 * 
 * 1. Auto-rendered hcaptcha (requires form with a "hcaptcha" class and button with [type=submit])
 * 
 * 2. Manually-rendered hcaptcha (requires form without a "hcaptcha" class, and call hcRender to render first and then hcExecute to show captcha)
 * 2.1 hcRender(document.getElementById("form_id"), "explicit");
 * 2.2 hcExecute(document.getElementById("form_id"));
 * 
 * 3. Unused (requires form without a "hcaptcha" class and no calls to hc functions)
 * 
 * 
 */

// Hc form auto setup
var i=0, sKey = false, activehCaptchaStatus = {}, activehCaptchaModes = new Array(), activehCaptchaIds = new Array(), subNode, hcApi, darkTh, hcstyles, res;
if(getParams().key!==undefined) {
	sKey = getParams().key;
	document.querySelectorAll('form').forEach(function(node) {
		if(node.classList.contains("hcaptcha")) {
			hcRender(node, false);
			if(node.querySelector('button[type="submit"]')!==null) {
				var subNode = (node.querySelector('button[type="submit"]'));
				subNode.setAttribute("type", "button");
				subNode.setAttribute("data-type", "hCaptcha");
			}
			(node.querySelector('button[data-type="hCaptcha"]')).addEventListener("click", function() {
				if(window["hcSubmitCustom"]!==undefined) { 
					var subSt = window["hcSubmitCustom"](node);
					if(subSt===undefined || (subSt!==undefined && subSt!==false)) {
						hcExecute(node);
					}
				}
				else {
					hcExecute(node);
				}
			});
		}
	});
	
	hcApi = document.createElement('script');
	hcApi.type = 'text/javascript';
	hcApi.src = 'https://hcaptcha.com/1/api.js?onload=hcCallback&render=explicit';
	document.head.appendChild(hcApi);
}

// Hc badge visible elements   
if(getParams().key!==undefined) {
	darkTh = ((getParams().theme!==undefined && getParams().theme=="dark") ? true : false);
	hcstyles = document.createElement("style");
	hcstyles.innerHTML = '.hcaptcha-badge{width:256px;height:60px;display:block;transition:right 0.3s ease 0s;position:fixed;bottom:14px;right:-186px;box-shadow:#'+((darkTh) ? "222" : "bbb")+' 0 0.02em 0.15em;border-radius:2px;overflow:hidden;font-family:Roboto,helvetica,arial,sans-serif}.hcaptcha-badge:hover{right:-4px}.hc-a-invisible{height:60px;width:256px;display:flex}.hc-a-clr{background:#'+((darkTh) ? "333" : "f9f9f9")+';color:#000}.hc-a{border-radius:3px;box-shadow:0 0 4px 1px rgba(0,0,0,0.08);-webkit-box-shadow:0 0 4px 1px rgba(0,0,0,0.08);-moz-box-shadow:0 0 4px 1px rgba(0,0,0,0.08)}.hc-a-normal-footer{display:inline-block;height:74px;vertical-align:top;width:70px}.hc-a-logo-img-large{transition:all 0.3s ease;background-size:40px;margin:5px 15px 0;height:40px;width:40px}.hc-a-logo-img{background:url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNNDggNTZINDBWNjRINDhWNTZaIiBmaWxsPSIjMDA3NEJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuNyIgZD0iTTQwIDU2SDMyVjY0SDQwVjU2WiIgZmlsbD0iIzAwNzRCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik0zMiA1NkgyNFY2NEgzMlY1NloiIGZpbGw9IiMwMDc0QkYiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNMjQgNTZIMTZWNjRIMjRWNTZaIiBmaWxsPSIjMDA3NEJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuNyIgZD0iTTU2IDQ4SDQ4VjU2SDU2VjQ4WiIgZmlsbD0iIzAwODJCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjgiIGQ9Ik00OCA0OEg0MFY1Nkg0OFY0OFoiIGZpbGw9IiMwMDgyQkYiLz4KPHBhdGggZD0iTTQwIDQ4SDMyVjU2SDQwVjQ4WiIgZmlsbD0iIzAwODJCRiIvPgo8cGF0aCBkPSJNMzIgNDhIMjRWNTZIMzJWNDhaIiBmaWxsPSIjMDA4MkJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuOCIgZD0iTTI0IDQ4SDE2VjU2SDI0VjQ4WiIgZmlsbD0iIzAwODJCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik0xNiA0OEg4VjU2SDE2VjQ4WiIgZmlsbD0iIzAwODJCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjUiIGQ9Ik02NCA0MEg1NlY0OEg2NFY0MFoiIGZpbGw9IiMwMDhGQkYiLz4KPHBhdGggb3BhY2l0eT0iMC44IiBkPSJNNTYgNDBINDhWNDhINTZWNDBaIiBmaWxsPSIjMDA4RkJGIi8+CjxwYXRoIGQ9Ik00OCA0MEg0MFY0OEg0OFY0MFoiIGZpbGw9IiMwMDhGQkYiLz4KPHBhdGggZD0iTTQwIDQwSDMyVjQ4SDQwVjQwWiIgZmlsbD0iIzAwOEZCRiIvPgo8cGF0aCBkPSJNMzIgNDBIMjRWNDhIMzJWNDBaIiBmaWxsPSIjMDA4RkJGIi8+CjxwYXRoIGQ9Ik0yNCA0MEgxNlY0OEgyNFY0MFoiIGZpbGw9IiMwMDhGQkYiLz4KPHBhdGggb3BhY2l0eT0iMC44IiBkPSJNMTYgNDBIOFY0OEgxNlY0MFoiIGZpbGw9IiMwMDhGQkYiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNOCA0MEgwVjQ4SDhWNDBaIiBmaWxsPSIjMDA4RkJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuNyIgZD0iTTY0IDMySDU2VjQwSDY0VjMyWiIgZmlsbD0iIzAwOURCRiIvPgo8cGF0aCBkPSJNNTYgMzJINDhWNDBINTZWMzJaIiBmaWxsPSIjMDA5REJGIi8+CjxwYXRoIGQ9Ik00OCAzMkg0MFY0MEg0OFYzMloiIGZpbGw9IiMwMDlEQkYiLz4KPHBhdGggZD0iTTQwIDMySDMyVjQwSDQwVjMyWiIgZmlsbD0iIzAwOURCRiIvPgo8cGF0aCBkPSJNMzIgMzJIMjRWNDBIMzJWMzJaIiBmaWxsPSIjMDA5REJGIi8+CjxwYXRoIGQ9Ik0yNCAzMkgxNlY0MEgyNFYzMloiIGZpbGw9IiMwMDlEQkYiLz4KPHBhdGggZD0iTTE2IDMySDhWNDBIMTZWMzJaIiBmaWxsPSIjMDA5REJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuNyIgZD0iTTggMzJIMFY0MEg4VjMyWiIgZmlsbD0iIzAwOURCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik02NCAyNEg1NlYzMkg2NFYyNFoiIGZpbGw9IiMwMEFCQkYiLz4KPHBhdGggZD0iTTU2IDI0SDQ4VjMySDU2VjI0WiIgZmlsbD0iIzAwQUJCRiIvPgo8cGF0aCBkPSJNNDggMjRINDBWMzJINDhWMjRaIiBmaWxsPSIjMDBBQkJGIi8+CjxwYXRoIGQ9Ik00MCAyNEgzMlYzMkg0MFYyNFoiIGZpbGw9IiMwMEFCQkYiLz4KPHBhdGggZD0iTTMyIDI0SDI0VjMySDMyVjI0WiIgZmlsbD0iIzAwQUJCRiIvPgo8cGF0aCBkPSJNMjQgMjRIMTZWMzJIMjRWMjRaIiBmaWxsPSIjMDBBQkJGIi8+CjxwYXRoIGQ9Ik0xNiAyNEg4VjMySDE2VjI0WiIgZmlsbD0iIzAwQUJCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik04IDI0SDBWMzJIOFYyNFoiIGZpbGw9IiMwMEFCQkYiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNNjQgMTZINTZWMjRINjRWMTZaIiBmaWxsPSIjMDBCOUJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuOCIgZD0iTTU2IDE2SDQ4VjI0SDU2VjE2WiIgZmlsbD0iIzAwQjlCRiIvPgo8cGF0aCBkPSJNNDggMTZINDBWMjRINDhWMTZaIiBmaWxsPSIjMDBCOUJGIi8+CjxwYXRoIGQ9Ik00MCAxNkgzMlYyNEg0MFYxNloiIGZpbGw9IiMwMEI5QkYiLz4KPHBhdGggZD0iTTMyIDE2SDI0VjI0SDMyVjE2WiIgZmlsbD0iIzAwQjlCRiIvPgo8cGF0aCBkPSJNMjQgMTZIMTZWMjRIMjRWMTZaIiBmaWxsPSIjMDBCOUJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuOCIgZD0iTTE2IDE2SDhWMjRIMTZWMTZaIiBmaWxsPSIjMDBCOUJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuNSIgZD0iTTggMTZIMFYyNEg4VjE2WiIgZmlsbD0iIzAwQjlCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik01NiA4SDQ4VjE2SDU2VjhaIiBmaWxsPSIjMDBDNkJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuOCIgZD0iTTQ4IDhINDBWMTZINDhWOFoiIGZpbGw9IiMwMEM2QkYiLz4KPHBhdGggZD0iTTQwIDhIMzJWMTZINDBWOFoiIGZpbGw9IiMwMEM2QkYiLz4KPHBhdGggZD0iTTMyIDhIMjRWMTZIMzJWOFoiIGZpbGw9IiMwMEM2QkYiLz4KPHBhdGggb3BhY2l0eT0iMC44IiBkPSJNMjQgOEgxNlYxNkgyNFY4WiIgZmlsbD0iIzAwQzZCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik0xNiA4SDhWMTZIMTZWOFoiIGZpbGw9IiMwMEM2QkYiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNNDggMEg0MFY4SDQ4VjBaIiBmaWxsPSIjMDBENEJGIi8+CjxwYXRoIG9wYWNpdHk9IjAuNyIgZD0iTTQwIDBIMzJWOEg0MFYwWiIgZmlsbD0iIzAwRDRCRiIvPgo8cGF0aCBvcGFjaXR5PSIwLjciIGQ9Ik0zMiAwSDI0VjhIMzJWMFoiIGZpbGw9IiMwMEQ0QkYiLz4KPHBhdGggb3BhY2l0eT0iMC41IiBkPSJNMjQgMEgxNlY4SDI0VjBaIiBmaWxsPSIjMDBENEJGIi8+CjxwYXRoIGQ9Ik0yMS4wMjgxIDI5LjkzOTRMMjMuMjc1OCAyNC45MTQzQzI0LjA5MTkgMjMuNjI1OCAyMy45OTE3IDIyLjA1MSAyMy4wODk3IDIxLjE0OTFDMjIuOTc1MiAyMS4wMzQ1IDIyLjgzMiAyMC45MiAyMi42ODg5IDIwLjgzNDFDMjIuMDczMiAyMC40NDc2IDIxLjMxNDUgMjAuMzYxNyAyMC42MTMgMjAuNTkwN0MxOS44Mzk5IDIwLjgzNDEgMTkuMTY3IDIxLjM0OTUgMTguNzM3NSAyMi4wMzY3QzE4LjczNzUgMjIuMDM2NyAxNS42NTk0IDI5LjIwOTMgMTQuNTI4NCAzMi40MzA1QzEzLjM5NzQgMzUuNjUxNyAxMy44NDEyIDQxLjU2NDUgMTguMjUwNyA0NS45NzRDMjIuOTMyMiA1MC42NTU1IDI5LjY4OTYgNTEuNzE0OSAzNC4wMTMyIDQ4LjQ3OTRDMzQuMTk5MyA0OC4zOTM1IDM0LjM1NjggNDguMjc5IDM0LjUxNDMgNDguMTUwMUw0Ny44MTQ0IDM3LjA0MDVDNDguNDU4NiAzNi41MTA3IDQ5LjQxNzggMzUuNDA4NCA0OC41NTg4IDM0LjE0ODVDNDcuNzI4NSAzMi45MTczIDQ2LjEzOTMgMzMuNzYyIDQ1LjQ4MDggMzQuMTc3MUwzNy44MjE0IDM5Ljc0NjNDMzcuNjc4MyAzOS44NjA4IDM3LjQ2MzUgMzkuODQ2NSAzNy4zMzQ3IDM5LjcwMzNDMzcuMzM0NyAzOS43MDMzIDM3LjMzNDcgMzkuNjg5IDM3LjMyMDQgMzkuNjg5QzM3LjExOTkgMzkuNDQ1NiAzNy4wOTEzIDM4LjgxNTcgMzcuMzkxOSAzOC41NzIzTDQ5LjEzMTUgMjguNjA4QzUwLjE0OCAyNy42OTE3IDUwLjI5MTEgMjYuMzYwMyA0OS40NjA4IDI1LjQ1ODRDNDguNjU5IDI0LjU3MDcgNDcuMzg0OSAyNC41OTk0IDQ2LjM2ODQgMjUuNTE1NkwzNS44MzE0IDMzLjc2MkMzNS42MzEgMzMuOTE5NCAzNS4zMzA0IDMzLjg5MDggMzUuMTcyOSAzMy42OTA0TDM1LjE1ODYgMzMuNjc2MUMzNC45NDM4IDMzLjQ0NyAzNC44NzIyIDMzLjA0NjEgMzUuMTAxMyAzMi44MDI4TDQ3LjA2OTkgMjEuMTkyQzQ4LjAxNDggMjAuMzA0NCA0OC4wNzIxIDE4LjgyOTggNDcuMTg0NCAxNy44ODQ5QzQ2Ljc1NDkgMTcuNDQxMSA0Ni4xNjggMTcuMTgzNCA0NS41NTI0IDE3LjE4MzRDNDQuOTIyNCAxNy4xODM0IDQ0LjMyMTEgMTcuNDEyNSA0My44NzczIDE3Ljg1NjNMMzEuNjUxIDI5LjMzODFDMzEuMzY0NyAyOS42MjQ1IDMwLjc5MiAyOS4zMzgxIDMwLjcyMDQgMjguOTk0NUMzMC42OTE4IDI4Ljg2NTcgMzAuNzM0NyAyOC43MzY5IDMwLjgyMDYgMjguNjUxTDQwLjE4MzcgMTcuOTk5NEM0MS4xMTQyIDE3LjEyNjEgNDEuMTcxNSAxNS42NjU4IDQwLjI5ODIgMTQuNzM1M0MzOS40MjQ5IDEzLjgwNDcgMzcuOTY0NiAxMy43NDc0IDM3LjAzNCAxNC42MjA3QzM2Ljk5MTEgMTQuNjQ5NCAzNi45NjI0IDE0LjY5MjMgMzYuOTE5NSAxNC43MzUzTDIyLjczMTggMzAuNDQwNUMyMi4yMTY0IDMwLjk1NTkgMjEuNDcxOSAzMC45NzAyIDIxLjExNCAzMC42ODM5QzIwLjg4NSAzMC40OTc4IDIwLjg1NjMgMzAuMTY4NSAyMS4wMjgxIDI5LjkzOTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K");background-repeat:repeat;background-size:contain;background-repeat:no-repeat}.hc-a-invisible .hc-a-normal-footer .hc-a-pt{transition:opacity 0.3s ease;text-align:center;width:70px;margin-top:2px}.hc-a-compact .hc-a-pt,.hc-a-invisible .hc-a-pt,.hc-a-normal .hc-a-pt{font-family:Roboto,helvetica,arial,sans-serif;font-size:8px;font-weight:400}.hc-a-invisible-text{background:#'+((darkTh) ? "222" : "00bdc8")+';color:white;display:flex;flex-basis:166px;flex-direction:column;flex-grow:1;font-family:Roboto,helvetica,arial,sans-serif;font-size:13px;font-weight:400;height:100%;justify-content:center;line-height:20px;padding:0 16px;white-space:nowrap}.hc-a-invisible-text .hc-a-pt a:link,.hc-a-invisible-text .hc-a-pt a:visited{color:white;font-size:10px}.hc-a-invisible-hover:hover .hc-a-logo-img-large,.hc-a-invisible-nohover .hc-a-logo-img-large{background-size:44px;margin:8px 13px 0;height:44px;width:44px}.hc-a-clr .hc-a-logo-text,.hc-a-clr div a:link,.hc-a-clr div a:visited{color:#'+((darkTh) ? "fff" : "555")+';text-decoration:none}.hc-a-invisible .hc-a-normal-footer .hc-a-pt{transition:opacity 0.3s ease;text-align:center;width:70px;margin-top:3px}.hc-a-compact .hc-a-pt,.hc-a-invisible .hc-a-pt,.hc-a-normal .hc-a-pt{font-size:8px;font-weight:400}';
	document.head.appendChild(hcstyles);
	res = document.createElement('div');
	res.innerHTML = '<!-- Git Repo : https://github.com/jayhasgin/hcaptcha-badge; License : GPL-3.0 [https://github.com/jayhasgin/hcaptcha-badge/blob/main/LICENSE] --> <div id="hcbadgecontainer" style="opacity:0; display:none; visibility: hidden; z-index: 9999999;" class="hcaptcha-badge" data-style="bottomright"><div class="hcaptcha-logo"><div id="hc-a-alert" class="hc-a-alert"></div><div class="hc-a hc-a-invisible hc-a-clr hc-a-invisible-hover"><div class="hc-a-normal-footer" aria-hidden="true"><div class="hc-a-logo-large" role="presentation"><div class="hc-a-logo-img hc-a-logo-img-large"></div></div><div id="hcvisiblea" class="hc-a-pt"><a href="https://hcaptcha.com/privacy" target="_blank">Privacy</a><span aria-hidden="true" role="presentation"> - </span><a href="https://hcaptcha.com/terms" target="_blank">Terms</a></div></div><div class="hc-a-invisible-text"><span>protected by <strong>hCaptcha</strong></span><div class="hc-a-pt"><a href="https://hcaptcha.com/privacy" target="_blank">Privacy</a><span aria-hidden="true" role="presentation"> - </span><a href="https://hcaptcha.com/terms" target="_blank">Terms</a></div></div></div></div></div>';
	document.body.appendChild(res);
	document.body.onload = function() {
		document.getElementById('hcbadgecontainer').style.visibility = 'visible';
		document.getElementById('hcbadgecontainer').style.opacity = '1';
		document.getElementById('hcbadgecontainer').style.display = 'block';
		document.getElementById("hcbadgecontainer").onmouseenter = function() {
			document.getElementById("hcvisiblea").style.display = "none";
		};
		document.getElementById("hcbadgecontainer").onmouseleave = function() {
			document.getElementById("hcvisiblea").style.display = "block";
		};
	};
}

// Hc functions
function getParams() {
	var scripts = document.getElementsByTagName("script"), script, i, pa, p, j, kv;
	script = ((scripts[scripts.length-1].src).match(/\/([a-z\-\.]+).js/)[1]).concat('.js');
	for(i=0; i<scripts.length; i++) {
		if(scripts[i].src.indexOf("/" + script) > -1) {
			pa = scripts[i].src.split("?").pop().split("&");
			p = {};
			for(j=0; j<pa.length; j++) {
				kv = pa[j].split("=");
				p[kv[0]] = kv[1];
			}
			return p;
		}
	}
	return {};
}

function hcCallback() {
	var j, capId;
	for(j=0; j<activehCaptchaIds.length; j++) {
		capId = hcaptcha.render(activehCaptchaIds[j], {'sitekey' : sKey});
		document.getElementById(activehCaptchaIds[j]).setAttribute("data-hid", capId);
		activehCaptchaStatus[capId] = "rendered";
	}
}

function hcExecute(formNode) {
	if(formNode.querySelector('div[data-hid]')) {
		var capId = (formNode.querySelector('div[data-hid]')).getAttribute("data-hid");
		activehCaptchaStatus[capId] = "initialized";
		activehCaptchaStatus[capId]["check"] = setInterval(function(){
			if(activehCaptchaStatus[capId]=="reset") {
				hcaptcha.reset(capId);
				clearInterval(activehCaptchaStatus[capId]["check"]);
			}
			if(!hcaptcha.getResponse(capId) && activehCaptchaStatus[capId]=="initialized") {
				hcaptcha.execute(capId);
				activehCaptchaStatus[capId] = "executed";
			}
			if(activehCaptchaStatus[capId]!="completed" && hcaptcha.getResponse(capId)) {
				activehCaptchaStatus[capId] = "completed";
				clearInterval(activehCaptchaStatus[capId]["check"]);
				if(window["hcExecuteCustom"]!==undefined) { 
					window["hcExecuteCustom"](formNode);
					return false;
				}
				else {
					formNode.submit();
				}
			}
		}, 2000);
	}
	else {
		console.log("hCaptcha failed to load");
	}
}

function hcReset() {
	document.querySelectorAll('form').forEach(function(node) {
		if(window["hcResetCustom"]!==undefined) { 
			window["hcResetCustom"](node);
		}
		if(node.querySelector('div[data-hid]')) {
			var capId = (node.querySelector('div[data-hid]')).getAttribute("data-hid");
			activehCaptchaStatus[capId] = "reset";
			console.log("hCaptcha reset.");
		}
	});
}

function hcOpen() {
	if(window["hcOpenCustom"]!==undefined) { 
		window["hcOpenCustom"]();
	}
	console.log("hCaptcha opens.");
}

function hcError(data) {
	if(window["hcErrorCustom"]!==undefined) { 
		window["hcErrorCustom"]();
	}
	console.log("hCaptcha failed. Error:"+data);
}

function hcRender(node, render) {
	var res = document.createElement('div'), capId;
	res.setAttribute("id", "hcaptcha"+i);
	res.setAttribute("class", "h-captcha");
	res.setAttribute("data-sitekey", getParams().key);
	res.setAttribute("data-size", "invisible");
	res.setAttribute("data-error-callback", "hcError");
	res.setAttribute("data-open-callback", "hcOpen");
	res.setAttribute("data-close-callback", "hcReset");
	res.setAttribute("data-chalexpired-callback", "hcReset");
	res.setAttribute("data-expired-callback", "hcReset");
	node.appendChild(res);
	activehCaptchaIds.push("hcaptcha"+i);
	if(typeof render !== 'undefined' && render=='explicit') {
		capId = hcaptcha.render(activehCaptchaIds[i], {'sitekey' : sKey});
		document.getElementById(activehCaptchaIds[i]).setAttribute("data-hid", capId);
		activehCaptchaStatus[capId] = "rendered";
	}
	i++;
}
