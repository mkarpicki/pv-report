class Panel {
    constructor(selector, channelUI) {
        this.selector = selector;
        this.channelUI = channelUI;
        //document.querySelector(selector).appendChild(channelUI);
    }
}
class ChannelUI {
    constructor(channelId, key, width, height) {
        this.channelId = channelId;
        this.key = key;
        this.width = width;
        this.height = height;
    }
};

class Monitor {

    constructor() {
        this.#todaySummaryPanels().forEach((panel) => {            
            let iFrame = this.#getIframe(panel.channelUI);
            document.querySelector(panel.selector).appendChild(iFrame);
        })
    }

    #todaySummaryPanels = function() {
        return [
            new Panel(
                "#panel-status-ok", 
                new ChannelUI('2814877', '1024018', '450', '260')
            ),
            new Panel(
                "#panel-status-alarm", 
                new ChannelUI('2814877', '1024019', '450', '260')
            )
        ];
    }

    #getUrl = function (channel) {
        let channelId = channel.channelId;
        let key = channel.key;
        let timestamp = new Date().getTime();
        return `https://thingspeak.com/channels/${channelId}/widgets/${key}?ts=${timestamp}`;
    }

    #getIframe = function (channel) {
        let url = this.#getUrl(channel);

        let iFrameElement = document.createElement('iframe');
        iFrameElement.src = url;
        iFrameElement.width = channel.width;
        iFrameElement.height = channel.height;
        iFrameElement.style = "border: 1px solid #cccccc;";

        return iFrameElement;
    }
};

let monitor = new Monitor();
