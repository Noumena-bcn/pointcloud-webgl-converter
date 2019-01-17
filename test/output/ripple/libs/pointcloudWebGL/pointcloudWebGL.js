function pointcloudWebGL () {

}

pointcloudWebGL.scriptPath = null;
if (document.currentScript.src) {
    pointcloudWebGL.scriptPath = new URL(document.currentScript.src + '/..').href;
    if (pointcloudWebGL.scriptPath.slice(-1) === '/') {
        pointcloudWebGL.scriptPath = pointcloudWebGL.scriptPath.slice(0, -1);
    }
} else {
    console.error('pointcloudWebGL was unable to find its script path using document.currentScript. Is Potree included with a script tag? Does your browser support this function?');
}

pointcloudWebGL.resourcePath = pointcloudWebGL.scriptPath + '/resources';

pointcloudWebGL.Viewer = class pointcloudWebGLViewer extends Potree.Viewer{

    navMenu (domElement, amountItems= 4, position='center') {
        if(position === 'center'){

            let menuContainer = null;
            let navContainer = $(domElement);


            for (i = 0; i < 3; i++){
                let column = document.createElement('div');
                if(i === 1){
                    column.classList.add('pointcloudWebGL_col_column');
                    column.classList.add('pointcloudWebGL_col_column_center');
                    column.classList.add('pointcloudWebGL_col_container');
                    column.id = 'navMenu';
                    menuContainer = column;
                }
                else{
                    column.classList.add('pointcloudWebGL_col_column');
                }
                navContainer.append(column);
            }

            for (i = 0; i < amountItems; i++){
                let item = document.createElement('div');
                item.classList.add('pointcloudWebGL_col_column');
                item.classList.add('navMenu_item');
                item.id = ('navMenu_item_').concat(i);

                let buttonMenu = document.createElement('button');
                buttonMenu.classList.add('pointcloudWebGL_col_column');
                buttonMenu.type = 'button';
                buttonMenu.style.height = '100%';
                buttonMenu.style.width = '100%';
                buttonMenu.classList.add('navMenu_button');
                buttonMenu.id = ('navMenu_button_').concat(i);


                item.append(buttonMenu);

                menuContainer.append(item);
            }

            return menuContainer;
        }
        else {
            return null;
        }
    };

    toggleSidebar (event) {

        try {
            event.preventDefault();
        }
        catch (e) {
            return false;
        }
        let renderArea = $('#potree_render_area');
        let sidebar = $('#potree_sidebar_container');

        let isVisible = renderArea.css('right') !== '0px';

        if (isVisible) {
            renderArea.css('right', '0px');
            sidebar.css('right', '-301px');
        } else if (!isVisible){
            renderArea.css('right', '300px');
            sidebar.css('right', '0px');
        }
    };

    toggleStats (event) {

        try {
            event.preventDefault();
        }
        catch (e) {
            return false;
        }
        let statsContainer = $('#pointcloudWebGL_stats_container');
        let isVisible = statsContainer.css('top') !== '0px';
        if(isVisible){
            statsContainer.css('top', '0%');
        }
    };

    toggleViewer (event) {

        try {
            event.preventDefault();
        }
        catch (e) {
            return false;
        }
        let statsContainer = $('#pointcloudWebGL_stats_container');
        let isVisible = statsContainer.css('top') !== '100%';

        if(isVisible){
            statsContainer.css('top', '100%');
        }
    };

    loadGUI(callback){

        this.onGUILoaded(callback);

        this.navMenu('#pointcloudWebGL_nav_container',4);

        let navMenu_item_0 = $('#navMenu_button_0');
        let navMenu_item_0_text = document.createTextNode("VIEWER");
        navMenu_item_0.append(navMenu_item_0_text);

        let navMenu_item_1 = $('#navMenu_button_1');
        let navMenu_item_1_text = document.createTextNode("STATS");
        navMenu_item_1.append(navMenu_item_1_text);


        let navMenu_item_2 = $('#navMenu_button_2');
        let navMenu_item_2_text = document.createTextNode("DOWNLOAD");
        navMenu_item_2.append(navMenu_item_2_text);

        let navMenu_item_3 = $('#navMenu_button_3');
        let navMenu_item_3_text = document.createTextNode("MAP");
        navMenu_item_3.append(navMenu_item_3_text);

        let viewer = this;
        let sidebarContainer = $('#potree_sidebar_container');
        sidebarContainer.load(new URL(Potree.scriptPath + '/sidebar.html').href, () => {
            sidebarContainer.css('width', '300px');
            sidebarContainer.css('height', '100%');
            sidebarContainer.css('right', '0px');


            let imgMenuToggle = document.createElement('img');
            imgMenuToggle.src = new URL(pointcloudWebGL.resourcePath + '/icons/menu_expand_button.svg').href;
            console.log(pointcloudWebGL.resourcePath);

            imgMenuToggle.onclick = this.toggleSidebar;
            imgMenuToggle.classList.add('potree_menu_toggle');
            imgMenuToggle.style.right = '0px';
            imgMenuToggle.style.top = '50%';

            viewer.renderArea.insertBefore(imgMenuToggle, viewer.renderArea.children[0]);

            this.mapView = new Potree.MapView(this);
            this.mapView.init();

            i18n.init({
                lng: 'en',
                resGetPath: Potree.resourcePath + '/lang/__lng__/__ns__.json',
                preload: ['en', 'fr', 'de', 'jp'],
                getAsync: true,
                debug: false
            }, function (t) {
                // Start translation once everything is loaded
                $('body').i18n();
            });

            $(() => {
                initSidebar(this);

                //if (callback) {
                //	$(callback);
                //}

                let elProfile = $('<div>').load(new URL(Potree.scriptPath + '/profile.html').href, () => {
                    $(document.body).append(elProfile.children());
                    this.profileWindow = new Potree.ProfileWindow(this);
                    this.profileWindowController = new Potree.ProfileWindowController(this);

                    $('#profile_window').draggable({
                        handle: $('#profile_titlebar'),
                        containment: $(document.body)
                    });
                    $('#profile_window').resizable({
                        containment: $(document.body),
                        handles: 'n, e, s, w'
                    });

                    $(() => {
                        this.guiLoaded = true;
                        for(let task of this.guiLoadTasks){
                            task();
                        }

                    });
                });



            });


        });

        let statsContainer = $(`#pointcloudWebGL_stats_container`);
        statsContainer.load(new URL(pointcloudWebGL.scriptPath + '/stats.html').href, () => {

            statsContainer.css('width', '100%');
            statsContainer.css('height', '100%');
            statsContainer.css('top', '100%');

            let navMenu_item_1 = $(`#navMenu_item_1`);
            navMenu_item_1.click(this.toggleStats);

            let navMenu_item_0 = $(`#navMenu_item_0`);
            navMenu_item_0.click(this.toggleViewer);

        });


    }

};