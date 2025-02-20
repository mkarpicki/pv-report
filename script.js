let mapping = [
    { selector: "#panel-status-ok", url: "https://thingspeak.com/channels/2814877/widgets/1024018?" },
    { selector: "#panel-status-alarm", url: "https://thingspeak.com/channels/2814877/widgets/1024019?" },
    { selector: "#panel-status-fault", url: "https://thingspeak.com/channels/2814877/widgets/1024020?" },
    { selector: "#panel-status-stand-by", url: "https://thingspeak.com/channels/2814877/widgets/1024021?" },
    { selector: "#panel-status-self-check", url: "https://thingspeak.com/channels/2814877/widgets/1024022?" }
];

class Monitor {

    getUrl (url) {  
        let timestamp = new Date().getTime();
        return url + `ts=${timestamp}`;
    }

    getIframe (url) {
        let src = this.getUrl(url);
        let iFrameElement = document.createElement('iframe');
        iFrameElement.src = src;

        return iFrameElement;
    }

    constructor() {
        mapping.forEach((panel) => {            
            let iFrame = this.getIframe(panel.url);
            document.querySelector(panel.selector).appendChild(iFrame);
        })
    }

};

let monitor = new Monitor();
