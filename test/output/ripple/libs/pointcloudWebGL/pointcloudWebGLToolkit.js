function pointcloudWebGLToolkit () {

}

pointcloudWebGLToolkit.Stats = class pointcloudWebGLToolkitStats {

    constructor(data) {
        // super(props);
        // super();
        this.summary_address = data.summary.urbanLocalization.address;
        this.summary_Localization = data.summary.urbanLocalization.localization;

        // this.report = jsonFile.report;
        // this.metrics = jsonFile.metrics;
    };

    loadSummary(){
        let summary_address = $('#address');
        let summary_address_text = document.createTextNode(this.summary_address);
        summary_address.append(summary_address_text);
        //
        // let summary_Localization = $('#Localization');
        // let summary_Localization_text = document.createTextNode(this.summary_Localization_);
        // summary_Localization.append(summary_Localization_text);

    };

    loadJSON(callback) {

        let xobj = new XMLHttpRequest();
        xobj.open('GET', this.pathJSON, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState === 4 && xobj.status === "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

};
