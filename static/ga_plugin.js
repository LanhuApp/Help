require(["gitbook"], function(gitbook) {

    //腾讯统计

    function countTx(){
        var _mtac = {"performanceMonitor":1,"senseQuery":1};
        (function() {
            var mta = document.createElement("script");
            mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
            mta.setAttribute("name", "MTAH5");
            mta.setAttribute("sid", "500623773");
            mta.setAttribute("cid", "500623774");
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(mta, s);

            mta.onload = function(){
                try{
                    if(location.search){
                        var from = location.search.slice(1).split('=')[1];
                        MtaH5.clickStat('open_sos',{'from':decodeURIComponent(from)})
                    }
                }catch(err){
                    console.log(err);
                }
                
            }
        })();
    }
    



    // Load analytics.js
    gitbook.events.bind("start", function(e, config) {

        countTx();

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        var cfg = config.ga;
        ga('create', cfg.token, cfg.configuration);
    });

    // Notify pageview
    gitbook.events.bind("page.change", function() {
        ga('send', 'pageview', window.location.pathname+window.location.search);
    });
});
