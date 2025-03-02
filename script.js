let mapping = [
    { selector: "#now-status-ok", url: "https://thingspeak.com/channels/2814878/widgets/1026236?" },
    { selector: "#now-status-alarm", url: "https://thingspeak.com/channels/2814878/widgets/1026237?" },
    { selector: "#now-status-fault", url: "https://thingspeak.com/channels/2814878/widgets/1026238?" },
    { selector: "#now-status-stand-by", url: "https://thingspeak.com/channels/2814878/widgets/1026239?" },
    { selector: "#now-status-self-check", url: "https://thingspeak.com/channels/2814878/widgets/1026240?" },

    // { selector: "#now-battery-power-value", url: "https://thingspeak.com/channels/2814869/widgets/1024031?" },
    // { selector: "#now-battery-capacity-clock", url: "https://thingspeak.com/channels/2814869/widgets/1024032?" },
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

let startDate;
let endDate;
let today;

//ajax.json
//https://thingspeak.mathworks.com/channels/2814878/field/4/last.json

class Monitor {

    static getUrl (url) {  
        let timestamp = new Date().getTime();
        return url + `ts=${timestamp}`;
    }

    static getIframe (url) {
        let src = this.getUrl(url);
        let iFrameElement = document.createElement('iframe');
        iFrameElement.src = src;

        return iFrameElement;
    }

    static init() {
        mapping.forEach((panel) => {    
            let element = document.querySelector(panel.selector);  
            if (element) {      
                let iFrame = this.getIframe(panel.url);
                element.prepend(iFrame);   
            }         
        })
        
    }

    static prepareDates() {
        today = new Date();

        let day = today.getDate();
        day = (day < 10 )? '0' + day : day;

        let month = (today.getMonth() + 1);
        month = (month < 10)? '0' + month : month;

        today = today.getFullYear() + '-' + month + '-' + day;

        let startDateElement = document.querySelector('#start-date');
        let endtDateElement = document.querySelector('#end-date');

        if (startDateElement && endtDateElement) {
            startDateElement.setAttribute("max", today);
            endtDateElement.setAttribute("max", today);

            //TODO only if no url
            //startDateElement.setAttribute("value", today);
            //endtDateElement.setAttribute("value", today);
        }
    }

    static showAllStatuses() {
        document.querySelector("#rest-of-statuses-container").classList.toggle("hide");
    }

    static setStart(value) {
        console.log("start " + value);
    }

    static setEnd(value) {
        console.log("end " + value);
    }

    static refresCharts() {

    }

};

//let monitor = new Monitor();
