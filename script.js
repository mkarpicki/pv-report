let Pannel = function(title, channelId, key, width, height) {
    this.title = title;
    this.channelId = channelId;
    this.key = key;
    this.width = width;
    this.height = height;
};

let Monitor = function () {

    let panel;
    let todaySummary = [
        new Pannel('title', '2814877', '1024018', '450', '260'),
        new Pannel('title', '2814877', '1024019', '450', '260'),
    ];

    this.load = function () {
        panel = document.querySelector('#panel');

        todaySummary.forEach((channel) => {
            let iFrame = this.getIframe(channel);
            panel.appendChild(iFrame);
        })
    };

    this.getUrl = function (channel) {
        let channelId = channel.channelId;
        let key = channel.key;
        let timestamp = new Date().getTime();
        return `https://thingspeak.com/channels/${channelId}/widgets/${key}?ts=${timestamp}`;
    }

    this.getIframe = function (channel) {
        let url = this.getUrl(channel);

        let iFrameElement = document.createElement('iframe');
        iFrameElement.src = url;
        iFrameElement.width = channel.width;
        iFrameElement.height = channel.height;
        iFrameElement.style = "border: 1px solid #cccccc;";

        return iFrameElement;
    };
};

let monitor = new Monitor();
monitor.load();
