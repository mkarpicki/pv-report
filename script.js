class Panel {
    constructor(selector, channelUI) {
        this.selector = selector;
        this.channelUI = channelUI;
    }
}
class ChannelUI {
    constructor(channelId, key, width, height) {
        this.channelId = channelId;
        this.key = key;
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
                new ChannelUI('2814877', '1024018')
            ),
            new Panel(
                "#panel-status-alarm", 
                new ChannelUI('2814877', '1024019')
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

        return iFrameElement;
    }
};

let monitor = new Monitor();
