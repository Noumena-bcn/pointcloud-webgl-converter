function pointcloudWebGL () {

}
pointcloudWebGL.Viewer = class pointcloudWebGLViewer extends Potree.Viewer{

    toggleSidebar () {
        let renderArea = $('#potree_render_area');
        let isVisible = renderArea.css('right') !== '0px';

        if (isVisible) {
            renderArea.css('right', '0px');
        } else {
            renderArea.css('right', '300px');
        }
    };

    loadGUI(callback){

        this.onGUILoaded(callback);

        let viewer = this;
        let sidebarContainer = $('#potree_sidebar_container');
        sidebarContainer.load(new URL(Potree.scriptPath + '/sidebar.html').href, () => {
            sidebarContainer.css('width', '300px');
            sidebarContainer.css('height', '100%');
            sidebarContainer.css('right', '0px');


            let imgMenuToggle = document.createElement('img');
            imgMenuToggle.src = new URL(Potree.resourcePath + '/icons/menu_button.svg').href;
            imgMenuToggle.onclick = this.toggleSidebar;
            imgMenuToggle.classList.add('potree_menu_toggle');
            imgMenuToggle.style.right = '0px';


            let imgMapToggle = document.createElement('img');
            imgMapToggle.src = new URL(Potree.resourcePath + '/icons/map_icon.png').href;
            imgMapToggle.style.display = 'none';
            imgMapToggle.onclick = e => { this.toggleMap(); };
            imgMapToggle.id = 'potree_map_toggle';

            viewer.renderArea.insertBefore(imgMapToggle, viewer.renderArea.children[0]);
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
    }

};