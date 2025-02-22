let mapping = [
    { selector: "#now-status-ok", url: "https://thingspeak.com/channels/2814878/widgets/1026236?" },
    { selector: "#now-status-alarm", url: "https://thingspeak.com/channels/2814878/widgets/1026237?" },
    { selector: "#now-status-fault", url: "https://thingspeak.com/channels/2814878/widgets/1026238?" },
    { selector: "#now-status-stand-by", url: "https://thingspeak.com/channels/2814878/widgets/1026239?" },
    { selector: "#now-status-self-check", url: "https://thingspeak.com/channels/2814878/widgets/1026240?" },

    { selector: "#now-battery-capacity-clock", url: "https://thingspeak.com/channels/2814869/widgets/1024029?" },
    { selector: "#now-battery-temperature-value", url: "https://thingspeak.com/channels/2814869/widgets/1024031?" },
    { selector: "#now-battery-power-value", url: "https://thingspeak.com/channels/2814869/widgets/1024032?" },

    { selector: "#now-instalation-production-power-clock", url: "https://thingspeak.com/channels/2814878/widgets/1024044?" },
    { selector: "#now-instalation-grid-power-clock", url: "https://thingspeak.com/channels/2814878/widgets/1024045?" },
    { selector: "#now-instalation-load-power-clock", url: "https://thingspeak.com/channels/2814878/widgets/1024046?" },

    { selector: "#today-buy-value", url: "https://thingspeak.com/channels/2814877/widgets/1024023?" },
    { selector: "#today-sell-value", url: "https://thingspeak.com/channels/2814877/widgets/1024024?" },
    { selector: "#today-production-value", url: "https://thingspeak.com/channels/2814877/widgets/1024028?" },
    { selector: "#today-load-value", url: "https://thingspeak.com/channels/2814877/widgets/1024027?" },
    { selector: "#today-charge-value", url: "https://thingspeak.com/channels/2814877/widgets/1024025?" },
    { selector: "#today-discharge-value", url: "https://thingspeak.com/channels/2814877/widgets/1024026?" }

];

//ajax.json
//https://thingspeak.mathworks.com/channels/2814878/field/4/last.json

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
