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
    { selector: "#today-discharge-value", url: "https://thingspeak.com/channels/2814877/widgets/1024026?" },

    { selector: "#day-production-chart", url: "https://thingspeak.mathworks.com/channels/2814878/charts/1?bgcolor=%23ffffff&color=%23d62020&type=${type}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59&" },
    { selector: "#day-grid-sell-chart", url: "https://thingspeak.mathworks.com/channels/2814878/charts/2?bgcolor=%23ffffff&color=%23d62020&type=${type}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59&" },
    { selector: "#day-grid-buy-chart", url: "https://thingspeak.mathworks.com/channels/2814878/charts/3?bgcolor=%23ffffff&color=%23d62020&type=${type}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59&" },
    { selector: "#day-load-chart", url: "https://thingspeak.mathworks.com/channels/2814878/charts/6?bgcolor=%23ffffff&color=%23d62020&type=${type}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59&" },
    { selector: "#day-battery-capacity-chart", url: "https://thingspeak.mathworks.com/channels/2814869/charts/1?bgcolor=%23ffffff&color=%23d62020&type=${type}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59&" },
    { selector: "#day-battery-usage-chart", url: "https://thingspeak.mathworks.com/channels/2814869/charts/3?bgcolor=%23ffffff&color=%23d62020&type=${type}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59&" },
    { selector: "#day-battery-temp-chart", url: "https://thingspeak.mathworks.com/channels/2814869/charts/2?bgcolor=%23ffffff&color=%23d62020&type=${type}&start=${startDate}%2000:00:00&end=${endDate}%2023:59:59&" }
    
];

let startDate;
let endDate;
let today;

class Monitor {

    static getUrl (url) {  

        let startDate = this.getStartDate();
        let endDate = this.getEndDate();   
        let type = 'column'; // 'line'; 
        url = eval('`' + url + '`');

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
                element.innerHTML = '';
                element.prepend(iFrame);   
            }         
        })
        
    }

    static readDateFromUrl() {
        const paramsString = window.location.search;
        const searchParams = new URLSearchParams(paramsString);
        return searchParams.get("date");
    }

    static prepareDates() {
        today = new Date();

        let day = today.getDate();
        day = (day < 10 )? '0' + day : day;

        let month = (today.getMonth() + 1);
        month = (month < 10)? '0' + month : month;

        today = today.getFullYear() + '-' + month + '-' + day;

        let dayDateElement = document.querySelector('#day-picker');
        
        if (dayDateElement) {
            dayDateElement.setAttribute("max", today);
            
            let date = this.readDateFromUrl();
            if (date) {
                dayDateElement.setAttribute("value", date);
                this.setDay(date);
            } else {
                dayDateElement.setAttribute("value", today);
                this.setDay(today);
            }
            
        }     
    }

    static showAllStatuses() {
        document.querySelector("#rest-of-statuses-container").classList.toggle("hide");
    }

    static setDay(value) {
        this.setStart(value);
        this.setEnd(value);
        this.refresCharts();
    }

    static redirectToDate(date) {
        if (date) {
            var url = new URL(window.location.href);
            url.searchParams.set('date', date);
            window.location.replace(url.toString());
        }
    }

    static setStart(value) {
        //console.log("start " + value);
        startDate = value;
    }

    static setEnd(value) {
        //console.log("end " + value);
        endDate = value;
    }

    static getStartDate() {
        return startDate;
    }

    static getEndDate() {
        return endDate;
    }

    static refresCharts() {
        this.init();
    }

    static refresh() {
        window.location.reload();
    }

};

