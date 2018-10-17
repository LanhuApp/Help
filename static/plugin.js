require(["gitbook"], function(gitbook) {

    var count = function(ga){
        setTimeout(function(){
            $('.chapter').click(function(){
                var text = $.trim($(this).find('a').eq(0).text());
                ga('send', 'event', {
                    eventCategory: '点击列表',
                    eventAction: text,
                });
            })
        },500)
    }
    

    // Load analytics.js
    gitbook.events.bind("start", function(e, config) {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        var cfg = config.ga;
        ga('create', cfg.token, cfg.configuration);
    });

    window.onload = function(){
        count(ga);
    }
    
    // Notify pageview
    gitbook.events.bind("page.change", function() {
        count(ga)
        //ga('send', 'pageview', window.location.pathname+window.location.search);
    });
});
