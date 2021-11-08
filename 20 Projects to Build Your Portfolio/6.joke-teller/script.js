const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// VoiceRSS Javascript SDK
const VoiceRSS = {
    speech(e) { this._validate(e), this._request(e) }, _validate(e) { if (!e) throw "The settings are undefined"; if (!e.key) throw "The API key is undefined"; if (!e.src) throw "The text is undefined"; if (!e.hl) throw "The language is undefined"; if (e.c && "auto" != e.c.toLowerCase()) { let a = !1; switch (e.c.toLowerCase()) { case "mp3": a = (new Audio).canPlayType("audio/mpeg").replace("no", ""); break; case "wav": a = (new Audio).canPlayType("audio/wav").replace("no", ""); break; case "aac": a = (new Audio).canPlayType("audio/aac").replace("no", ""); break; case "ogg": a = (new Audio).canPlayType("audio/ogg").replace("no", ""); break; case "caf": a = (new Audio).canPlayType("audio/x-caf").replace("no", "") }if (!a) throw `The browser does not support the audio codec ${e.c}` } }, _request(e) {
        const a = this._buildRequest(e), t = this._getXHR(); t.onreadystatechange = function () {
            if (4 == t.readyState && 200 == t.status) {
                if (0 == t.responseText.indexOf("ERROR")) throw t.responseText;
                let e = t.responseText;
                audioElement.src = e, audioElement.onloadedmetadata = (() => {
                    audioElement.play()
                })
            }
        }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a)
    }, _buildRequest(e) { const a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec(); return `key=${e.key || ""}&src=${e.src || ""}&hl=${e.hl || ""}&r=${e.r || ""}&c=${a || ""}&f=${e.f || ""}&ssml=${e.ssml || ""}&b64=true` }, _detectCodec() { const e = new Audio; return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : "" }, _getXHR() { try { return new XMLHttpRequest } catch (e) { } try { return new ActiveXObject("Msxml3.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { } throw "The browser does not support HTTP request" }
};


// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// VoiceRSS Speech Function
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    // VoiceRSS Speech Parameters
    VoiceRSS.speech({
        key: 'e0b1110885dc462eb17fed5fd3f52c45',
        src: jokeString,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    });
}

// function test() {

//     VoiceRSS.speech({
//         key: 'e0b1110885dc462eb17fed5fd3f52c45',
//         src: '不懈的奋斗精神，是中国女排“不畏强手、敢打敢拼”的顽强身影；是杜富国危急关头“你退后,让我来!”的冲锋陷阵；是袁隆平坚持下田，向着高产目标不懈冲刺的坚定不移…… 如期打赢脱贫攻坚战，需要咬定目标加油干；坚定不移全面深改，需要不断奋斗，持续把改革推向前进…… 2019，我们在不懈奋斗中，即将走过不平凡的一年。2020，我们必将在接续奋斗中，向着“两个一百年”目标不断前进。中国的今天，从无数平凡人的奋斗中得来； 中国的明天，在14亿人的伟大奋斗中开创！',
//         hl: 'zh-cn',
//         r: '0',
//         c: 'mp3',
//         f: '8khz_8bit_mono',
//         ssml: false
//     });
// }

// test();

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Assign One or Two Part Joke
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Passing Joke to VoiceRSS API
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Error Here
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);